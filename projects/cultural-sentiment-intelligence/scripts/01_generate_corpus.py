"""
Script 01 — Corpus Generation
Generates a realistic simulated social media corpus for two movies.
Designed to mirror Reddit/Twitter discussion patterns.
"""

import pandas as pd
import numpy as np
import random
import json
from datetime import datetime, timedelta
from pathlib import Path

SEED = 42
random.seed(SEED)
np.random.seed(SEED)

OUTPUT_DIR = Path(__file__).parent.parent / "data" / "raw"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# ─── Thematic post pools ────────────────────────────────────────────────────

DWPRADA_POSTS = [
    # Nostalgia / excitement
    "I've been waiting for this sequel for 15 years. Miranda Priestly is back and I am NOT ready.",
    "The teaser just dropped and I'm already emotional. Fashion, power, and Meryl Streep.",
    "Devil Wears Prada 2 is giving me everything I didn't know I needed. The casting looks *chef's kiss*.",
    "Can we talk about how perfectly aged this story is? The fashion industry critique hits differently now.",
    "Meryl Streep in a sequel? She doesn't do sequels. This must be THAT good.",
    "The aesthetic is immaculate. That first look at the editorial set made me gasp.",
    "I'm a fashion journalist and this movie is basically a love letter to our industry. Excited doesn't cover it.",
    "Devil Wears Prada shaped my entire career path. This sequel feels personal.",
    "Anne Hathaway returning means this is going to be emotionally devastating. I'm prepared.",
    "The original is a masterpiece of corporate satire. Sequel has massive shoes to fill.",
    # Skepticism
    "Sequels to perfect movies almost never work. I'm cautiously optimistic but nervous.",
    "The original didn't need a sequel. Hope they don't ruin the legacy.",
    "Not sure how they'll top the original. The bar is literally Meryl Streep at peak Meryl.",
    "I'll watch it but I have reservations. Fashion films are very of-their-moment.",
    "The writing needs to be sharp. Fashion satire works best when it's uncomfortable.",
    # Neutral / analytical
    "Box office tracking says this is projected to open at 60M+. Makes sense given the IP.",
    "Interesting that they're releasing this during awards season. Strategic positioning.",
    "The demographic skew toward 25-45 women is very clear in the marketing. Smart targeting.",
    "This will be fascinating to analyze from an audience reception standpoint.",
    "The nostalgia economy is real. Studios know exactly what they're doing with this IP.",
    # Fashion/industry
    "The costume design alone justifies a ticket. Anna Wintour era aesthetic is peak cinema.",
    "Fashion Twitter is absolutely losing it. Rightfully so.",
    "This is the fashion girl movie of the decade. Period.",
    "The industry commentary in the original was years ahead of its time. Can't wait to see 2024 through that lens.",
    "Every fashion editor I know has already pre-booked opening weekend.",
    # Mixed/critical
    "The pacing of the trailer felt a bit rushed. Hope the actual film breathes more.",
    "Some of the new casting choices are surprising. Trust the director but will reserve judgment.",
    "Hoping they address the toxic workplace dynamics more critically this time.",
    "The fashion sequences look incredible. The plot remains to be seen.",
    "Good trailer. Not great. But the bar for the actual film is set correctly.",
]

MICHAEL_POSTS = [
    # Legacy / emotional
    "Michael Jackson's story deserves to be told with this level of care. The trailer gave me chills.",
    "If they get the music and the movement right, this will be one of the most important biopics ever made.",
    "Watching Jaafar Jackson embody his father is genuinely moving. The resemblance is uncanny.",
    "The King of Pop on the big screen with full music rights. This is a historic moment for music cinema.",
    "I grew up listening to MJ. This film feels like a love letter to an entire generation.",
    "The choreography in the trailer already looks stunning. They clearly invested in getting it right.",
    "Motown, Off the Wall, Thriller era all in one film? The scope is incredible.",
    "Michael Jackson's cultural impact is genuinely underrepresented in cinema. This is overdue.",
    "The decision to cast his actual son is bold and beautiful. Can't imagine it going any other way.",
    "This is going to be emotionally overwhelming. I'm already not ready.",
    # Controversy / skepticism
    "Can't ignore the documentary accusations. This film feels like reputation rehabilitation.",
    "Leaving Neverland made it impossible for me to separate the art from the artist here.",
    "The estate controlling the narrative is a legitimate concern for journalistic integrity.",
    "I want to love this but the controversy makes it complicated. Conflicted.",
    "Celebrating MJ's artistry while ignoring the serious allegations feels irresponsible.",
    "The fan base will love it. Everyone else will have questions about editorial choices.",
    # Neutral / industry
    "The box office upside here is massive if they can navigate the controversy cleanly.",
    "Music biopics have a very specific commercial formula. MJ is the ultimate subject.",
    "Graham King producing means serious awards intentions here. Not just a cash grab.",
    "The marketing challenge for this film is one of the most complex in recent Hollywood history.",
    "How this performs internationally will be fascinating. MJ's global brand is unprecedented.",
    # Music-focused
    "If they include the full Thriller sequence I will cry in the theater. Not a question.",
    "The music catalog alone makes this a theatrical experience. Needs to be seen on IMAX.",
    "Beat It, Billie Jean, Man in the Mirror — on a cinema screen with surround sound. Come on.",
    "The sonic experience of this film is going to be unmatched. Pop history on screen.",
    "Every music lover owes it to themselves to experience this in a theater.",
    # Critical / analytical
    "Biopic storytelling is hard. MJ's life is extraordinarily complex. Hoping they don't simplify.",
    "The runtime reportedly over 2.5 hours. They'll need every minute for this story.",
    "The decision to not address the allegations directly is a narrative choice with real consequences.",
    "Strong performance from Jaafar but the script carries all the risk.",
    "This is a marketing and cultural experiment as much as it is a film.",
]

