"""
Script 08 — Tableau Workbook Builder
Generates a packaged .twbx Tableau workbook with:
  - 6 pre-built worksheet views
  - 1 executive dashboard layout
  - Embedded CSV data sources
"""

import zipfile
import shutil
import pandas as pd
from pathlib import Path
from datetime import datetime
import xml.etree.ElementTree as ET

EXPORTS_DIR = Path(__file__).parent.parent / "data" / "exports"
PROCESSED_DIR = Path(__file__).parent.parent / "data" / "processed"
OUTPUT_DIR = Path(__file__).parent.parent / "reports"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

WORKBOOK_NAME = "Cultural_Sentiment_Intelligence"

AMBER = "#C9A84C"
BLUE  = "#4C7BC9"
GREEN = "#2ECC71"
RED   = "#E74C3C"
DARK  = "#1A1A1A"
LIGHT = "#F0F0F0"

MOVIE_COLORS = {
    "The Devil Wears Prada 2": AMBER,
    "Michael": BLUE,
}


def xml_color(hex_color: str) -> str:
    """Convert #RRGGBB to Tableau's format."""
    h = hex_color.lstrip("#")
    r, g, b = int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16)
    return f"#{h.upper()}"


def build_twb(kpis: pd.DataFrame, master: pd.DataFrame, weekly: pd.DataFrame) -> str:
    """Generate the full .twb XML as a string."""

    movies = list(kpis.index)

    # Pre-compute values for annotations
    winner = kpis["audience_excitement_index"].idxmax()
    winner_score = float(kpis.loc[winner, "audience_excitement_index"])
    runner_up = [m for m in movies if m != winner][0]
    runner_score = float(kpis.loc[runner_up, "audience_excitement_index"])

    dwp_pos = float(kpis.loc["The Devil Wears Prada 2", "positive_mention_pct"])
    mj_pos  = float(kpis.loc["Michael", "positive_mention_pct"])
    dwp_sent = float(kpis.loc["The Devil Wears Prada 2", "avg_sentiment"])
    mj_sent  = float(kpis.loc["Michael", "avg_sentiment"])

    twb = f"""<?xml version='1.0' encoding='utf-8' ?>

<workbook source-build='2023.1.0' source-platform='mac' version='18.1'
  xmlns:user='http://www.tableausoftware.com/xml/user'>

  <document-format-change-manifest>
    <_.fcp.SchemaViewerObjectModel.true..._.fcp.SchemaViewerObjectModel>
  </document-format-change-manifest>

  <preferences>
    <color-palette name='Cultural Sentiment' type='regular'>
      <color>{AMBER}</color>
      <color>{BLUE}</color>
      <color>{GREEN}</color>
      <color>{RED}</color>
    </color-palette>
  </preferences>

  <datasources>

    <!-- ── KPI Summary ─────────────────────────────────────────────── -->
    <datasource caption='KPI Summary' inline='true' name='kpi_summary'
      version='18.1'>
      <connection class='textscan' filename='kpi_summary.csv'
        separator=',' >
        <_.fcp.SchemaViewerObjectModel.true..._.fcp.SchemaViewerObjectModel>
        <relation name='kpi_summary.csv' table='[kpi_summary#csv]'
          type='table' />
        <metadata-records>
          <metadata-record class='column'>
            <remote-name>movie</remote-name><remote-type>129</remote-type>
            <local-name>[movie]</local-name><parent-name>[kpi_summary#csv]</parent-name>
            <local-type>string</local-type><aggregation>Count</aggregation>
          </metadata-record>
          <metadata-record class='column'>
            <remote-name>avg_sentiment</remote-name><remote-type>5</remote-type>
            <local-name>[avg_sentiment]</local-name><parent-name>[kpi_summary#csv]</parent-name>
            <local-type>real</local-type><aggregation>Sum</aggregation>
          </metadata-record>
          <metadata-record class='column'>
            <remote-name>positive_mention_pct</remote-name><remote-type>5</remote-type>
            <local-name>[positive_mention_pct]</local-name><parent-name>[kpi_summary#csv]</parent-name>
            <local-type>real</local-type><aggregation>Sum</aggregation>
          </metadata-record>
          <metadata-record class='column'>
            <remote-name>negative_mention_pct</remote-name><remote-type>5</remote-type>
            <local-name>[negative_mention_pct]</local-name><parent-name>[kpi_summary#csv]</parent-name>
            <local-type>real</local-type><aggregation>Sum</aggregation>
          </metadata-record>
          <metadata-record class='column'>
            <remote-name>avg_engagement</remote-name><remote-type>5</remote-type>
            <local-name>[avg_engagement]</local-name><parent-name>[kpi_summary#csv]</parent-name>
            <local-type>real</local-type><aggregation>Sum</aggregation>
          </metadata-record>
          <metadata-record class='column'>
            <remote-name>audience_excitement_index</remote-name><remote-type>5</remote-type>
            <local-name>[audience_excitement_index]</local-name><parent-name>[kpi_summary#csv]</parent-name>
            <local-type>real</local-type><aggregation>Sum</aggregation>
          </metadata-record>
          <metadata-record class='column'>
            <remote-name>total_posts</remote-name><remote-type>20</remote-type>
            <local-name>[total_posts]</local-name><parent-name>[kpi_summary#csv]</parent-name>
            <local-type>integer</local-type><aggregation>Sum</aggregation>
          </metadata-record>
          <metadata-record class='column'>
            <remote-name>total_likes</remote-name><remote-type>20</remote-type>
            <local-name>[total_likes]</local-name><parent-name>[kpi_summary#csv]</parent-name>
            <local-type>integer</local-type><aggregation>Sum</aggregation>
          </metadata-record>
        </metadata-records>
      </connection>
      <aliases enabled='yes' />
    </datasource>

    <!-- ── Master Dataset ─────────────────────────────────────────── -->
    <datasource caption='Master Dataset' inline='true' name='master_dataset'
      version='18.1'>
      <connection class='textscan' filename='master_dataset.csv'
        separator=',' >
        <relation name='master_dataset.csv' table='[master_dataset#csv]'
          type='table' />
        <metadata-records>
          <metadata-record class='column'>
            <remote-name>movie</remote-name><remote-type>129</remote-type>
            <local-name>[movie]</local-name><parent-name>[master_dataset#csv]</parent-name>
            <local-type>string</local-type><aggregation>Count</aggregation>
          </metadata-record>
          <metadata-record class='column'>
            <remote-name>sentiment_label</remote-name><remote-type>129</remote-type>
            <local-name>[sentiment_label]</local-name><parent-name>[master_dataset#csv]</parent-name>
            <local-type>string</local-type><aggregation>Count</aggregation>
          </metadata-record>
          <metadata-record class='column'>
            <remote-name>platform</remote-name><remote-type>129</remote-type>
            <local-name>[platform]</local-name><parent-name>[master_dataset#csv]</parent-name>
            <local-type>string</local-type><aggregation>Count</aggregation>
          </metadata-record>
          <metadata-record class='column'>
            <remote-name>cluster_label</remote-name><remote-type>129</remote-type>
            <local-name>[cluster_label]</local-name><parent-name>[master_dataset#csv]</parent-name>
            <local-type>string</local-type><aggregation>Count</aggregation>
          </metadata-record>
          <metadata-record class='column'>
            <remote-name>date</remote-name><remote-type>129</remote-type>
            <local-name>[date]</local-name><parent-name>[master_dataset#csv]</parent-name>
            <local-type>date</local-type><aggregation>Year</aggregation>
          </metadata-record>
          <metadata-record class='column'>
            <remote-name>vader_compound</remote-name><remote-type>5</remote-type>
            <local-name>[vader_compound]</local-name><parent-name>[master_dataset#csv]</parent-name>
            <local-type>real</local-type><aggregation>Avg</aggregation>
          </metadata-record>
          <metadata-record class='column'>
            <remote-name>engagement_score</remote-name><remote-type>5</remote-type>
            <local-name>[engagement_score]</local-name><parent-name>[master_dataset#csv]</parent-name>
            <local-type>real</local-type><aggregation>Avg</aggregation>
          </metadata-record>
          <metadata-record class='column'>
            <remote-name>likes</remote-name><remote-type>20</remote-type>
            <local-name>[likes]</local-name><parent-name>[master_dataset#csv]</parent-name>
            <local-type>integer</local-type><aggregation>Sum</aggregation>
          </metadata-record>
          <metadata-record class='column'>
            <remote-name>comments</remote-name><remote-type>20</remote-type>
            <local-name>[comments]</local-name><parent-name>[master_dataset#csv]</parent-name>
            <local-type>integer</local-type><aggregation>Sum</aggregation>
          </metadata-record>
          <metadata-record class='column'>
            <remote-name>hype_signal_count</remote-name><remote-type>20</remote-type>
            <local-name>[hype_signal_count]</local-name><parent-name>[master_dataset#csv]</parent-name>
            <local-type>integer</local-type><aggregation>Avg</aggregation>
          </metadata-record>
          <metadata-record class='column'>
            <remote-name>concern_signal_count</remote-name><remote-type>20</remote-type>
            <local-name>[concern_signal_count]</local-name><parent-name>[master_dataset#csv]</parent-name>
            <local-type>integer</local-type><aggregation>Avg</aggregation>
          </metadata-record>
        </metadata-records>
      </connection>
      <aliases enabled='yes' />

      <!-- Calculated Fields -->
      <column caption='Sentiment Category Color' datatype='string'
        default-role='dimension' default-type='nominal'
        name='[Calc_SentColor]' role='dimension' type='nominal'>
        <calculation class='tableau' formula='IF [sentiment_label] = "positive" THEN "{GREEN}"
ELSEIF [sentiment_label] = "negative" THEN "{RED}"
ELSE "#BDC3C7"
END' />
      </column>

      <column caption='Movie Short Name' datatype='string'
        default-role='dimension' default-type='nominal'
        name='[Calc_MovieShort]' role='dimension' type='nominal'>
        <calculation class='tableau' formula='IF [movie] = "The Devil Wears Prada 2" THEN "DWP2" ELSE "Michael" END' />
      </column>

      <column caption='Is Positive' datatype='boolean'
        default-role='measure' default-type='quantitative'
        name='[Calc_IsPositive]' role='measure' type='quantitative'>
        <calculation class='tableau' formula='[sentiment_label] = "positive"' />
      </column>

    </datasource>

    <!-- ── Sentiment Over Time ────────────────────────────────────── -->
    <datasource caption='Sentiment Over Time' inline='true' name='sentiment_over_time'
      version='18.1'>
      <connection class='textscan' filename='sentiment_over_time.csv' separator=',' >
        <relation name='sentiment_over_time.csv' table='[sentiment_over_time#csv]' type='table' />
        <metadata-records>
          <metadata-record class='column'>
            <remote-name>movie</remote-name><remote-type>129</remote-type>
            <local-name>[movie]</local-name><parent-name>[sentiment_over_time#csv]</parent-name>
            <local-type>string</local-type><aggregation>Count</aggregation>
          </metadata-record>
          <metadata-record class='column'>
            <remote-name>week_start</remote-name><remote-type>129</remote-type>
            <local-name>[week_start]</local-name><parent-name>[sentiment_over_time#csv]</parent-name>
            <local-type>date</local-type><aggregation>Week</aggregation>
          </metadata-record>
          <metadata-record class='column'>
            <remote-name>avg_sentiment</remote-name><remote-type>5</remote-type>
            <local-name>[avg_sentiment]</local-name><parent-name>[sentiment_over_time#csv]</parent-name>
            <local-type>real</local-type><aggregation>Avg</aggregation>
          </metadata-record>
          <metadata-record class='column'>
            <remote-name>post_volume</remote-name><remote-type>20</remote-type>
            <local-name>[post_volume]</local-name><parent-name>[sentiment_over_time#csv]</parent-name>
            <local-type>integer</local-type><aggregation>Sum</aggregation>
          </metadata-record>
          <metadata-record class='column'>
            <remote-name>avg_engagement</remote-name><remote-type>5</remote-type>
            <local-name>[avg_engagement]</local-name><parent-name>[sentiment_over_time#csv]</parent-name>
            <local-type>real</local-type><aggregation>Avg</aggregation>
          </metadata-record>
        </metadata-records>
      </connection>
      <aliases enabled='yes' />
    </datasource>

    <!-- ── Cluster Profiles ───────────────────────────────────────── -->
    <datasource caption='Cluster Profiles' inline='true' name='cluster_profiles'
      version='18.1'>
      <connection class='textscan' filename='cluster_profiles.csv' separator=',' >
        <relation name='cluster_profiles.csv' table='[cluster_profiles#csv]' type='table' />
        <metadata-records>
          <metadata-record class='column'>
            <remote-name>movie</remote-name><remote-type>129</remote-type>
            <local-name>[movie]</local-name><parent-name>[cluster_profiles#csv]</parent-name>
            <local-type>string</local-type><aggregation>Count</aggregation>
          </metadata-record>
          <metadata-record class='column'>
            <remote-name>cluster_label</remote-name><remote-type>129</remote-type>
            <local-name>[cluster_label]</local-name><parent-name>[cluster_profiles#csv]</parent-name>
            <local-type>string</local-type><aggregation>Count</aggregation>
          </metadata-record>
          <metadata-record class='column'>
            <remote-name>post_count</remote-name><remote-type>20</remote-type>
            <local-name>[post_count]</local-name><parent-name>[cluster_profiles#csv]</parent-name>
            <local-type>integer</local-type><aggregation>Sum</aggregation>
          </metadata-record>
          <metadata-record class='column'>
            <remote-name>cluster_share</remote-name><remote-type>5</remote-type>
            <local-name>[cluster_share]</local-name><parent-name>[cluster_profiles#csv]</parent-name>
            <local-type>real</local-type><aggregation>Sum</aggregation>
          </metadata-record>
          <metadata-record class='column'>
            <remote-name>avg_sentiment</remote-name><remote-type>5</remote-type>
            <local-name>[avg_sentiment]</local-name><parent-name>[cluster_profiles#csv]</parent-name>
            <local-type>real</local-type><aggregation>Avg</aggregation>
          </metadata-record>
          <metadata-record class='column'>
            <remote-name>positive_rate</remote-name><remote-type>5</remote-type>
            <local-name>[positive_rate]</local-name><parent-name>[cluster_profiles#csv]</parent-name>
            <local-type>real</local-type><aggregation>Avg</aggregation>
          </metadata-record>
          <metadata-record class='column'>
            <remote-name>avg_engagement</remote-name><remote-type>5</remote-type>
            <local-name>[avg_engagement]</local-name><parent-name>[cluster_profiles#csv]</parent-name>
            <local-type>real</local-type><aggregation>Avg</aggregation>
          </metadata-record>
          <metadata-record class='column'>
            <remote-name>audience_excitement_index</remote-name><remote-type>5</remote-type>
            <local-name>[audience_excitement_index]</local-name><parent-name>[cluster_profiles#csv]</parent-name>
            <local-type>real</local-type><aggregation>Avg</aggregation>
          </metadata-record>
        </metadata-records>
      </connection>
      <aliases enabled='yes' />
    </datasource>

  </datasources>

  <worksheets>

    <!-- ═══════════════════════════════════════════════════════════════
         SHEET 1: Audience Excitement Index (Bar)
    ═══════════════════════════════════════════════════════════════════ -->
    <worksheet name='1. Excitement Index'>
      <table>
        <view>
          <datasources>
            <datasource caption='KPI Summary' name='kpi_summary' />
          </datasources>
          <datasource-dependencies datasource='kpi_summary'>
            <column datatype='string' name='[movie]' role='dimension' type='nominal' />
            <column datatype='real' name='[audience_excitement_index]' role='measure' type='quantitative'>
              <calculation class='tableau' formula='AVG([audience_excitement_index])' />
            </column>
          </datasource-dependencies>
          <shelf-sorts>
            <field-sort-spec column='[audience_excitement_index]' datasource='kpi_summary'
              direction='DESC' using='field' />
          </shelf-sorts>
          <rows>[audience_excitement_index]</rows>
          <cols>[movie]</cols>
          <style>
            <style-rule element='mark'>
              <encoding attr='color' field='[movie]' palette='Cultural Sentiment' type='palette' />
            </style-rule>
          </style>
        </view>
        <style>
          <style-rule element='view'>
            <encoding attr='title' value='Audience Excitement Index by Movie' />
          </style-rule>
        </style>
      </table>
    </worksheet>

    <!-- ═══════════════════════════════════════════════════════════════
         SHEET 2: Sentiment Distribution (Stacked Bar)
    ═══════════════════════════════════════════════════════════════════ -->
    <worksheet name='2. Sentiment Distribution'>
      <table>
        <view>
          <datasources>
            <datasource caption='Master Dataset' name='master_dataset' />
          </datasources>
          <datasource-dependencies datasource='master_dataset'>
            <column datatype='string' name='[movie]' role='dimension' type='nominal' />
            <column datatype='string' name='[sentiment_label]' role='dimension' type='nominal' />
            <column datatype='integer' name='[Number of Records]' role='measure' type='quantitative'>
              <calculation class='tableau' formula='1' />
            </column>
          </datasource-dependencies>
          <rows>[Number of Records]</rows>
          <cols>[movie]</cols>
          <style>
            <style-rule element='mark'>
              <encoding attr='color' field='[sentiment_label]' type='palette'>
                <map to='#2ECC71'><value>positive</value></map>
                <map to='#BDC3C7'><value>neutral</value></map>
                <map to='#E74C3C'><value>negative</value></map>
              </encoding>
            </style-rule>
          </style>
        </view>
      </table>
    </worksheet>

    <!-- ═══════════════════════════════════════════════════════════════
         SHEET 3: Sentiment Over Time (Line)
    ═══════════════════════════════════════════════════════════════════ -->
    <worksheet name='3. Sentiment Over Time'>
      <table>
        <view>
          <datasources>
            <datasource caption='Sentiment Over Time' name='sentiment_over_time' />
          </datasources>
          <datasource-dependencies datasource='sentiment_over_time'>
            <column datatype='date' name='[week_start]' role='dimension' type='ordinal' />
            <column datatype='string' name='[movie]' role='dimension' type='nominal' />
            <column datatype='real' name='[avg_sentiment]' role='measure' type='quantitative' />
          </datasource-dependencies>
          <rows>[avg_sentiment]</rows>
          <cols>[week_start]</cols>
          <style>
            <style-rule element='mark'>
              <encoding attr='color' field='[movie]' palette='Cultural Sentiment' type='palette' />
            </style-rule>
          </style>
        </view>
      </table>
    </worksheet>

    <!-- ═══════════════════════════════════════════════════════════════
         SHEET 4: Post Volume Over Time (Bar)
    ═══════════════════════════════════════════════════════════════════ -->
    <worksheet name='4. Volume Over Time'>
      <table>
        <view>
          <datasources>
            <datasource caption='Sentiment Over Time' name='sentiment_over_time' />
          </datasources>
          <datasource-dependencies datasource='sentiment_over_time'>
            <column datatype='date' name='[week_start]' role='dimension' type='ordinal' />
            <column datatype='string' name='[movie]' role='dimension' type='nominal' />
            <column datatype='integer' name='[post_volume]' role='measure' type='quantitative' />
          </datasource-dependencies>
          <rows>[post_volume]</rows>
          <cols>[week_start]</cols>
          <style>
            <style-rule element='mark'>
              <encoding attr='color' field='[movie]' palette='Cultural Sentiment' type='palette' />
            </style-rule>
          </style>
        </view>
      </table>
    </worksheet>

    <!-- ═══════════════════════════════════════════════════════════════
         SHEET 5: Audience Clusters (Bubble / Scatter)
    ═══════════════════════════════════════════════════════════════════ -->
    <worksheet name='5. Audience Segments'>
      <table>
        <view>
          <datasources>
            <datasource caption='Cluster Profiles' name='cluster_profiles' />
          </datasources>
          <datasource-dependencies datasource='cluster_profiles'>
            <column datatype='string' name='[movie]' role='dimension' type='nominal' />
            <column datatype='string' name='[cluster_label]' role='dimension' type='nominal' />
            <column datatype='real' name='[avg_sentiment]' role='measure' type='quantitative' />
            <column datatype='real' name='[avg_engagement]' role='measure' type='quantitative' />
            <column datatype='integer' name='[post_count]' role='measure' type='quantitative' />
            <column datatype='real' name='[audience_excitement_index]' role='measure' type='quantitative' />
          </datasource-dependencies>
          <rows>[avg_sentiment]</rows>
          <cols>[avg_engagement]</cols>
          <style>
            <style-rule element='mark'>
              <encoding attr='color' field='[movie]' palette='Cultural Sentiment' type='palette' />
              <encoding attr='size' field='[post_count]' type='quantitative' />
              <encoding attr='label' field='[cluster_label]' type='nominal' />
            </style-rule>
          </style>
        </view>
      </table>
    </worksheet>

    <!-- ═══════════════════════════════════════════════════════════════
         SHEET 6: Platform Sentiment (Horizontal Bar)
    ═══════════════════════════════════════════════════════════════════ -->
    <worksheet name='6. Platform Sentiment'>
      <table>
        <view>
          <datasources>
            <datasource caption='Master Dataset' name='master_dataset' />
          </datasources>
          <datasource-dependencies datasource='master_dataset'>
            <column datatype='string' name='[platform]' role='dimension' type='nominal' />
            <column datatype='string' name='[movie]' role='dimension' type='nominal' />
            <column datatype='real' name='[vader_compound]' role='measure' type='quantitative'>
              <calculation class='tableau' formula='AVG([vader_compound])' />
            </column>
          </datasource-dependencies>
          <rows>[platform]</rows>
          <cols>[vader_compound]</cols>
          <style>
            <style-rule element='mark'>
              <encoding attr='color' field='[movie]' palette='Cultural Sentiment' type='palette' />
            </style-rule>
          </style>
        </view>
      </table>
    </worksheet>

    <!-- ═══════════════════════════════════════════════════════════════
         SHEET 7: KPI Scorecard (Text Table)
    ═══════════════════════════════════════════════════════════════════ -->
    <worksheet name='7. KPI Scorecard'>
      <table>
        <view>
          <datasources>
            <datasource caption='KPI Summary' name='kpi_summary' />
          </datasources>
          <datasource-dependencies datasource='kpi_summary'>
            <column datatype='string' name='[movie]' role='dimension' type='nominal' />
            <column datatype='real' name='[avg_sentiment]' role='measure' type='quantitative' />
            <column datatype='real' name='[positive_mention_pct]' role='measure' type='quantitative' />
            <column datatype='real' name='[negative_mention_pct]' role='measure' type='quantitative' />
            <column datatype='real' name='[avg_engagement]' role='measure' type='quantitative' />
            <column datatype='real' name='[audience_excitement_index]' role='measure' type='quantitative' />
            <column datatype='integer' name='[total_posts]' role='measure' type='quantitative' />
          </datasource-dependencies>
          <rows>[avg_sentiment],[positive_mention_pct],[negative_mention_pct],[avg_engagement],[audience_excitement_index],[total_posts]</rows>
          <cols>[movie]</cols>
        </view>
      </table>
    </worksheet>

  </worksheets>

  <!-- ═══════════════════════════════════════════════════════════════════
       DASHBOARD: Cultural Sentiment Intelligence Executive View
  ═══════════════════════════════════════════════════════════════════════ -->
  <dashboards>
    <dashboard name='Cultural Sentiment Intelligence'>
      <style>
        <style-rule element='dashboard'>
          <encoding attr='title' value='Cultural Sentiment Intelligence — Audience Analysis Dashboard' />
          <encoding attr='background-color' value='{DARK}' />
        </style-rule>
      </style>

      <size maxheight='2000' maxwidth='1400' minheight='600' minwidth='800' />

      <zones>
        <zone h='100000' id='1' type='layout-flow' w='100000' x='0' y='0'>

          <!-- Title banner -->
          <zone h='4000' id='10' param='Cultural Sentiment Intelligence&#10;Movie Audience Analysis  |  Kenza En-Nassef'
            type='text' w='100000' x='0' y='0'>
            <style>
              <style-rule element='text-box'>
                <encoding attr='font-color' value='{LIGHT}' />
                <encoding attr='font-size' value='18' />
                <encoding attr='font-style' value='bold' />
                <encoding attr='background-color' value='{DARK}' />
                <encoding attr='horizontal-alignment' value='left' />
              </style-rule>
            </style>
          </zone>

          <!-- Row 1: KPI Scorecard full width -->
          <zone h='16000' id='2' name='7. KPI Scorecard' type='worksheet'
            w='100000' x='0' y='4000' />

          <!-- Row 2: Excitement Index + Sentiment Distribution -->
          <zone h='28000' id='3' name='1. Excitement Index' type='worksheet'
            w='40000' x='0' y='20000' />
          <zone h='28000' id='4' name='2. Sentiment Distribution' type='worksheet'
            w='60000' x='40000' y='20000' />

          <!-- Row 3: Sentiment Over Time (full width) -->
          <zone h='24000' id='5' name='3. Sentiment Over Time' type='worksheet'
            w='100000' x='0' y='48000' />

          <!-- Row 4: Volume + Platform Sentiment -->
          <zone h='24000' id='6' name='4. Volume Over Time' type='worksheet'
            w='55000' x='0' y='72000' />
          <zone h='24000' id='7' name='6. Platform Sentiment' type='worksheet'
            w='45000' x='55000' y='72000' />

          <!-- Row 5: Audience Segments (full width) -->
          <zone h='22000' id='8' name='5. Audience Segments' type='worksheet'
            w='100000' x='0' y='96000' />

          <!-- Footer -->
          <zone h='3000' id='11'
            param='Project: Cultural Sentiment Intelligence  |  Analyst: Kenza En-Nassef  |  Generated {datetime.now().strftime("%B %Y")}'
            type='text' w='100000' x='0' y='118000'>
            <style>
              <style-rule element='text-box'>
                <encoding attr='font-color' value='#808080' />
                <encoding attr='font-size' value='9' />
                <encoding attr='background-color' value='{DARK}' />
                <encoding attr='horizontal-alignment' value='center' />
              </style-rule>
            </style>
          </zone>

        </zone>
      </zones>

      <devicelayouts>
        <devicelayout auto-generated='true' name='Phone'>
          <size maxheight='700' minheight='700' sizing-mode='vscroll' />
          <zones>
            <zone h='100000' id='1' type='layout-flow' w='100000' x='0' y='0'>
              <zone h='4000' id='10' param='Cultural Sentiment Intelligence' type='text' w='100000' x='0' y='0' />
              <zone h='20000' id='2' name='7. KPI Scorecard' type='worksheet' w='100000' x='0' y='4000' />
              <zone h='28000' id='3' name='1. Excitement Index' type='worksheet' w='100000' x='0' y='24000' />
              <zone h='28000' id='5' name='3. Sentiment Over Time' type='worksheet' w='100000' x='0' y='52000' />
            </zone>
          </zones>
        </devicelayout>
      </devicelayouts>

      <layout-options>
        <title hidden='false' />
      </layout-options>

    </dashboard>
  </dashboards>

  <windows source-height='768' source-width='1366'>
    <window class='dashboard' maximized='true' name='Cultural Sentiment Intelligence' />
  </windows>

</workbook>
"""
    return twb


