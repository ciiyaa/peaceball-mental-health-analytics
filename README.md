# peaceball mental health analytics

so basically this is a study about girls' wellbeing and how the community feels about a football program in Zakho. we collected survey data, cleaned it up, and now we're analyzing it to see if football actually helps with mental health and community connection.

## what's in here

```
0_domain_research/    → background research, lit review, that kind of stuff
1_data_collection/    → survey forms, raw data, cleaned data
2_analysis/           → validation scripts, cleaning scripts, analysis notebooks
3_communication/      → reports, presentations, anything we share
retrospectives/       → reflections on what worked and what didn't
```

## the data

we have two main datasets:
- **girls survey** (n=102) - measuring wellbeing, social connection, confidence
- **community survey** (n=168) - measuring community sentiment and support

all data is anonymized and stored in `1_data_collection/data/`

## how to run things

if you want to validate the data:
```bash
cd 2_analysis
python scripts/01_validate_data_simple.py
```

to clean the data:
```bash
python scripts/02_clean_data_simple.py
```

cleaned datasets end up in `1_data_collection/data/cleaned/`

## current status

just finished milestone 4 (data cleaning). validation and cleaning scripts are done, data quality report is ready. next up: actual analysis and visualizations.

## notes

- using python with standard library (no fancy dependencies for now)
- all validation passed, no data issues found
- WHO-5 wellbeing scores calculated and verified
- ready for descriptive stats and plotting

that's it. more details coming as we analyze.