PLATFORMS = ["Reddit", "Twitter/X", "TikTok comments", "YouTube comments", "Instagram"]
SUBREDDITS_DWP = ["r/movies", "r/TrueFilm", "r/femalefashionadvice", "r/boxoffice", "r/Oscars"]
SUBREDDITS_MJ = ["r/movies", "r/Music", "r/MichaelJackson", "r/boxoffice", "r/TrueFilm"]


def generate_engagement(sentiment_score: float, base: int = 100) -> dict:
    """Engagement correlates loosely with sentiment intensity (positive or negative)."""
    intensity = abs(sentiment_score)
    noise = np.random.normal(1, 0.3)
    likes = max(0, int(base * (1 + intensity * 3) * noise))
    comments = max(0, int(likes * random.uniform(0.05, 0.4)))
    shares = max(0, int(likes * random.uniform(0.01, 0.15)))
    return {"likes": likes, "comments": comments, "shares": shares}


def random_date(start: datetime, days: int = 90) -> datetime:
    return start + timedelta(
        days=random.randint(0, days),
        hours=random.randint(0, 23),
        minutes=random.randint(0, 59),
    )


def build_corpus(
    movie: str,
    posts: list[str],
    subreddits: list[str],
    n_posts: int = 400,
    start_date: datetime = datetime(2025, 9, 1),
) -> list[dict]:
    records = []
    for i in range(n_posts):
        text = random.choice(posts)
        # Add light variation
        suffixes = [
            "", " Thoughts?", " Anyone else feel this way?",
            " Can't wait.", " Genuinely can't stop thinking about this.",
            " Hot take.", " Real talk.", " Fight me.",
        ]
        text = text + random.choice(suffixes)

        platform = random.choice(PLATFORMS)
        subreddit = random.choice(subreddits) if platform == "Reddit" else None

        # Simulate rough sentiment from post pool position
        # Earlier posts (excitement) skew positive, middle (skeptical) skew negative
        pool_idx = posts.index(random.choice(posts))
        base_sentiment = 0.6 - (pool_idx / len(posts)) * 1.2  # [-0.6, 0.6]
        sentiment_noise = np.random.normal(0, 0.15)
        raw_sentiment = float(np.clip(base_sentiment + sentiment_noise, -1, 1))

        engagement = generate_engagement(raw_sentiment)
        post_date = random_date(start_date)

        records.append({
            "movie": movie,
            "post_id": f"{movie[:3].upper()}_{i:04d}",
            "text": text,
            "platform": platform,
            "subreddit": subreddit,
            "date": post_date.strftime("%Y-%m-%d"),
            "timestamp": post_date.isoformat(),
            "likes": engagement["likes"],
            "comments": engagement["comments"],
            "shares": engagement["shares"],
            "week": post_date.isocalendar()[1],
            "month": post_date.month,
        })
    return records


def main():
    print("Generating corpus...")

    dwp_records = build_corpus(
        movie="The Devil Wears Prada 2",
        posts=DWPRADA_POSTS,
        subreddits=SUBREDDITS_DWP,
        n_posts=450,
        start_date=datetime(2025, 8, 1),
    )

    michael_records = build_corpus(
        movie="Michael",
        posts=MICHAEL_POSTS,
        subreddits=SUBREDDITS_MJ,
        n_posts=420,
        start_date=datetime(2025, 8, 1),
    )

    all_records = dwp_records + michael_records
    random.shuffle(all_records)

    df = pd.DataFrame(all_records)
    out_path = OUTPUT_DIR / "social_corpus_raw.csv"
    df.to_csv(out_path, index=False)

    print(f"  Corpus saved: {out_path}")
    print(f"  Total posts: {len(df)}")
    print(f"  DWP2: {len(dwp_records)} | Michael: {len(michael_records)}")
    print(f"  Platforms: {df['platform'].value_counts().to_dict()}")

    meta = {
        "generated_at": datetime.now().isoformat(),
        "total_posts": len(df),
        "movies": ["The Devil Wears Prada 2", "Michael"],
        "date_range": [df["date"].min(), df["date"].max()],
        "platforms": df["platform"].value_counts().to_dict(),
    }
    with open(OUTPUT_DIR / "corpus_metadata.json", "w") as f:
        json.dump(meta, f, indent=2)

    print("  Metadata saved.")
    return df


if __name__ == "__main__":
    main()
