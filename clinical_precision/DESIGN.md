---
name: Clinical Precision
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#424754'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#727785'
  outline-variant: '#c2c6d6'
  surface-tint: '#005ac2'
  primary: '#0058be'
  on-primary: '#ffffff'
  primary-container: '#2170e4'
  on-primary-container: '#fefcff'
  inverse-primary: '#adc6ff'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
  tertiary: '#4f5d6e'
  on-tertiary: '#ffffff'
  tertiary-container: '#677687'
  on-tertiary-container: '#fdfcff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc6ff'
  on-primary-fixed: '#001a42'
  on-primary-fixed-variant: '#004395'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#d5e4f8'
  tertiary-fixed-dim: '#b9c8db'
  on-tertiary-fixed: '#0e1d2b'
  on-tertiary-fixed-variant: '#3a4858'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 3rem
    fontWeight: '700'
    lineHeight: 3.5rem
    letterSpacing: -0.025em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 2rem
    fontWeight: '700'
    lineHeight: 2.5rem
    letterSpacing: -0.02em
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 2rem
    fontWeight: '700'
    lineHeight: 2.5rem
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.5rem
    fontWeight: '600'
    lineHeight: 2rem
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.5rem
    fontWeight: '600'
    lineHeight: 2rem
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.25rem
    fontWeight: '600'
    lineHeight: 1.75rem
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.125rem
    fontWeight: '600'
    lineHeight: 1.5rem
    letterSpacing: -0.005em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: 1.5rem
    letterSpacing: '0'
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: 1.25rem
    letterSpacing: '0'
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.75rem
    fontWeight: '400'
    lineHeight: 1rem
    letterSpacing: 0.01em
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.875rem
    fontWeight: '600'
    lineHeight: 1.25rem
    letterSpacing: 0.01em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.75rem
    fontWeight: '600'
    lineHeight: 1rem
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.6875rem
    fontWeight: '700'
    lineHeight: 0.875rem
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

The design system projects clinical competence, modern efficiency, and steady calm. Tailored for clinical operators, physicians, diagnostic teams, and patients, the interface balances high-density clinical information with an uncluttered, reassuring atmosphere. 

The aesthetic is **Corporate Modern meets Clinical Utility**:
- **Clarity over ornament:** Unembellished layouts prioritize scanning speed, triage readiness, and unambiguous data interpretation.
- **Controlled visual weight:** Dense panels, lab charts, and patient timelines remain structured via crisp mechanical borders rather than heavy decorative fills.
- **Trustworthy precision:** Structural integrity relies on authoritative deep navies, luminous slate backgrounds, and a high-focus electric blue interactive tone. Purple, teal, and decorative gradients are strictly excluded to preserve an uncompromised medical context.

## Colors

The palette establishes an unambiguous hierarchy between structural containers, interactive controls, and life-critical feedback states.

### Core Canvas & Surfaces
- **Canvas (`#F8FAFC`):** Primary viewport backdrop providing a low-strain, soft slate foundation.
- **Sub-Surface (`#F1F5F9`):** Secondary framing, table headers, sticky utility bars, and nested sidebars.
- **Card Surface (`#FFFFFF`):** High-clarity focal point for records, clinical charts, form panels, and diagnostic modules.
- **Structural Border (`#E2E8F0`):** Precise 1px boundary dividing all content areas and containers.

### Typography & Readability
- **Primary Text (`#0F172A`):** Core headings, active clinical data values, and high-priority indicators (contrast ratio 15.8:1 against white).
- **Secondary Text (`#475569`):** Supporting metadata, form labels, and table cells (contrast ratio 8.3:1).
- **Muted Text (`#64748B`):** Timestamps, helper descriptions, and disabled labels (contrast ratio 4.6:1, strictly WCAG AA compliant).

