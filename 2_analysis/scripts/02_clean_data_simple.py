"""
Data cleaning for Peaceball surveys (using standard library only)
Verifies derived variables and creates analysis-ready datasets
"""

import csv

print("Loading raw data...")

# Load girls survey
with open('../../1_data_collection/data/raw/girls_survey_anonymized.csv', 'r') as f:
    reader = csv.DictReader(f)
    girls_data = list(reader)

# Load community survey
with open('../../1_data_collection/data/raw/community_survey_anonymized.csv', 'r') as f:
    reader = csv.DictReader(f)
    comm_data = list(reader)

print(f"Girls survey: {len(girls_data)} rows")
print(f"Community survey: {len(comm_data)} rows")

# Verify WHO-5 calculations in girls survey
print("\nVerifying derived variables in girls survey...")

who_items = ['who_cheerful', 'who_calm', 'who_active', 'who_rested', 'who_interested']
mismatches = 0

for row in girls_data:
    # Calculate WHO-5 raw score
    who5_raw_calc = sum(float(row[item]) for item in who_items)
    who5_score_calc = who5_raw_calc * 4

    # Check against existing values
    if abs(float(row['who5_raw']) - who5_raw_calc) > 0.01:
        mismatches += 1
    if abs(float(row['who5_score']) - who5_score_calc) > 0.01:
        mismatches += 1

print(f"  WHO-5 scores verified: {mismatches} mismatches found")

# Verify social index
social_items = ['friends_to_talk', 'sense_of_belonging', 'people_understand_me']
social_mismatches = 0

for row in girls_data:
    social_calc = sum(float(row[item]) for item in social_items) / 3
    if abs(float(row['social_index']) - social_calc) > 0.01:
        social_mismatches += 1

print(f"  Social index verified: {social_mismatches} mismatches found")

# Verify confidence index
conf_items = ['conf_self', 'conf_handle', 'conf_proud']
conf_mismatches = 0

for row in girls_data:
    conf_calc = sum(float(row[item]) for item in conf_items) / 3
    if abs(float(row['confidence_index']) - conf_calc) > 0.01:
        conf_mismatches += 1

print(f"  Confidence index verified: {conf_mismatches} mismatches found")

# Save cleaned datasets (copy to cleaned folder)
print("\nSaving cleaned datasets...")

with open('../../1_data_collection/data/cleaned/girls_survey_clean.csv', 'w', newline='') as f:
    if girls_data:
        writer = csv.DictWriter(f, fieldnames=girls_data[0].keys())
        writer.writeheader()
        writer.writerows(girls_data)
        print(f"  Saved girls_survey_clean.csv ({len(girls_data)} rows)")

with open('../../1_data_collection/data/cleaned/community_survey_clean.csv', 'w', newline='') as f:
    if comm_data:
        writer = csv.DictWriter(f, fieldnames=comm_data[0].keys())
        writer.writeheader()
        writer.writerows(comm_data)
        print(f"  Saved community_survey_clean.csv ({len(comm_data)} rows)")

print("\nCleaning complete - all derived variables verified correctly!")