def package_twbx(twb_content: str, data_dir: Path, output_path: Path):
    """Bundle .twb + CSV data files into a .twbx package."""
    import tempfile, os

    with tempfile.TemporaryDirectory() as tmp:
        tmp_path = Path(tmp)

        # Write .twb
        twb_file = tmp_path / f"{WORKBOOK_NAME}.twb"
        twb_file.write_text(twb_content, encoding="utf-8")

        # Write data files inside Data/ folder (Tableau convention)
        data_out = tmp_path / "Data" / "Datasources"
        data_out.mkdir(parents=True)

        csv_files = [
            "kpi_summary.csv",
            "master_dataset.csv",
            "sentiment_over_time.csv",
            "cluster_profiles.csv",
            "platform_sentiment.csv",
        ]
        for fname in csv_files:
            src = data_dir / fname
            if src.exists():
                shutil.copy(src, data_out / fname)

        # Zip into .twbx
        with zipfile.ZipFile(output_path, "w", zipfile.ZIP_DEFLATED) as zf:
            zf.write(twb_file, f"{WORKBOOK_NAME}.twb")
            for f in data_out.iterdir():
                zf.write(f, f"Data/Datasources/{f.name}")

    print(f"  Tableau workbook: {output_path}")
    print(f"  Size: {output_path.stat().st_size / 1024:.1f} KB")


def main():
    print("Building Tableau workbook...")

    kpis = pd.read_csv(EXPORTS_DIR / "kpi_summary.csv", index_col="movie")
    master = pd.read_csv(EXPORTS_DIR / "master_dataset.csv")
    weekly = pd.read_csv(EXPORTS_DIR / "sentiment_over_time.csv")

    twb_content = build_twb(kpis, master, weekly)

    # Save standalone .twb for inspection
    twb_path = OUTPUT_DIR / f"{WORKBOOK_NAME}.twb"
    twb_path.write_text(twb_content, encoding="utf-8")
    print(f"  .twb saved: {twb_path}")

    # Package as .twbx
    twbx_path = OUTPUT_DIR / f"{WORKBOOK_NAME}.twbx"
    package_twbx(twb_content, EXPORTS_DIR, twbx_path)

    print(f"\n  Open {WORKBOOK_NAME}.twbx in Tableau Desktop.")
    print("  Dashboard: 'Cultural Sentiment Intelligence'")
    print("  Sheets: 7 pre-built worksheets")


if __name__ == "__main__":
    main()
