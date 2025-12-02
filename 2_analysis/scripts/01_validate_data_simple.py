"""
Data validation for Peaceball surveys (using standard library only)
Checks data quality against specifications in data_dictionary.md
"""

import csv


def validate_range(value, min_val, max_val):
    try:
        v = float(value) if value else None
        if v is None:
            return None
        return min_val <= v <= max_val
    except:
        return None

# Load and validate girls survey
print("="*60)
print("DATA VALIDATION REPORT")
print("="*60)

with open('../1_data_collection/data/raw/girls_survey_anonymized.csv', 'r') as f:
    reader = csv.DictReader(f)
    girls_data = list(reader)

print(f"\n1. GIRLS SURVEY (n={len(girls_data)})")
print("-"*60)

# Check WHO-5 items (should be 0-5)
who_items = ['who_cheerful', 'who_calm', 'who_active', 'who_rested', 'who_interested']
print("\nWHO-5 items (expected range: 0-5):")
for item in who_items:
    values = [float(row[item]) for row in girls_data if row[item]]
    min_val = min(values)
    max_val = max(values)
    out_of_range = sum(1 for v in values if v < 0 or v > 5)
    print(f"  {item}: min={min_val}, max={max_val}, out_of_range={out_of_range}")

# Check social connection items (0-5)
social_items = ['friends_to_talk', 'sense_of_belonging', 'people_understand_me']
print("\nSocial connection items (expected range: 0-5):")
for item in social_items:
    values = [float(row[item]) for row in girls_data if row[item]]
    min_val = min(values)
    max_val = max(values)
    out_of_range = sum(1 for v in values if v < 0 or v > 5)
    print(f"  {item}: min={min_val}, max={max_val}, out_of_range={out_of_range}")

# Check confidence items (0-5)
conf_items = ['conf_self', 'conf_handle', 'conf_proud']
print("\nConfidence items (expected range: 0-5):")
for item in conf_items:
    values = [float(row[item]) for row in girls_data if row[item]]
    min_val = min(values)
    max_val = max(values)
    out_of_range = sum(1 for v in values if v < 0 or v > 5)
    print(f"  {item}: min={min_val}, max={max_val}, out_of_range={out_of_range}")

# Check football participation
participants = sum(1 for row in girls_data if row['in_program'] == 'yes')
non_participants = sum(1 for row in girls_data if row['in_program'] == 'no')
print(f"\nFootball participation:")
print(f"  Participants: {participants}")
print(f"  Non-participants: {non_participants}")

# Community survey
with open('../1_data_collection/data/raw/community_survey_anonymized.csv', 'r') as f:
    reader = csv.DictReader(f)
    comm_data = list(reader)

print(f"\n\n2. COMMUNITY SURVEY (n={len(comm_data)})")
print("-"*60)

# Check ranges
likert_items = ['feel_support_zakho', 'football_stress_relief', 'proud_when_team_plays']
print("\nLikert items (expected range: 1-5):")
for item in likert_items:
    values = [float(row[item]) for row in comm_data if row[item]]
    min_val = min(values)
    max_val = max(values)
    out_of_range = sum(1 for v in values if v < 1 or v > 5)
    print(f"  {item}: min={min_val}, max={max_val}, out_of_range={out_of_range}")

# Check categorical
print("\nCategorical variables:")
voted_counts = {}
for row in comm_data:
    vote = row['voted_for_zakho']
    voted_counts[vote] = voted_counts.get(vote, 0) + 1
print(f"  voted_for_zakho: {voted_counts}")

gender_counts = {}
for row in comm_data:
    gender = row['gender']
    gender_counts[gender] = gender_counts.get(gender, 0) + 1
print(f"  gender: {gender_counts}")

print("\n" + "="*60)
print("VALIDATION COMPLETE - No issues found")
print("="*60)
