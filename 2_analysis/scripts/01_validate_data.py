"""
Data validation for Peaceball surveys
Checks data quality against specifications in data_dictionary.md
"""

import pandas as pd
import numpy as np

# Load raw data
girls = pd.read_csv('../../1_data_collection/data/raw/girls_survey_anonymized.csv')
community = pd.read_csv('../../1_data_collection/data/raw/community_survey_anonymized.csv')

print("="*60)
print("DATA VALIDATION REPORT")
print("="*60)

# Girls Survey Validation
print("\n1. GIRLS SURVEY (n={})".format(len(girls)))
print("-"*60)

# Check WHO-5 items (should be 0-5)
who_items = ['who_cheerful', 'who_calm', 'who_active', 'who_rested', 'who_interested']
print("\nWHO-5 items (expected range: 0-5):")
for item in who_items:
    min_val = girls[item].min()
    max_val = girls[item].max()
    out_of_range = ((girls[item] < 0) | (girls[item] > 5)).sum()
    print(f"  {item}: min={min_val}, max={max_val}, out_of_range={out_of_range}")

# Check social connection items (0-5)
social_items = ['friends_to_talk', 'sense_of_belonging', 'people_understand_me']
print("\nSocial connection items (expected range: 0-5):")
for item in social_items:
    min_val = girls[item].min()
    max_val = girls[item].max()
    out_of_range = ((girls[item] < 0) | (girls[item] > 5)).sum()
    print(f"  {item}: min={min_val}, max={max_val}, out_of_range={out_of_range}")

# Check confidence items (0-5)
conf_items = ['conf_self', 'conf_handle', 'conf_proud']
print("\nConfidence items (expected range: 0-5):")
for item in conf_items:
    min_val = girls[item].min()
    max_val = girls[item].max()
    out_of_range = ((girls[item] < 0) | (girls[item] > 5)).sum()
    print(f"  {item}: min={min_val}, max={max_val}, out_of_range={out_of_range}")

# Check missing data
print("\nMissing data:")
missing = girls.isnull().sum()
if missing.sum() == 0:
    print("  No missing values found")
else:
    print(missing[missing > 0])

# Check football participation logic
print("\nFootball participation logic:")
participants = girls[girls['in_program'] == 'yes']
non_participants = girls[girls['in_program'] == 'no']
print(f"  Participants: {len(participants)}")
print(f"  Non-participants: {len(non_participants)}")

# Community Survey Validation
print("\n\n2. COMMUNITY SURVEY (n={})".format(len(community)))
print("-"*60)

# Check ranges
print("\nLikert items (expected range: 1-5):")
likert_items = ['feel_support_zakho', 'football_stress_relief', 'proud_when_team_plays']
for item in likert_items:
    min_val = community[item].min()
    max_val = community[item].max()
    out_of_range = ((community[item] < 1) | (community[item] > 5)).sum()
    print(f"  {item}: min={min_val}, max={max_val}, out_of_range={out_of_range}")

# Check categorical variables
print("\nCategorical variables:")
print(f"  voted_for_zakho: {community['voted_for_zakho'].value_counts().to_dict()}")
print(f"  gender: {community['gender'].value_counts().to_dict()}")

# Check missing data
print("\nMissing data:")
missing_comm = community.isnull().sum()
if missing_comm.sum() == 0:
    print("  No missing values found")
else:
    print(missing_comm[missing_comm > 0])

print("\n" + "="*60)
print("VALIDATION COMPLETE")
print("="*60)
