# Data Quality Report

**Project**: Peaceball Mental Health Analytics
**Date**: 2025-12-01
**Milestone**: 4 - Data Preparation & Cleaning

## Summary

Validated and cleaned two datasets from KoboToolbox collection:
- Girls survey: 102 participants
- Community survey: 168 participants

## Validation Results

### Girls Survey (n=102)

**WHO-5 Wellbeing Items** (expected range: 0-5)
- who_cheerful: range 2-5, ✓ no issues
- who_calm: range 2-5, ✓ no issues
- who_active: range 1-5, ✓ no issues
- who_rested: range 1-5, ✓ no issues
- who_interested: range 2-5, ✓ no issues

**Social Connection Items** (expected range: 0-5)
- friends_to_talk: range 2-5, ✓ no issues
- sense_of_belonging: range 1-5, ✓ no issues
- people_understand_me: range 2-5, ✓ no issues

**Confidence Items** (expected range: 0-5)
- conf_self: range 2-5, ✓ no issues
- conf_handle: range 2-5, ✓ no issues
- conf_proud: range 2-5, ✓ no issues

**Football Participation**
- Participants: 79 (77%)
- Non-participants: 23 (23%)

**Derived Variables**
- WHO-5 raw scores: ✓ verified correct
- WHO-5 scaled scores (0-100): ✓ verified correct
- Social index: ✓ verified correct
- Confidence index: ✓ verified correct

### Community Survey (n=168)

**Likert Items** (expected range: 1-5)
- feel_support_zakho: range 2-5, ✓ no issues
- football_stress_relief: range 2-5, ✓ no issues
- proud_when_team_plays: range 3-5, ✓ no issues

**Categorical Variables**
- voted_for_zakho: 157 yes, 7 no, 4 don't know
- gender: 100 male, 68 female

## Issues Found

None. Data from KoboToolbox was well-structured and complete.

## Cleaned Datasets Created

- `1_data_collection/data/cleaned/girls_survey_clean.csv`
- `1_data_collection/data/cleaned/community_survey_clean.csv`

Both datasets ready for analysis.

## Scripts Created

- `2_analysis/scripts/01_validate_data_simple.py` - validates all data ranges
- `2_analysis/scripts/02_clean_data_simple.py` - verifies derived variables and creates clean datasets
