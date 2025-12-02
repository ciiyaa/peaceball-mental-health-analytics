"""
Data cleaning for Peaceball surveys
Calculates derived variables and creates analysis-ready datasets
"""

import pandas as pd
import numpy as np

print("Loading raw data...")
girls = pd.read_csv('../../1_data_collection/data/raw/girls_survey_anonymized.csv')
community = pd.read_csv('../../1_data_collection/data/raw/community_survey_anonymized.csv')

print(f"Girls survey: {len(girls)} rows")
print(f"Community survey: {len(community)} rows")

# Girls Survey - already has derived variables, just verify calculations
print("\nVerifying derived variables in girls survey...")

# Verify WHO-5 calculations
who_items = ['who_cheerful', 'who_calm', 'who_active', 'who_rested', 'who_interested']
calculated_who5_raw = girls[who_items].sum(axis=1)
calculated_who5_score = calculated_who5_raw * 4

# Check if existing values match
if 'who5_raw' in girls.columns:
    matches = (girls['who5_raw'] == calculated_who5_raw).all()
    print(f"  WHO-5 raw scores verified: {matches}")
else:
    girls['who5_raw'] = calculated_who5_raw
    print("  WHO-5 raw scores calculated")

if 'who5_score' in girls.columns:
    matches = (girls['who5_score'] == calculated_who5_score).all()
    print(f"  WHO-5 scaled scores verified: {matches}")
else:
    girls['who5_score'] = calculated_who5_score
    print("  WHO-5 scaled scores calculated")

# Verify social index
social_items = ['friends_to_talk', 'sense_of_belonging', 'people_understand_me']
calculated_social = girls[social_items].mean(axis=1)

if 'social_index' in girls.columns:
    matches = np.allclose(girls['social_index'], calculated_social, rtol=1e-05)
    print(f"  Social index verified: {matches}")
else:
    girls['social_index'] = calculated_social
    print("  Social index calculated")

# Verify confidence index
conf_items = ['conf_self', 'conf_handle', 'conf_proud']
calculated_conf = girls[conf_items].mean(axis=1)

if 'confidence_index' in girls.columns:
    matches = np.allclose(girls['confidence_index'], calculated_conf, rtol=1e-05)
    print(f"  Confidence index verified: {matches}")
else:
    girls['confidence_index'] = calculated_conf
    print("  Confidence index calculated")

# Save cleaned datasets
print("\nSaving cleaned datasets...")
girls.to_csv('../../1_data_collection/data/cleaned/girls_survey_clean.csv', index=False)
print(f"  Saved girls_survey_clean.csv ({len(girls)} rows)")

community.to_csv('../../1_data_collection/data/cleaned/community_survey_clean.csv', index=False)
print(f"  Saved community_survey_clean.csv ({len(community)} rows)")

print("\nCleaning complete!")
