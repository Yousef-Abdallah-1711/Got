---
name: html-to-wordpress-intake
description: Intake workflow for HTML-to-Sage WordPress conversions, asking only blocking choices before automatic prepare, recording defaults for pixel-perfect visual parity, ACF editability, CPT restrictions, stock-folder preservation, forms, multilingual needs, CSS/JS dependencies, and implementation gate decisions.
---

# Intake

Read `../../references/enterprise-html-to-acf-rules.md` and `../../references/full-acf-editability-rules.md` before recording assumptions.

Ask only the blocking questions in `../../templates/intake-questions.md` before `workflow.py prepare`. Use these defaults unless the user overrides them:

- pixel-perfect conversion: yes
- visual improvements allowed: no
- all editable content in ACF: yes
- CPTs only when justified: yes
- original files preserved in `stock/`: yes

Write answers to `.html-to-sage/INTAKE.md`. If the user skips details, mark them as assumptions and send them into `/speckit.clarify`.

If the WordPress install path is unknown, continue planning without `--wp-path`, write the blocker to `.html-to-sage/BLOCKERS.md`, and stop before implementation.