### Brand & Interactive Tones
- **Electric Blue (`#3B82F6`):** Primary interactive CTA, progress trackers, and selected indicators.
- **Electric Blue Hover (`#2563EB`):** Focused and pressed interaction states.
- **Navy Anchor (`#0F172A`) & Secondary Navy (`#1E293B`):** Persistent sidebars, critical modal headers, and commanding structural navigation.
- **Subtle Blue Highlight (`#DBEAFE`):** Row selections, active pill fills, and soft context tagging.

### Semantic Triage States
- **Success (`#15803D`):** Lab results verified, appointments confirmed, stable vitals.
- **Warning (`#B45309`):** Pending approvals, borderline metrics, interaction warnings.
- **Error / Critical (`#B91C1C`):** Contraindications, critical patient vitals, emergency status alerts.

## Typography

The typography system relies exclusively on **Plus Jakarta Sans**, chosen for its modern geometric foundation balanced with humanist apertures that preserve legibility in dense numerical layouts.

### Usage Standards
- **Numerical legibility:** Numerical values (heart rates, dosages, timeline metrics) must use tabular lining figures (`font-variant-numeric: tabular-nums`) to prevent shifting across dynamic vitals monitors.
- **Headings (`display-lg` down to `headline-sm`):** Rendered in weights `600` and `700` using tight negative tracking to maintain crisp, professional impact.
- **Body (`body-lg`, `body-md`, `body-sm`):** Set at weight `400` with open line heights to maximize scanning comfort during prolonged electronic medical record (EMR) charting.
- **Labels (`label-lg`, `label-md`, `label-sm`):** Rendered in `600` or `700` weight with uppercase styling reserved only for `label-sm` status badges, micro tags, and unit annotations.

## Layout & Spacing

The layout employs a responsive 12-column grid system built on an 8pt base grid unit, transitioning seamlessly across clinical workstations, tablets, and mobile bedside devices:

- **Desktop (1280px+):** 12-column fluid grid, 2rem canvas margin, 1.5rem column gutters. Standard fixed-width left rail (260px) for primary navigation and dynamic side-drawers for patient summaries.
- **Tablet / Cow Cart (768px - 1279px):** 8-column layout, 1.5rem canvas margin, 1rem gutters. Left rail collapses into an icon bar (72px).
- **Mobile (below 768px):** 4-column layout, 1rem canvas margin, 0.75rem gutters. Navigation migrates to an elevated bottom bar or header drawer.

### Spacing Usage
- `space-xs` (4px): Micro offsets, badge-to-label spacing, icon-label pairing.
- `space-sm` (8px): Form input inner paddings, list item gaps, adjacent tags.
- `space-md` (16px): Standard component internal padding, stack intervals within records.
- `space-lg` (24px): Card interior padding, section module separations.
- `space-xl` (32px): Deep container partitions, primary EMR section grouping.

## Elevation & Depth

Visual hierarchy is constructed via a union of **crisp structural borders (`#E2E8F0`)** and **calibrated micro-shadows**, ensuring interface layers are immediately identifiable without relying on visual theatrics.

### Elevation Hierarchy
1. **Level 0 (Flat Canvas):** `#F8FAFC` base screen background. Zero shadow.
2. **Level 1 (Card & Section Surfaces):** `#FFFFFF` surfaces nested within `#F8FAFC`. Bound by a 1px solid `#E2E8F0` stroke and a resting shadow: `0 1px 3px 0 rgba(15, 23, 42, 0.04), 0 1px 2px -1px rgba(15, 23, 42, 0.04)`.
3. **Level 2 (Interactive Hover & Flyouts):** Diagnostic card hover states, dropdown menus, and popovers. Bound by `#E2E8F0` with shadow: `0 4px 6px -1px rgba(15, 23, 42, 0.07), 0 2px 4px -2px rgba(15, 23, 42, 0.05)`.
4. **Level 3 (Modals, Triage Sheets & Overlays):** Patient prescription modals, critical drug interaction warnings. Bound by `#E2E8F0` with shadow: `0 20px 25px -5px rgba(15, 23, 42, 0.10), 0 8px 10px -6px rgba(15, 23, 42, 0.06)`, framed against a backdrop scrim of `#0F172A` at 40% opacity.

