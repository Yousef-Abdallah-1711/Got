---
name: html-to-wordpress-cpt-taxonomy-modeler
description: Decide whether WordPress custom post types and taxonomies are justified for an HTML-to-Sage conversion, avoiding unnecessary CPTs and preferring ACF repeaters for small section-local repeated content.
---

# CPT and Taxonomy Modeler

Read `../../references/enterprise-html-to-acf-rules.md` before proposing CPTs or taxonomies.

CPTs are only allowed when content is:

- repeatable
- reusable
- filterable
- archiveable
- needs a single URL
- needs an independent admin workflow

Prefer ACF repeaters for one-page card lists, small FAQ groups, one-off testimonials, logos, icon grids, and section-local content.

Write `.html-to-sage/CPT-TAXONOMY-MAP.md` using `../../templates/cpt-taxonomy-map.md`.

Include query performance notes for every accepted CPT.
