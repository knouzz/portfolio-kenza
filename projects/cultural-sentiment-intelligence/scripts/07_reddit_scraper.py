"""
Script 07 — Reddit Scraper (PRAW)
Scrapes real Reddit discussions for both movies across relevant subreddits.
Merges with existing corpus or runs standalone.

Setup:
  1. Copy .env.example to .env
  2. Fill in your Reddit API credentials
  3. Run: python 07_reddit_scraper.py
"""

import os
import time
import json
import pandas as pd
from pathlib import Path
from datetime import datetime

try:
    from dotenv import load_dotenv
    load_dotenv(Path(__file__).parent.parent / ".env")
except ImportError:
    pass  # Handle manually below

try:
    import praw
    PRAW_AVAILABLE = True
except ImportError:
    PRAW_AVAILABLE = False

RAW_DIR = Path(__file__).parent.parent / "data" / "raw"
RAW_DIR.mkdir(parents=True, exist_ok=True)

# ─── Search configuration ───────────────────────────────────────────────────

MOVIES = {
    "The Devil Wears Prada 2": {
        "queries": [
            "Devil Wears Prada 2",
            "Devil Wears Prada sequel",
            "Miranda Priestly sequel",
            "DWP2 movie",
        ],
        "subreddits": [
            "movies", "TrueFilm", "boxoffice", "Oscars",
            "femalefashionadvice", "fashion", "AskWomen",
            "entertainment", "popculturechat",
        ],
    },
    "Michael": {
        "queries": [
            "Michael Jackson biopic",
            "Michael movie 2025",
            "Jaafar Jackson film",
            "MJ biopic movie",
        ],
        "subreddits": [
            "movies", "Music", "MichaelJackson", "boxoffice",
            "TrueFilm", "popculturechat", "entertainment",
            "popheads", "LetsTalkMusic",
        ],
    },
}

POST_LIMIT = 150          # posts per subreddit search
COMMENT_LIMIT = 10        # top comments per post to include
RATE_LIMIT_SLEEP = 0.5    # seconds between requests (respect Reddit API limits)


def init_reddit() -> "praw.Reddit":
    client_id = os.getenv("REDDIT_CLIENT_ID")
    client_secret = os.getenv("REDDIT_CLIENT_SECRET")
    user_agent = os.getenv("REDDIT_USER_AGENT", "cultural-sentiment-intel/1.0")

    if not client_id or not client_secret:
        raise EnvironmentError(
            "\n[ERROR] Reddit credentials not found.\n"
            "  1. Copy .env.example to .env\n"
            "  2. Fill in REDDIT_CLIENT_ID and REDDIT_CLIENT_SECRET\n"
            "  Get credentials at: https://www.reddit.com/prefs/apps\n"
        )

    return praw.Reddit(
        client_id=client_id,
        client_secret=client_secret,
        user_agent=user_agent,
    )


def scrape_subreddit(
    reddit,
    subreddit_name: str,
    query: str,
    movie: str,
    limit: int = POST_LIMIT,
) -> list[dict]:
    records = []
    try:
        subreddit = reddit.subreddit(subreddit_name)
        results = subreddit.search(query, sort="relevance", time_filter="year", limit=limit)

        for post in results:
            post_record = {
                "movie": movie,
                "source": "reddit",
                "post_id": f"reddit_{post.id}",
                "text": post.title + (" — " + post.selftext[:500] if post.selftext else ""),
                "platform": "Reddit",
                "subreddit": f"r/{subreddit_name}",
                "url": f"https://reddit.com{post.permalink}",
                "date": datetime.utcfromtimestamp(post.created_utc).strftime("%Y-%m-%d"),
                "timestamp": datetime.utcfromtimestamp(post.created_utc).isoformat(),
                "likes": post.score,
                "comments": post.num_comments,
                "shares": 0,
                "upvote_ratio": post.upvote_ratio,
                "week": datetime.utcfromtimestamp(post.created_utc).isocalendar()[1],
                "month": datetime.utcfromtimestamp(post.created_utc).month,
                "content_type": "post",
            }
            records.append(post_record)

            # Scrape top comments
            try:
                post.comments.replace_more(limit=0)
                for comment in list(post.comments)[:COMMENT_LIMIT]:
                    if len(comment.body) < 20:
                        continue
                    comment_record = {
                        **post_record,
                        "post_id": f"reddit_{comment.id}",
                        "text": comment.body[:800],
                        "likes": comment.score,
                        "comments": 0,
                        "upvote_ratio": None,
                        "content_type": "comment",
                    }
                    records.append(comment_record)
            except Exception:
                pass

            time.sleep(RATE_LIMIT_SLEEP)

    except Exception as e:
        print(f"    [WARN] r/{subreddit_name} — {e}")

    return records


