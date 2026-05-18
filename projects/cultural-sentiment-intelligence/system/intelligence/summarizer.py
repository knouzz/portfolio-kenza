"""
Intelligence: AI Summarizer
Uses OpenAI GPT-4o-mini to generate narrative intelligence summaries.
Falls back to extractive summarization when API key is not available.
"""

import os
import json
import textwrap
import pandas as pd
from pathlib import Path
from datetime import datetime

try:
    from dotenv import load_dotenv
    load_dotenv(Path(__file__).parent.parent.parent / ".env")
except ImportError:
    pass

try:
    from openai import OpenAI
    OPENAI_AVAILABLE = True
except ImportError:
    OPENAI_AVAILABLE = False

EXPORTS_DIR = Path(__file__).parent.parent.parent / "data" / "exports"
REPORTS_DIR = Path(__file__).parent.parent.parent / "reports"
REPORTS_DIR.mkdir(parents=True, exist_ok=True)

MODEL        = "gpt-4o-mini"
MAX_TOKENS   = 600
SAMPLE_POSTS = 30   # posts fed to the AI per movie


SYSTEM_PROMPT = """You are a senior cultural intelligence analyst for a media strategy firm.
You analyze online audience discussions to extract strategic insights about film audiences.
Your tone is professional, precise, and BI-oriented — not fan-focused.
Avoid superlatives. Be analytical. Speak to brand strategists and marketing directors."""


def _build_prompt(movie: str, kpi_row: pd.Series, posts: list[str], themes: dict) -> str:
    theme_list = ""
    movie_themes = themes.get(movie, {}).get("themes", [])
    for t in movie_themes[:5]:
        theme_list += f"  - {t['label']} ({t['share']*100:.0f}% of posts, sentiment: {t['avg_sentiment']:+.2f})\n"

    sample_text = "\n".join(f"  • {p[:200]}" for p in posts[:SAMPLE_POSTS])

    return f"""Movie: {movie}

KPIs:
- Total posts analyzed: {int(kpi_row.get('total_posts', 0)):,}
- Avg sentiment score: {kpi_row.get('avg_sentiment', 0):+.4f}
- Positive mention rate: {kpi_row.get('positive_mention_pct', 0):.1f}%
- Negative mention rate: {kpi_row.get('negative_mention_pct', 0):.1f}%
- Audience excitement index: {kpi_row.get('audience_excitement_index', 0):.4f}
- Avg engagement score: {kpi_row.get('avg_engagement', 0):.3f}

Identified narrative themes:
{theme_list}

Sample audience posts:
{sample_text}

---

Write a 3-paragraph strategic intelligence summary:
1. What the data reveals about this audience's emotional state and readiness
2. The dominant narrative driving sentiment (positive or negative)
3. One strategic recommendation for marketing or audience activation

Be concise, analytical, and insight-driven."""


def _extractive_fallback(movie: str, kpi_row: pd.Series, themes: dict) -> str:
    """Deterministic extractive summary when no API key is available."""
    sent = float(kpi_row.get("avg_sentiment", 0))
    pos_pct = float(kpi_row.get("positive_mention_pct", 0))
    neg_pct = float(kpi_row.get("negative_mention_pct", 0))
    exc_idx = float(kpi_row.get("audience_excitement_index", 0))

    tone = "strongly positive" if sent > 0.2 else "moderately positive" if sent > 0 else "mixed"
    top_theme = ""
    themes_list = themes.get(movie, {}).get("themes", [])
    if themes_list:
        top_theme = max(themes_list, key=lambda t: t["post_count"])["label"]

    return textwrap.dedent(f"""
    **Audience Emotional State:** Online discourse around *{movie}* is {tone},
    with {pos_pct:.1f}% of posts classified as positive and {neg_pct:.1f}% as negative.
    The audience excitement index stands at {exc_idx:.3f}, indicating
    {'strong pre-release momentum' if exc_idx > 0.5 else 'moderate anticipation with notable skepticism'}.

    **Dominant Narrative:** The most prevalent theme is "{top_theme}" — driving
    the bulk of discussion volume and shaping the emotional register of the conversation.
    {'Positive framing dominates, anchored in nostalgia and cultural affinity.' if sent > 0.1
     else 'Discourse is polarized, with competing narratives pulling sentiment in opposing directions.'}

    **Strategic Recommendation:** {'Activate the core positive audience segment early to build
    word-of-mouth momentum before release. Focus marketing on the dominant emotional driver.' if sent > 0
     else 'Address the concern narrative directly through targeted content. Neutralize skepticism
    before it compounds into a pre-release negative cycle.'}
    """).strip()


def summarize_movie(
    movie: str,
    kpi_row: pd.Series,
    df_movie: pd.DataFrame,
    themes: dict,
    client=None,
) -> str:
    col   = "text_clean" if "text_clean" in df_movie.columns else "text"
    posts = (
        df_movie[df_movie["sentiment_label"] == "positive"][col]
        .sample(min(15, len(df_movie[df_movie["sentiment_label"] == "positive"])), random_state=42)
        .tolist()
        +
        df_movie[df_movie["sentiment_label"] == "negative"][col]
        .sample(min(10, len(df_movie[df_movie["sentiment_label"] == "negative"])), random_state=42)
        .tolist()
    ) if "sentiment_label" in df_movie.columns else df_movie[col].sample(min(25, len(df_movie)), random_state=42).tolist()

    if client is None or not OPENAI_AVAILABLE:
        return _extractive_fallback(movie, kpi_row, themes)

    try:
        prompt = _build_prompt(movie, kpi_row, posts, themes)
        response = client.chat.completions.create(
            model=MODEL,
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user",   "content": prompt},
            ],
            max_tokens=MAX_TOKENS,
            temperature=0.4,
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        print(f"    [WARN] OpenAI call failed ({e}) — using extractive fallback")
        return _extractive_fallback(movie, kpi_row, themes)


def run(df: pd.DataFrame, kpis: pd.DataFrame, themes: dict) -> dict:
    print("  AI summarizer running...")

    api_key = os.getenv("OPENAI_API_KEY")
    client  = OpenAI(api_key=api_key) if (OPENAI_AVAILABLE and api_key) else None

    if client:
        print(f"    Using OpenAI {MODEL}")
    else:
        print("    No OPENAI_API_KEY — using extractive fallback summarizer")

    summaries = {}
    for movie in df["movie"].unique():
        df_movie = df[df["movie"] == movie]
        kpi_row  = kpis.loc[movie] if movie in kpis.index else pd.Series()
        summary  = summarize_movie(movie, kpi_row, df_movie, themes, client)
        summaries[movie] = summary
        print(f"    Summary generated: {movie}")

    # Save individual summaries
    for movie, summary in summaries.items():
        slug = movie.replace(" ", "_").replace("/", "-")[:30]
        path = REPORTS_DIR / f"summary_{slug}.md"
        path.write_text(f"# {movie} — Audience Intelligence Summary\n\n{summary}\n")

    # Combined JSON export
    with open(EXPORTS_DIR / "ai_summaries.json", "w") as f:
        json.dump({
            "generated_at": datetime.now().isoformat(),
            "model":        MODEL if client else "extractive-fallback",
            "summaries":    summaries,
        }, f, indent=2)

    print(f"    Summaries saved to reports/ and exports/")
    return summaries
