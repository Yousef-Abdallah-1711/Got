# Data Model: HTML to Sage WordPress Conversion

**Historical reference only** — preserved as-is from the original auto-generated scaffold. The real, authoritative data model for this project is `docs/architecture/data-model.md`, cross-checked per-feature in each of `specs/004,005,008,010,012,014,018/data-model.md`. This file is kept for audit trail, not as an active instruction, per the 2026-10-09 refactor.

---

## Page
- title
- slug
- ordered ACF block list

## ACF Block
- name
- field group key
- source selector
- frontend template path
- SCSS path
- optional JS path
- fields
- visual parity notes

## Field
- name
- label
- type
- original value
- source selector
- required
- editor note

## Global Template Part
- element
- template path
- editable data source
- options fields
- menu location
- SCSS path
- JS path

## Media Seed Item
- original stock path
- media type
- WordPress attachment target
- used by
- ACF/options/CPT field
- default value strategy
- alt/title source
- required
- notes

## CPT Decision
- candidate
- decision
- justification
- future trigger
