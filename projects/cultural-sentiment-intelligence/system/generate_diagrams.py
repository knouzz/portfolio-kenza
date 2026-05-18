"""
Diagram Generator — HR-friendly version
Simple business language, no technical jargon.
Run: python system/generate_diagrams.py
"""

import warnings
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyBboxPatch
import numpy as np
from pathlib import Path

warnings.filterwarnings("ignore")

DIAGRAMS_DIR = Path(__file__).parent.parent / "diagrams"
DIAGRAMS_DIR.mkdir(parents=True, exist_ok=True)

BG    = "#0D0D0D"
SURF  = "#161616"
BORD  = "#2A2A2A"
TEXT  = "#EBEBEB"
SUB   = "#999999"
GOLD  = "#C9A84C"
BLUE  = "#4C7BC9"
GREEN = "#2ECC71"
RED   = "#E74C3C"
PURP  = "#9B59B6"
TEAL  = "#1ABC9C"
ORANGE= "#E67E22"


def _rounded_box(ax, x, y, w, h, facecolor, label, sublabel="",
                 label_color=TEXT, border_color=BORD, border_lw=1.2):
    box = FancyBboxPatch(
        (x - w / 2, y - h / 2), w, h,
        boxstyle="round,pad=0.025,rounding_size=0.05",
        facecolor=facecolor, edgecolor=border_color,
        linewidth=border_lw, zorder=3,
    )
    ax.add_patch(box)
    offset = 0.07 if sublabel else 0
    ax.text(x, y + offset, label, ha="center", va="center",
            fontsize=9, fontweight="bold", color=label_color, zorder=4)
    if sublabel:
        ax.text(x, y - 0.1, sublabel, ha="center", va="center",
                fontsize=7.5, color=SUB, zorder=4)


def _arrow(ax, x1, y1, x2, y2, color="#444444", lw=2.0, label="", label_offset=(0, 0.1)):
    ax.annotate("", xy=(x2, y2), xytext=(x1, y1),
                arrowprops=dict(
                    arrowstyle="-|>",
                    color=color,
                    lw=lw,
                    mutation_scale=16,
                    connectionstyle="arc3,rad=0.0",
                ), zorder=2)
    if label:
        mx = (x1 + x2) / 2 + label_offset[0]
        my = (y1 + y2) / 2 + label_offset[1]
        ax.text(mx, my, label, ha="center", va="center",
                fontsize=7, color=SUB, zorder=5)


def _section_header(ax, x, y, label, color=GOLD):
    ax.text(x, y, label.upper(), ha="center", va="center",
            fontsize=8, fontweight="bold", color=color, alpha=0.9)


def _divider(ax, x, ymin=0.08, ymax=0.88):
    ax.axvline(x=x, color=BORD, lw=0.8, alpha=0.5,
               ymin=ymin, ymax=ymax)