def deduplicate(records: list[dict]) -> list[dict]:
    seen = set()
    unique = []
    for r in records:
        key = (r["post_id"], r["text"][:100])
        if key not in seen:
            seen.add(key)
            unique.append(r)
    return unique


def merge_with_corpus(new_df: pd.DataFrame) -> pd.DataFrame:
    existing_path = RAW_DIR / "social_corpus_raw.csv"
    if existing_path.exists():
        existing = pd.read_csv(existing_path)
        # Mark source if not already present
        if "source" not in existing.columns:
            existing["source"] = "simulated"
        combined = pd.concat([existing, new_df], ignore_index=True)
        combined = combined.drop_duplicates(subset=["post_id"])
        print(f"  Merged: {len(existing)} simulated + {len(new_df)} reddit = {len(combined)} total")
        return combined
    return new_df


def main():
    if not PRAW_AVAILABLE:
        print("[ERROR] praw not installed. Run: pip install praw python-dotenv")
        return

    print("Starting Reddit scrape...")
    reddit = init_reddit()
    print(f"  Authenticated as: {reddit.user.me() or 'read-only'}")

    all_records = []

    for movie, config in MOVIES.items():
        print(f"\n  Movie: {movie}")
        movie_records = []

        for subreddit in config["subreddits"]:
            for query in config["queries"]:
                print(f"    r/{subreddit} — '{query}'", end=" ... ")
                results = scrape_subreddit(reddit, subreddit, query, movie)
                print(f"{len(results)} items")
                movie_records.extend(results)
                time.sleep(RATE_LIMIT_SLEEP)

        movie_records = deduplicate(movie_records)
        print(f"  → {len(movie_records)} unique items for {movie}")
        all_records.extend(movie_records)

    new_df = pd.DataFrame(all_records)

    if new_df.empty:
        print("\n[WARN] No data scraped. Check credentials and search terms.")
        return

    # Save raw reddit-only data
    reddit_path = RAW_DIR / "reddit_raw.csv"
    new_df.to_csv(reddit_path, index=False)
    print(f"\n  Reddit data saved: {reddit_path} ({len(new_df)} rows)")

    # Merge with simulated corpus
    combined = merge_with_corpus(new_df)
    combined_path = RAW_DIR / "social_corpus_raw.csv"
    combined.to_csv(combined_path, index=False)
    print(f"  Combined corpus saved: {combined_path}")

    # Summary
    print("\n  Scrape Summary:")
    print(combined.groupby(["movie", "source"]).size().to_string() if "source" in combined.columns
          else combined.groupby("movie").size().to_string())

    meta = {
        "last_reddit_scrape": datetime.now().isoformat(),
        "reddit_posts_scraped": len(new_df),
        "total_corpus_size": len(combined),
        "movies": list(MOVIES.keys()),
        "subreddits_searched": {m: config["subreddits"] for m, config in MOVIES.items()},
    }
    with open(RAW_DIR / "corpus_metadata.json", "w") as f:
        json.dump(meta, f, indent=2)

    print("\n  Done. Now re-run the pipeline from step 02:")
    print("    cd scripts && python run_pipeline.py")


if __name__ == "__main__":
    main()
