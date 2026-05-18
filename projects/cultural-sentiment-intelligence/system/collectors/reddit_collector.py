"""
Collector: Reddit
Scrapes posts + top comments across configured subreddits.
Requires: REDDIT_CLIENT_ID, REDDIT_CLIENT_SECRET in .env
"""

import os, time, json
import pandas as pd
from pathlib import Path
from datetime import datetime

try:
    from dotenv import load_dotenv
    load_dotenv(Path(__file__).parent.parent.parent / ".env")
except ImportError:
    pass

try:
    import praw
    PRAW_AVAILABLE = True
except ImportError:
    PRAW_AVAILABLE = False

RAW_DIR = Path(__file__).parent.parent.parent / "data" / "raw"
RAW_DIR.mkdir(parents=True, exist_ok=True)

TARGETS = {
    "The Devil Wears Prada 2": {
        "queries": ["Devil Wears Prada 2", "Devil Wears Prada sequel", "Miranda Priestly sequel"],
        "subreddits": ["movies", "TrueFilm", "boxoffice", "femalefashionadvice", "popculturechat"],
    },
    "Michael": {
        "queries": ["Michael Jackson biopic", "Michael movie 2025", "Jaafar Jackson film"],
        "subreddits": ["movies", "Music", "MichaelJackson", "boxoffice", "popheads"],
    },
}

POST_LIMIT    = 100
COMMENT_LIMIT = 8
SLEEP         = 0.6


def init_reddit():
    cid = os.getenv("REDDIT_CLIENT_ID")
    csec = os.getenv("REDDIT_CLIENT_SECRET")
    ua   = os.getenv("REDDIT_USER_AGENT", "cultural-signal-monitor/2.0")
    if not cid or not csec:
        raise EnvironmentError("Missing REDDIT_CLIENT_ID / REDDIT_CLIENT_SECRET in .env")
    return praw.Reddit(client_id=cid, client_secret=csec, user_agent=ua)


def _post_to_record(post, movie: str) -> dict:
    text = post.title
    if post.selftext:
        text += " — " + post.selftext[:600]
    return {
        "movie": movie,
        "source": "reddit",
        "post_id": f"reddit_{post.id}",
        "content_type": "post",
        "text": text,
        "platform": "Reddit",
        "subreddit": f"r/{post.subreddit.display_name}",
        "url": f"https://reddit.com{post.permalink}",
        "date": datetime.utcfromtimestamp(post.created_utc).strftime("%Y-%m-%d"),
        "timestamp": datetime.utcfromtimestamp(post.created_utc).isoformat(),
        "likes": post.score,
        "comments": post.num_comments,
        "shares": 0,
        "upvote_ratio": post.upvote_ratio,
        "week": datetime.utcfromtimestamp(post.created_utc).isocalendar()[1],
        "month": datetime.utcfromtimestamp(post.created_utc).month,
    }


def scrape(reddit, movie: str, config: dict) -> list[dict]:
    records = []
    for sub in config["subreddits"]:
        for query in config["queries"]:
            try:
                results = reddit.subreddit(sub).search(
                    query, sort="relevance", time_filter="year", limit=POST_LIMIT
                )
                for post in results:
                    rec = _post_to_record(post, movie)
                    records.append(rec)
                    try:
                        post.comments.replace_more(limit=0)
                        for c in list(post.comments)[:COMMENT_LIMIT]:
                            if len(c.body) < 20:
                                continue
                            comment_rec = {**rec,
                                "post_id": f"reddit_{c.id}",
                                "content_type": "comment",
                                "text": c.body[:800],
                                "likes": c.score,
                                "comments": 0,
                                "upvote_ratio": None,
                            }
                            records.append(comment_rec)
                    except Exception:
                        pass
                    time.sleep(SLEEP)
            except Exception as e:
                print(f"    [WARN] r/{sub} '{query}': {e}")
    seen, unique = set(), []
    for r in records:
        k = r["post_id"]
        if k not in seen:
            seen.add(k)
            unique.append(r)
    return unique


def collect(targets: dict = TARGETS) -> pd.DataFrame:
    if not PRAW_AVAILABLE:
        raise ImportError("praw not installed. Run: pip install praw")
    reddit = init_reddit()
    all_records = []
    for movie, config in targets.items():
        print(f"  Reddit → {movie}")
        recs = scrape(reddit, movie, config)
        print(f"    {len(recs)} items")
        all_records.extend(recs)
    df = pd.DataFrame(all_records)
    out = RAW_DIR / "reddit_collected.csv"
    df.to_csv(out, index=False)
    print(f"  Saved: {out}")
    return df


if __name__ == "__main__":
    collect()
