# How to Reproduce the Analysis

## What you need

- Python 3.8 or newer
- 4GB RAM
- About 500MB disk space

## Setup

### Install Python packages

```bash
cd 2_analysis
pip install -r requirements.txt
```

If you want a clean environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

## Data files

The analysis uses two cleaned datasets:
- `1_data_collection/data/cleaned/girls_survey_clean.csv` (102 rows)
- `1_data_collection/data/cleaned/community_survey_clean.csv` (168 rows)

Both files should already be in the repository.

## Running the analysis

### Using Jupyter

```bash
cd 2_analysis/notebooks
jupyter notebook
```

Run the notebooks in this order:

1. `01_exploratory_analysis.ipynb` - Basic data exploration
2. `02_girls_wellbeing_analysis.ipynb` - Study 1 main analysis
3. `03_community_sentiment_analysis.ipynb` - Study 2 main analysis
4. `04_visualizations.ipynb` - Creates all figures
5. `05_power_and_sensitivity.ipynb` - Power and sensitivity analyses

Should take about 15-20 minutes total.

### From command line

```bash
cd 2_analysis/notebooks
jupyter nbconvert --to notebook --execute 01_exploratory_analysis.ipynb
jupyter nbconvert --to notebook --execute 02_girls_wellbeing_analysis.ipynb
jupyter nbconvert --to notebook --execute 03_community_sentiment_analysis.ipynb
jupyter nbconvert --to notebook --execute 04_visualizations.ipynb
jupyter nbconvert --to notebook --execute 05_power_and_sensitivity.ipynb
```

## What gets generated

### Figures (saved to `2_analysis/figures/`)

- `figure1_sample_characteristics.png`
- `figure2_group_comparisons.png`
- `figure3_effect_sizes.png`
- `figure4_correlation_heatmap.png`
- `figure5_community_sentiment.png`
- `figure6_demographic_comparisons.png`

All figures are 300 dpi PNG files.

### Results

Main results are in `RESULTS.md`. Statistical details are in `STATISTICAL_APPENDIX.md`.

## Key analytical choices

### Statistics

- Used t-tests when data looked normal (Shapiro-Wilk p > 0.05)
- Used Mann-Whitney U when data wasn't normal
- Bonferroni correction for multiple comparisons on WHO-5 items
- Cohen's d for effect sizes with 95% CIs
- Kept outliers in main analysis (sensitivity tests show results don't change)

### Random seeds

Set to 42 wherever randomization happens:
- Logistic regression: `random_state=42`
- Power simulations: `np.random.seed(42)`

### Missing data

Just dropped missing values. Very few missing (<2% on most variables).

## What's in each notebook

**01_exploratory_analysis.ipynb**
- Load and check data
- Descriptive stats
- Initial plots

**02_girls_wellbeing_analysis.ipynb**
- Compare participants vs non-participants
- WHO-5, social support, confidence
- Subgroup analyses by age, displacement duration, school
- Correlations

**03_community_sentiment_analysis.ipynb**
- Community sentiment scores
- Gender and residence status comparisons
- Voting behavior analysis
- Logistic regression model

**04_visualizations.ipynb**
- All 6 publication figures
- Uses colorblind-friendly palette
- High-res exports

**05_power_and_sensitivity.ipynb**
- Power analysis for main tests
- Outlier sensitivity
- Parametric vs non-parametric comparison
- Multiple comparison corrections

## Troubleshooting

**Can't find packages**: Make sure you ran `pip install -r requirements.txt`

**Jupyter won't start**: Try `python -m jupyter notebook`

**Path errors**: Run notebooks from `2_analysis/notebooks/` directory

**Figures don't save**: Check `2_analysis/figures/` exists, create it if needed

## Package versions

Tested with:
- Python 3.8
- pandas 2.0.3
- numpy 1.24.3
- scipy 1.10.1
- matplotlib 3.7.1
- seaborn 0.12.2

Newer versions should work fine, but if you need exact replication use these versions.

## File structure

```
2_analysis/
├── notebooks/
│   ├── 01_exploratory_analysis.ipynb
│   ├── 02_girls_wellbeing_analysis.ipynb
│   ├── 03_community_sentiment_analysis.ipynb
│   ├── 04_visualizations.ipynb
│   └── 05_power_and_sensitivity.ipynb
├── figures/
├── tables/
├── requirements.txt
├── ANALYSIS_README.md
├── STATISTICAL_APPENDIX.md
└── RESULTS.md
```
