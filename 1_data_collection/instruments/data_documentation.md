# Data Documentation

Peaceball Project - Collection, Cleaning & Preparation Notes

This document explains how data from both surveys (girls' wellbeing survey and the community survey) was gathered, cleaned, anonymized, and prepared for analysis. Both forms were developed, deployed, and managed through KoboToolbox.

---

## 1. Field Conditions & Data Collection

### Tools Used

All data was collected using **KoBoToolbox**, chosen because it is stable in low-connectivity environments and supports multilingual forms (EN/AR/KR).

- Girls' survey: one enumerator per participant  
- Community survey: self-fill or assisted

### Girls Survey

Data was collected inside displacement camps and nearby places in Zakho. Enumerators worked in pairs and used a quiet corner to give each girl space and privacy. The questions were read aloud when needed, especially for younger girls or participants with limited literacy. Participation was voluntary, and assent/consent was completed before starting.

### Community Survey

The community survey was distributed in public areas: voting tents, cafés, and outside the stadium on match days. It was intentionally light-touch, no personal identifiers collected, no signatures required. Most responses were collected verbally.

---

## 2. Data Cleaning Procedures

### Initial Review

After export from KoBoToolbox:

- All submissions were checked for completeness  
- Duplicates (accidental double submissions) were removed  
- Time stamps were inspected to catch accidental empty forms  

### Variable Cleaning

- Likert-scale values converted to numeric scores (0–5)
- “Not applicable” answers added for girls who did *not* participate in football  

### Logic Checks

- If a girl answered **“No”** to sports participation, all football-related items were set to N/A  
- Out-of-range values (rare KoBo glitches) were corrected or removed  

---

## 3. Anonymization Steps

- No names, phone numbers, household data, or identifying details were collected.  
- Age is stored as a **category**, not an exact number.  
- Stored in a secured research folder (not shared publicly)

---

## 4. File Preparation for Analysis

### Final Outputs

Two datasets were created:

1. **girls_wellbeing_clean.csv**
   - Includes wellbeing scores, social support indicators, and football access data  
   - Ready for descriptive statistics and thematic cross-tabs  

2. **community_football_identity_clean.csv**  
   - Captures pride, stress-relief values, and awareness of the Zakho nomination  
   - Ready for rapid perception analysis  

### Codebook Reference

All variable names, labels, and categories are defined in the **data_dictionary.md** file in this same folder.

---

## 5. Storage & Access

- Raw data and cleaned data are stored separately to protect integrity.  
- Access is restricted to the project researcher and supervisor team.  
- No dataset will be shared publicly until all identifying risks are fully assessed.