# ═══════════════════════════════════════════════════════════════════════
# DIAGRAM 1 — How the System Works (System Overview)
# ═══════════════════════════════════════════════════════════════════════
def diagram_how_it_works():
    fig, ax = plt.subplots(figsize=(18, 9), facecolor=BG)
    ax.set_facecolor(BG)
    ax.set_xlim(0, 18)
    ax.set_ylim(0, 9)
    ax.axis("off")

    # Title
    ax.text(9, 8.55, "How the System Works",
            ha="center", fontsize=17, fontweight="bold", color=TEXT)
    ax.text(9, 8.1,
            "An automated system that reads online conversations, understands audience emotions, and delivers daily intelligence reports",
            ha="center", fontsize=9.5, color=SUB)

    # Step labels
    steps = [
        (2.2,  "STEP 1\nListen"),
        (5.8,  "STEP 2\nUnderstand"),
        (9.5,  "STEP 3\nAnalyze"),
        (13.2, "STEP 4\nAlert"),
        (16.5, "STEP 5\nDeliver"),
    ]
    for x, label in steps:
        ax.text(x, 7.55, label, ha="center", fontsize=8.5,
                fontweight="bold", color=GOLD)

    # Dividers
    for x in [3.9, 7.6, 11.3, 15.0]:
        _divider(ax, x, ymin=0.08, ymax=0.85)

    # ── STEP 1: Listen ───────────────────────────────────────────────
    _rounded_box(ax, 2.2, 6.5, 2.8, 0.65, "#0F1822", "Reddit Discussions",    "What fans are posting")
    _rounded_box(ax, 2.2, 5.5, 2.8, 0.65, "#0F1822", "YouTube Comments",      "Reactions to trailers")
    _rounded_box(ax, 2.2, 4.5, 2.8, 0.65, "#0F1822", "Google Search Trends",  "What people are searching")
    _rounded_box(ax, 2.2, 3.3, 2.8, 0.65, SURF,      "870+ posts collected",  "across 5 platforms", label_color=BLUE)

    # ── STEP 2: Understand ───────────────────────────────────────────
    _rounded_box(ax, 5.8, 6.5, 2.8, 0.65, "#0F1F0F", "Emotion Detection",     "Is the post positive or negative?")
    _rounded_box(ax, 5.8, 5.5, 2.8, 0.65, "#0F1F0F", "Topic Identification",  "What are people talking about?")
    _rounded_box(ax, 5.8, 4.5, 2.8, 0.65, "#0F1F0F", "Excitement Scoring",    "How hyped is the audience?")
    _rounded_box(ax, 5.8, 3.3, 2.8, 0.65, SURF,      "Every post is scored",  "automatically", label_color=GREEN)

    # ── STEP 3: Analyze ──────────────────────────────────────────────
    _rounded_box(ax, 9.5, 6.5, 2.8, 0.65, "#1A0F1F", "Audience Profiles",     "Who are the different fan types?")
    _rounded_box(ax, 9.5, 5.5, 2.8, 0.65, "#1A0F1F", "Key Narratives",        "What story is driving opinions?")
    _rounded_box(ax, 9.5, 4.5, 2.8, 0.65, "#1A0F1F", "Movie Comparison",      "Which film has more excitement?")
    _rounded_box(ax, 9.5, 3.3, 2.8, 0.65, SURF,      "AI writes the summary", "in plain language", label_color=PURP)

    # ── STEP 4: Alert ────────────────────────────────────────────────
    _rounded_box(ax, 13.2, 6.5, 2.8, 0.65, "#1F1209", "Sudden Mood Shifts",   "Sentiment changed this week")
    _rounded_box(ax, 13.2, 5.5, 2.8, 0.65, "#1F1209", "Conversation Spikes",  "Unusually high post volume")
    _rounded_box(ax, 13.2, 4.5, 2.8, 0.65, "#1F1209", "Concern Surges",       "Negative chatter increasing")
    _rounded_box(ax, 13.2, 3.3, 2.8, 0.65, SURF,      "Runs every 6 hours",   "alerts sent automatically", label_color=ORANGE)

    # ── STEP 5: Deliver ──────────────────────────────────────────────
    _rounded_box(ax, 16.5, 6.5, 2.6, 0.65, "#1C1410", "Visual Charts",        "9 ready-to-present graphs")
    _rounded_box(ax, 16.5, 5.5, 2.6, 0.65, "#1C1410", "Performance Report",   "Key findings in plain English")
    _rounded_box(ax, 16.5, 4.5, 2.6, 0.65, "#1C1410", "Live Dashboard",       "Interactive Tableau view")
    _rounded_box(ax, 16.5, 3.3, 2.6, 0.65, SURF,      "Daily email digest",   "sent every morning", label_color=GOLD)

    # Arrows between steps
    for x1, x2, color in [
        (3.65, 4.35, BLUE),
        (7.25, 8.05, GREEN),
        (10.95, 11.75, PURP),
        (14.65, 15.2, ORANGE),
    ]:
        _arrow(ax, x1, 5.5, x2, 5.5, color=color, lw=2.5)

    # Bottom note
    ax.text(9, 0.55,
            "The system runs automatically — no manual work needed once it is set up.",
            ha="center", fontsize=9, color=SUB, style="italic")

    fig.savefig(DIAGRAMS_DIR / "01_how_it_works.png",
                dpi=150, bbox_inches="tight", facecolor=BG)
    plt.close(fig)
    print("  01_how_it_works.png")