## Shapes

The design system applies a balanced curvature profile that softens high-stress medical environments while maintaining structural rigor.

### Shape Token Mapping
- **Primary Cards & Containers (`rounded-xl`):** `1.5rem` (24px) border radius on clinical cards, overview panels, prescription containers, and modal sheets.
- **Secondary Modals & Tables (`rounded-lg`):** `1rem` (16px) on data tables, embedded sub-panels, charts, and media wrappers.
- **Controls & Form Elements (`rounded`):** `0.5rem` (8px) applied to input fields, buttons, dropdown selects, and alerts.
- **Badges, Status Pills & Avatars:** Fully rounded pill (`9999px`) to create distinction between actionable controls and passive metadata tokens.

## Components

### Buttons
- **Primary CTA:** Background `#3B82F6`, text `#FFFFFF`, border `transparent`, radius `0.5rem`. Hover state transitions to `#2563EB`. Active state `#1D4ED8`. Focus outline: 2px offset with `#3B82F6`.
- **Secondary:** Background `#FFFFFF`, text `#0F172A`, border `1px solid #E2E8F0`, radius `0.5rem`. Hover state: background `#F1F5F9`.
- **Destructive / Emergency:** Background `#B91C1C`, text `#FFFFFF`. Hover: `#991B1B`.

### Cards (Clinical Modules)
- White background (`#FFFFFF`), radius `1.5rem` (`rounded-xl`), border `1px solid #E2E8F0`. Padding set to `1.5rem` (`space-lg`). Interactive clinical cards shift to shadow Level 2 and border `#CBD5E1` on cursor hover.

### Input Fields & Selects
- Height 40px (`2.5rem`), background `#FFFFFF`, border `1px solid #E2E8F0`, radius `0.5rem`, text `#0F172A`, placeholder `#64748B`. 
- Focus state: border `#3B82F6` accompanied by an ambient ring shadow of `0 0 0 3px rgba(59, 130, 246, 0.15)`.
- Error state: border `#B91C1C` with ring `0 0 0 3px rgba(185, 28, 28, 0.15)`.

### Status Badges & Chips
- Fully rounded pills (`9999px`), padding `0.25rem 0.75rem`, typography `label-sm`.
- **Verified / Stable:** Background `#DCFCE7`, text `#15803D`, border `1px solid #BBF7D0`.
- **Attention / Caution:** Background `#FEF3C7`, text `#B45309`, border `1px solid #FDE68A`.
- **Emergency / Alert:** Background `#FEE2E2`, text `#B91C1C`, border `1px solid #FECACA`.
- **Informational / Category:** Background `#DBEAFE`, text `#1E40AF`, border `1px solid #BFDBFE`.

### Checkboxes & Radio Buttons
- 18px by 18px container, radius `4px` for checkboxes and `9999px` for radio buttons. Unchecked state: border `1.5px solid #CBD5E1`, background `#FFFFFF`. Checked state: background `#3B82F6`, border `#3B82F6`, displaying a crisp white indicator glyph.

### Clinical Data Lists & Tables
- Table headers use `#F1F5F9` background, `label-md` typography, text `#475569`, uppercase, with a 1px solid `#E2E8F0` bottom boundary.
- Rows use `#FFFFFF` with hover state shifting to `#F8FAFC`. Selected rows highlight with `#DBEAFE` at 40% opacity and an active 3px border-left in `#3B82F6`. Row divider lines are 1px solid `#E2E8F0`.

### Diagnostic Metric Banner (Domain Specific)
- Specialized container featuring vital signs, lab references, and alert indicators. Surface `#FFFFFF`, border `1px solid #E2E8F0`, radius `1rem`, internal metric values rendered in `tabular-nums` `headline-md` `#0F172A`, tagged with micro unit labels (`label-sm` `#64748B`).