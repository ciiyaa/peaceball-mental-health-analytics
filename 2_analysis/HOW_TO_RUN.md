# How to Run the Analysis Scripts

## Quick Start (No Setup Required!)

Want to skip the setup? Use the "_simple" versions:

```bash
cd 2_analysis/scripts
python 01_validate_data_simple.py
python 02_clean_data_simple.py
```

These use only Python's built-in libraries. No packages, no drama.

---

## Full Setup (For pandas/numpy lovers)

### One-time setup

```bash
# From project root
python -m venv venv
source venv/bin/activate          # Linux/Mac
# OR
venv\Scripts\activate             # Windows

pip install -r 2_analysis/requirements.txt
```

**Virtual environment = your project's own package bubble.** Think of it like a separate desk drawer for each project's tools. Create once, activate whenever you work.

### Every time you work

```bash
source venv/bin/activate          # You'll see (venv) appear in terminal
cd 2_analysis/scripts
python 01_validate_data.py
python 02_clean_data.py
```

---

## What Each Script Does

**01_validate_data.py** → Checks data quality, finds issues
**02_clean_data.py** → Calculates scores, creates cleaned datasets

Both save results to `1_data_collection/data/cleaned/`

---

## Troubleshooting

**"No module named pandas"** → Activate your venv first!
**"File not found"** → Run from `2_analysis/scripts/` directory
**"pip not found"** → Try `pip3`