# ═══════════════════════════════════════════════════════════════════════
# DIAGRAM 2 — From Online Post to Business Insight
# ═══════════════════════════════════════════════════════════════════════
def diagram_from_post_to_insight():
    fig, ax = plt.subplots(figsize=(16, 8), facecolor=BG)
    ax.set_facecolor(BG)
    ax.set_xlim(0, 16)
    ax.set_ylim(0, 8)
    ax.axis("off")

    ax.text(8, 7.55, "From Online Post to Business Insight",
            ha="center", fontsize=15, fontweight="bold", color=TEXT)
    ax.text(8, 7.1,
            "How a single fan comment becomes a strategic recommendation",
            ha="center", fontsize=9.5, color=SUB)

    # Journey steps — horizontal flow
    journey = [
        (1.6,  4.2, BLUE,   "A fan posts\na comment online",
                             "Reddit · YouTube · Google"),
        (4.5,  4.2, TEAL,   "The system\nreads it automatically",
                             "870+ posts collected"),
        (7.5,  4.2, GREEN,  "It detects the\nemotion and topic",
                             "Positive · Negative · Neutral"),
        (10.5, 4.2, PURP,   "It groups similar\naudience reactions",
                             "4 audience profiles identified"),
        (13.5, 4.2, GOLD,   "AI writes a\nstrategic summary",
                             "Ready for the marketing team"),
    ]

    for x, y, color, label, sub in journey:
        # Circle
        circle = plt.Circle((x, y + 0.8), 0.38, color=color,
                             alpha=0.2, zorder=2)
        ax.add_patch(circle)
        ax.text(x, y + 0.8, str(journey.index((x, y, color, label, sub)) + 1),
                ha="center", va="center", fontsize=14,
                fontweight="bold", color=color, zorder=3)

        _rounded_box(ax, x, y - 0.3, 2.4, 1.0, SURF, label, sub,
                     label_color=color, border_color=color, border_lw=1.0)

    # Arrows
    for x1, x2, color in [
        (2.85,  3.25, BLUE),
        (5.75,  6.25, TEAL),
        (8.75,  9.25, GREEN),
        (11.75, 12.25, PURP),
    ]:
        _arrow(ax, x1, 4.2, x2, 4.2, color=color, lw=2.5)

    # Output boxes
    outputs = [
        (3.0,  1.7, "Charts & Graphs",  BLUE),
        (6.5,  1.7, "Audience Report",  GREEN),
        (10.0, 1.7, "Trend Alerts",     ORANGE),
        (13.5, 1.7, "Tableau Dashboard",GOLD),
    ]
    for x, y, label, color in outputs:
        _rounded_box(ax, x, y, 2.4, 0.6, SURF, label,
                     label_color=color, border_color=color, border_lw=0.8)
        ax.annotate("", xy=(x, y + 0.32), xytext=(x, 2.85),
                    arrowprops=dict(arrowstyle="-|>", color=BORD,
                                   lw=1.0, linestyle="dashed",
                                   mutation_scale=10), zorder=2)

    ax.text(8, 0.55,
            "Everything is automated — the system collects, reads, and reports without manual input.",
            ha="center", fontsize=9, color=SUB, style="italic")

    fig.savefig(DIAGRAMS_DIR / "02_from_post_to_insight.png",
                dpi=150, bbox_inches="tight", facecolor=BG)
    plt.close(fig)
    print("  02_from_post_to_insight.png")


