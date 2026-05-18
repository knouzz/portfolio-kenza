"""
Collector: YouTube Comments
Scrapes comments from YouTube videos via youtube-comment-downloader (no API key needed)
or falls back to YouTube Data API v3 if YOUTUBE_API_KEY is set.
"""

import os, json, time
import pandas as pd
from pathlib import Path
from datetime import datetime

try:
    from dotenv import load_dotenv
    load_dotenv(Path(__file__).parent.parent.parent / ".env")
except ImportError:
    pass

RAW_DIR = Path(__file__).parent.parent.parent / "data" / "raw"
RAW_DIR.mkdir(parents=True, exist_ok=True)

# Video IDs to target — replace with real trailer/clip IDs
VIDEO_TARGETS = {
    "The Devil Wears Prada 2": [
        {"id": "TRAILER_VIDEO_ID_DWP2", "title": "Devil Wears Prada 2 Official Trailer"},
        {"id": "REACTION_VIDEO_ID_DWP2", "title": "DWP2 Reaction"},
    ],
    "Michael": [
        {"id": "TRAILER_VIDEO_ID_MJ", "title": "Michael Official Trailer"},
        {"id": "REACTION_VIDEO_ID_MJ", "title": "Michael Biopic Reaction"},
    ],
}

COMMENT_LIMIT = 200  # per video


def collect_via_downloader(video_id: str, movie: str, video_title: str, limit: int) -> list[dict]:
    """Uses youtube-comment-downloader (no API key required)."""
    try:
        from youtube_comment_downloader import YoutubeCommentDownloader, SORT_BY_RECENT
        downloader = YoutubeCommentDownloader()
        generator = downloader.get_comments_from_url(
            f"https://www.youtube.com/watch?v={video_id}",
            sort_by=SORT_BY_RECENT,
        )
        records = []
        for i, comment in enumerate(generator):
            if i >= limit:
                break
            if len(comment.get("text", "")) < 10:
                continue
            records.append({
                "movie": movie,
                "source": "youtube",
                "post_id": f"yt_{comment.get('cid', i)}",
                "content_type": "comment",
                "text": comment.get("text", "")[:800],
                "platform": "YouTube",
                "subreddit": None,
                "url": f"https://youtube.com/watch?v={video_id}",
                "video_title": video_title,
                "date": comment.get("time_parsed", datetime.now()).strftime("%Y-%m-%d")
                        if hasattr(comment.get("time_parsed"), "strftime")
                        else datetime.now().strftime("%Y-%m-%d"),
                "timestamp": datetime.now().isoformat(),
                "likes": comment.get("votes", 0) or 0,
                "comments": comment.get("reply_count", 0) or 0,
                "shares": 0,
                "upvote_ratio": None,
                "week": datetime.now().isocalendar()[1],
                "month": datetime.now().month,
            })
        return records
    except ImportError:
        return collect_via_api(video_id, movie, video_title, limit)


def collect_via_api(video_id: str, movie: str, video_title: str, limit: int) -> list[dict]:
    """Falls back to YouTube Data API v3."""
    api_key = os.getenv("YOUTUBE_API_KEY")
    if not api_key:
        print(f"    [SKIP] No YOUTUBE_API_KEY — skipping {video_title}")
        return []
    try:
        from googleapiclient.discovery import build
        youtube = build("youtube", "v3", developerKey=api_key)
        records, page_token = [], None
        while len(records) < limit:
            kwargs = dict(
                part="snippet", videoId=video_id,
                maxResults=min(100, limit - len(records)),
                textFormat="plainText",
            )
            if page_token:
                kwargs["pageToken"] = page_token
            resp = youtube.commentThreads().list(**kwargs).execute()
            for item in resp.get("items", []):
                snip = item["snippet"]["topLevelComment"]["snippet"]
                records.append({
                    "movie": movie,
                    "source": "youtube",
                    "post_id": f"yt_{item['id']}",
                    "content_type": "comment",
                    "text": snip.get("textDisplay", "")[:800],
                    "platform": "YouTube",
                    "subreddit": None,
                    "url": f"https://youtube.com/watch?v={video_id}",
                    "video_title": video_title,
                    "date": snip.get("publishedAt", "")[:10],
                    "timestamp": snip.get("publishedAt", datetime.now().isoformat()),
                    "likes": snip.get("likeCount", 0),
                    "comments": item["snippet"].get("totalReplyCount", 0),
                    "shares": 0,
                    "upvote_ratio": None,
                    "week": datetime.now().isocalendar()[1],
                    "month": datetime.now().month,
                })
            page_token = resp.get("nextPageToken")
            if not page_token:
                break
        return records
    except Exception as e:
        print(f"    [ERROR] YouTube API: {e}")
        return []


def collect(targets: dict = VIDEO_TARGETS) -> pd.DataFrame:
    all_records = []
    for movie, videos in targets.items():
        print(f"  YouTube → {movie}")
        for video in videos:
            print(f"    {video['title']}", end=" ... ")
            recs = collect_via_downloader(
                video["id"], movie, video["title"], COMMENT_LIMIT
            )
            print(f"{len(recs)} comments")
            all_records.extend(recs)
            time.sleep(1.0)
    df = pd.DataFrame(all_records) if all_records else pd.DataFrame()
    if not df.empty:
        out = RAW_DIR / "youtube_collected.csv"
        df.to_csv(out, index=False)
        print(f"  Saved: {out}")
    return df


if __name__ == "__main__":
    collect()
