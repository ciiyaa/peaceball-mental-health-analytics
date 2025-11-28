# Data Dictionary

Definitive mapping of variables for the Girls' Wellbeing survey and the Zakho FIFA nomination (community) survey.

## General notes

- All personally identifying information was removed before any dataset was created.
- Recommended missing-value codes:
  - Use `NA` for non-responses or legitimate skips.
- All categorical variables are stored as strings (text) in CSVs unless noted otherwise.
- `id` is an anonymous integer per row and has no relation to any raw consent form or names list.

---

## A. Girls' Wellbeing Survey (primary dataset)

**Suggested file name:** `girls_survey_anonymized.csv`

### Identifiers & context

| Variable | Type | Allowed values / example | Notes |
|---|---:|---|---|
| `id` | integer | 1,2,3,... | Anonymous row id |
| `age_group` | categorical | `"10-12"`, `"13-15"`, `"16-18"`, `"19-22"` | From SECTION 1 |
| `displacement_duration` | categorical | `"less_6m"`, `"6_12m"`, `"1_2y"`, `"2_3y"`, `"gt_3y"` | Encodes "How long have you been displaced?" |
| `school` | categorical | `"yes"`, `"no"` | "Do you currently go to school?" |
| `in_program` | categorical | `"yes"`, `"no"` | "Are you currently in a football/sports program?" |

---

### SECTION 2: WHO-5 Wellbeing Index (each item 0-5)

| Variable | Type | Range / Coding | Notes |
|---|---:|---:|---|
| `who_cheerful` | integer | 0 – 5 | "I have felt cheerful and in good spirits" |
| `who_calm` | integer | 0 – 5 | "I have felt calm and relaxed" |
| `who_active` | integer | 0 – 5 | "I have felt active and vigorous (full of energy)" |
| `who_rested` | integer | 0 – 5 | "I woke up feeling fresh and rested" |
| `who_interested` | integer | 0 – 5 | "My daily life has been filled with things that interest me" |

**Derived WHO-5 variables**

| Variable | Type | Calculation | Notes |
|---|---:|---|---|
| `who5_raw` | integer | `who_cheerful + who_calm + who_active + who_rested + who_interested` | Range: 0–25 |
| `who5_score` | numeric (0–100) | `(who5_raw / 25) * 100` OR `(who5_raw) * 4` | Standard WHO-5 scaled score; document which formula used in analysis scripts. Higher = better wellbeing.|

---

### SECTION 3: Social Connections (0–5)

| Variable | Type | Range | Notes |
|---|---:|---:|---|
| `friends_to_talk` | integer | 0 – 5 | "I have friends I can talk to when I'm sad or worried" |
| `sense_of_belonging` | integer | 0 – 5 | "I feel like I belong to a group or community" |
| `people_understand_me` | integer | 0 – 5 | "There are people who really understand me" |

**Derived social connection index**

| Variable | Type | Calculation | Notes |
|---|---:|---|---|
| `social_index` | numeric (0–5) | average of (`friends_to_talk`, `sense_of_belonging`, `people_understand_me`) | Use `NA` for averages if two or more items missing; otherwise average available items. Document imputation rule.|

---

### SECTION 4: Confidence (0–5)

| Variable | Type | Range | Notes |
|---|---:|---:|---|
| `conf_self` | integer | 0 – 5 | "I feel confident in my abilities" |
| `conf_handle` | integer | 0 – 5 | "I believe I can handle challenges that come my way" |
| `conf_proud` | integer | 0 – 5 | "I feel proud of myself" |

**Derived confidence index**

| Variable | Type | Calculation | Notes |
|---|---:|---|---|
| `confidence_index` | numeric (0–5) | average of (`conf_self`, `conf_handle`, `conf_proud`) | Same missing rules as `social_index`.|

---

### SECTION 5: Football perception (only if `in_program == "yes"`)

| Variable | Type | Range / Values | Notes |
|---|---:|---:|---|
| `fb_happy` | integer | 0 – 5 | "Football makes me feel happy" |
| `fb_forget_worries` | integer | 0 – 5 | "Football helps me forget my worries" |
| `fb_feel_stronger` | integer | 0 – 5 | "I feel stronger (physically or emotionally) since I started playing" |
| `fb_recommend` | categorical | `"definitely"`, `"probably"`, `"maybe"`, `"probably_not"`, `"definitely_not"` | Recommendation response |

**Notes:**

- For respondents with `in_program == "no"`, these fields should be `NA`.
- Ensure skip logic is applied in forms to avoid accidental answers from non-participants.

---

## B. Zakho FIFA Nomination / Community Sentiment Survey

**Suggested file name:** `community_survey_anonymized.csv`

### Identifiers & context

| Variable | Type | Allowed values | Notes |
|---|---:|---|---|
| `id` | integer | 1,2,3,... | Anonymous response id |
| `voted_for_zakho` | categorical | `"yes"`, `"no"`, `"dont_know"` | "Did you vote for the Zakho fan in FIFA Best Fan Award?" |
| `feel_support_zakho` | integer | 1 – 5 | Emotional response to supporting Zakho (higher = stronger positive feeling) |
| `football_stress_relief` | integer | 1 – 5 | "Does football help you handle stress?" (1 = Not at all, 5 = Very much) |
| `proud_when_team_plays` | integer | 1 – 5 | Pride level when team plays (1 = Not proud, 5 = Extremely proud) |
| `age_group_comm` | categorical | `"under_18"`, `"18_25"`, `"26_35"`, `"36_45"`, `"46_55"`, `"56_plus"` | Age bracket |
| `gender` | categorical | `"male"`, `"female"`, `"other"` | Self-identified gender |
| `residence_status` | categorical | `"originally_zakho"`, `"displaced_in_zakho"`, `"other_kurdistan"` | Respondent origin / status |

**Notes:**

- If respondents answered "I didn't know about it", set `voted_for_zakho = "dont_know"` and other fields optional/NA as appropriate.

---

## D. Data quality & processing notes

- **Validation:** Ensure every WHO item value is integer 0–5, out-of-range values must be flagged.  
- **Skip logic:** If `in_program` == `"no"` or missing, set all football perception fields to `NA`.  
- **Storage:** Raw identified files (consents) are stored offline and never checked into the repo. Only anonymized CSVs are placed under `1_data_collection/data/`.  
- **Aggregation for publication:** Only aggregated summaries (means, proportions) will be published. No cell in tables should have <5 individuals in public outputs.

---