# ═══════════════════════════════════════════════════════════════════════
# DIAGRAM 3 — What the AI Does
# ═══════════════════════════════════════════════════════════════════════
def diagram_what_ai_does():
    fig, ax = plt.subplots(figsize=(15, 9), facecolor=BG)
    ax.set_facecolor(BG)
    ax.set_xlim(0, 15)
    ax.set_ylim(0, 9)
    ax.axis("off")

    ax.text(7.5, 8.6, "What the AI Does",
            ha="center", fontsize=15, fontweight="bold", color=TEXT)
    ax.text(7.5, 8.15,
            "Three layers of intelligence — each one turning raw data into a clearer business answer",
            ha="center", fontsize=9.5, color=SUB)

    # ── Layer 1: Read & Score ─────────────────────────────────────────
    ax.add_patch(FancyBboxPatch((0.4, 5.6), 4.2, 2.5,
                  boxstyle="round,pad=0.03", facecolor="#0A1A0A",
                  edgecolor=GREEN, lw=1.5, alpha=0.85))
    ax.text(2.5, 7.85, "LAYER 1 — READ & SCORE", ha="center",
            fontsize=9, fontweight="bold", color=GREEN)
    _rounded_box(ax, 2.5, 7.2,  3.6, 0.52, "#122012",
                 "Reads every post and comment",   "all 870+ collected pieces of text")
    _rounded_box(ax, 2.5, 6.55, 3.6, 0.52, "#122012",
                 "Gives each one an emotion score", "positive / negative / neutral")
    _rounded_box(ax, 2.5, 5.9,  3.6, 0.52, "#122012",
                 "Flags excitement or concern",     "based on specific words used")

    # ── Layer 2: Find Patterns ────────────────────────────────────────
    ax.add_patch(FancyBboxPatch((5.4, 5.6), 4.2, 2.5,
                  boxstyle="round,pad=0.03", facecolor="#12081A",
                  edgecolor=PURP, lw=1.5, alpha=0.85))
    ax.text(7.5, 7.85, "LAYER 2 — FIND PATTERNS", ha="center",
            fontsize=9, fontweight="bold", color=PURP)
    _rounded_box(ax, 7.5, 7.2,  3.6, 0.52, "#1A0F24",
                 "Groups audience into profiles",   "e.g. Nostalgic fans vs Critical observers")
    _rounded_box(ax, 7.5, 6.55, 3.6, 0.52, "#1A0F24",
                 "Identifies the main topics",      "e.g. 'Legacy', 'Controversy', 'Fashion'")
    _rounded_box(ax, 7.5, 5.9,  3.6, 0.52, "#1A0F24",
                 "Tracks how opinions change",      "week by week over 3 months")

    # ── Layer 3: Alert & Summarize ────────────────────────────────────
    ax.add_patch(FancyBboxPatch((10.4, 5.6), 4.2, 2.5,
                  boxstyle="round,pad=0.03", facecolor="#1A1005",
                  edgecolor=GOLD, lw=1.5, alpha=0.85))
    ax.text(12.5, 7.85, "LAYER 3 — ALERT & SUMMARIZE", ha="center",
            fontsize=9, fontweight="bold", color=GOLD)
    _rounded_box(ax, 12.5, 7.2,  3.6, 0.52, "#1A1005",
                 "Sends alerts when something shifts", "e.g. sudden spike in negative posts")
    _rounded_box(ax, 12.5, 6.55, 3.6, 0.52, "#1A1005",
                 "AI writes a plain-English summary",  "no jargon — ready for any team")
    _rounded_box(ax, 12.5, 5.9,  3.6, 0.52, "#1A1005",
                 "Delivers a report every morning",    "Mon–Fri by 8am automatically")

    # Arrows between layers
    _arrow(ax, 4.65, 6.85, 5.35, 6.85, color=BORD, lw=2.0)
    _arrow(ax, 9.65, 6.85, 10.35, 6.85, color=BORD, lw=2.0)

    # ── Business Outcomes ─────────────────────────────────────────────
    ax.text(7.5, 5.2, "BUSINESS OUTCOMES", ha="center",
            fontsize=9, fontweight="bold", color=GOLD)

    outcomes = [
        (1.8,  4.1, GREEN,  "Know how audiences\nreally feel",
                             "not just post counts"),
        (4.8,  4.1, PURP,   "Understand who\nyour audience is",
                             "4 distinct profiles per film"),
        (7.8,  4.1, BLUE,   "Compare films\nside by side",
                             "Excitement Index score"),
        (10.8, 4.1, ORANGE, "Get alerts before\nproblems grow",
                             "automated monitoring"),
        (13.5, 4.1, GOLD,   "Act on insight\nnot raw data",
                             "AI-written summaries"),
    ]
    for x, y, color, label, sub in outcomes:
        _rounded_box(ax, x, y, 2.6, 1.1, SURF, label, sub,
                     label_color=color, border_color=color, border_lw=1.0)

    # Connector lines from layers to outcomes
    for x_from, x_to, color in [
        (2.5, 1.8, GREEN), (7.5, 4.8, PURP),
        (7.5, 7.8, BLUE), (12.5, 10.8, ORANGE), (12.5, 13.5, GOLD),
    ]:
        ax.annotate("", xy=(x_to, 4.7), xytext=(x_from, 5.55),
                    arrowprops=dict(arrowstyle="-|>", color=BORD,
                                   lw=0.9, linestyle="dashed",
                                   mutation_scale=9), zorder=1)

    # Quote box
    ax.add_patch(FancyBboxPatch((1.5, 0.4), 12.0, 0.95,
                  boxstyle="round,pad=0.03", facecolor=SURF,
                  edgecolor=BORD, lw=1.0, alpha=0.7))
    ax.text(7.5, 0.88,
            "\"This system does in minutes what would take a research team days —",
            ha="center", fontsize=9, color=TEXT, style="italic")
    ax.text(7.5, 0.57,
            "reading thousands of opinions, finding patterns, and writing the summary.\"",
            ha="center", fontsize=9, color=SUB, style="italic")

    fig.savefig(DIAGRAMS_DIR / "03_what_ai_does.png",
                dpi=150, bbox_inches="tight", facecolor=BG)
    plt.close(fig)
    print("  03_what_ai_does.png")


def main():
    print("Generating HR-friendly diagrams...")
    diagram_how_it_works()
    diagram_from_post_to_insight()
    diagram_what_ai_does()
    print(f"\n  All diagrams saved to: {DIAGRAMS_DIR}")


if __name__ == "__main__":
    main()
