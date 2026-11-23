---
name: Clinical Clarity
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#3e4947'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#6e7977'
  outline-variant: '#bdc9c6'
  surface-tint: '#006a63'
  primary: '#005c55'
  on-primary: '#ffffff'
  primary-container: '#0f766e'
  on-primary-container: '#a3faef'
  inverse-primary: '#80d5cb'
  secondary: '#4e45d5'
  on-secondary: '#ffffff'
  secondary-container: '#6860ef'
  on-secondary-container: '#fffbff'
  tertiary: '#005683'
  on-tertiary: '#ffffff'
  tertiary-container: '#006fa8'
  on-tertiary-container: '#dbecff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#9cf2e8'
  primary-fixed-dim: '#80d5cb'
  on-primary-fixed: '#00201d'
  on-primary-fixed-variant: '#00504a'
  secondary-fixed: '#e3dfff'
  secondary-fixed-dim: '#c3c0ff'
  on-secondary-fixed: '#100069'
  on-secondary-fixed-variant: '#372abf'
  tertiary-fixed: '#cce5ff'
  tertiary-fixed-dim: '#93ccff'
  on-tertiary-fixed: '#001d31'
  on-tertiary-fixed-variant: '#004b73'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
  title-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.025em
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
  space-xl: 2.5rem
---

## Brand & Style

This design system establishes a clinical, reassuring, and modern aesthetic tailored for AI-assisted healthcare. It balances professional medical credibility with compassionate digital hospitality. The visual identity addresses the cognitive anxiety of healthcare decisions by deploying immaculate whitespace, structured informational density, and high-contrast legibility.

### Design Principles
- **Reassuring Authority:** Evoke the rigor of advanced medicine without the cold sterility of traditional clinical tools. Every state transition, badge, and card radiates deliberate control and empathy.
- **Cognitive Serenity:** Avoid sensory overload. Critical diagnostic data, AI observations, and triage alerts must be instantly scannable using precise spatial grouping and distinct chromatic signaling.
- **Uncompromising Inclusivity:** Optimized for universal access—from elderly patients on high-glare handhelds to clinicians managing complex multi-patient dashboards under pressure.
- **Modern Clinical Elegance:** A blend of modern corporate reliability and human-centric wellness styling, pairing soft geometry with structured semantic typography.

## Colors

The palette leverages a deep clinical blue-teal as its principal anchor, evoking sterile precision, calm, and scientific trust. An intellectual indigo supports systemic intelligence and AI-driven insights, while a crisp neutral scale provides contrast and separation.

### Core Swatches
- **Primary (`#0F766E`):** Medical Blue-Teal. Reserved for key calls-to-action, primary verification states, active patient navigational cues, and core system accents.
- **Secondary (`#4338CA`):** Clinical Indigo. Denotes AI inference, automated triage analysis, machine-assisted insights, and diagnostic intelligence features.
- **Tertiary (`#0284C7`):** Precision Cerulean. Secondary highlights, telemetry indicators, timeline waypoints, and informational tooltips.
- **Neutral Surface & Base:**
  - `canvas-background`: `#F8FAFC` (Slate 50) — Crisp, glare-free underlying canvas.
  - `surface-card`: `#FFFFFF` — Pure white foreground containers to optimize contrast.
  - `surface-subtle`: `#F1F5F9` (Slate 100) — Inactive card backings, secondary input fills, and table headers.
  - `border-neutral`: `#E2E8F0` (Slate 200) — Structural dividers, outlines, and structural grids.
  - `text-primary`: `#0F172A` (Slate 900) — Primary clinical data, headings, and high-priority copy.
  - `text-secondary`: `#475569` (Slate 600) — Supporting labels, metadata, and timestamps.
  - `text-muted`: `#94A3B8` (Slate 400) — Placeholders, disabled actions, and de-emphasized units.

### Semantic Triage Statuses
- **Verified / Stable (`#059669` / `#ECFDF5`):** Emerald green for verified records, normal telemetry, stable lab values, and matched appointments.
- **Warning / Review Required (`#D97706` / `#FFFBEB`):** Warm amber for non-critical lab anomalies, overdue check-ups, and pending clinical reviews.
- **Emergency / Critical Alert (`#E11D48` / `#FFF1F2`):** Pure clinical rose-red for immediate attention, contraindicated medications, and high-urgency notifications.
- **Inconclusive / Neutral (`#64748B` / `#F8FAFC`):** Slate for unassigned records, gathering data, and neutral telemetry.

## Typography

Typography is set exclusively in **Plus Jakarta Sans**, providing an optimal intersection of geometric clarity, contemporary warmth, and wide open counters that preserve legibility under strained viewing conditions.

### Hierarchy Guidelines
- **Headlines (`headline-xl` through `headline-sm`):** Reserved for portal landing hero messages, diagnostic dashboard titles, and clinical consultation headers. Tightened negative tracking reinforces structural confidence.
- **Titles (`title-md`, `title-sm`):** Dedicated to component headings, card titles, patient profile sections, and modal headers.
- **Body (`body-lg` through `body-sm`):** Engineered for patient charts, AI consultation summaries, and medical history. Generous line heights guarantee comfortable reading of dense clinical data.
- **Labels (`label-lg` through `label-sm`):** Set at medium-to-semibold weights with slight positive tracking for badges, triage pills, table column headers, and form input labels.

## Layout & Spacing

The layout model utilizes a responsive 12-column fluid grid system anchored by strict horizontal and vertical baseline multiples of 4px and 8px.

### Form Factors & Adaptation
- **Desktop (1200px+):** 12 columns, 24px (`1.5rem`) gutters, and dynamic margins with an inner max-width of 1360px. Facilitates multi-column charting, split clinical records, and persistent AI consultation sidebars.
- **Tablet (768px - 1199px):** 8 columns, 20px gutters, and 32px (`2rem`) margins. Sidebars collapse to responsive overlay drawers; patient telemetry transforms into two-column modular blocks.
- **Mobile (320px - 767px):** 4 columns, 16px (`1rem`) gutters, and 16px (`1rem`) margins. All multi-panel clinical views stack into vertical, step-oriented card sequences with bottom-anchored action bars.

### Spatial Rhythm
- **Micro Spacing (`space-xs`, `space-sm`):** Used strictly for inline badge padding, icon-to-label offsets, and compact input groupings.
- **Component Core Spacing (`space-md`, `space-lg`):** Standard internal container padding for diagnosis cards, clinical summaries, and form row offsets.
- **Macro Spacing (`space-xl`):** Canvas partition distances, separating diagnostic category tiers and section transitions.

## Elevation & Depth

Visual hierarchy avoids heavy, dark drop shadows that cause visual fatigue. Instead, the design system utilizes low-contrast neutral outlines coupled with luminous, ambient teal-tinted elevation tiers.

### Elevation Levels
- **Level 0 (Flat / Canvas):** Applied to the base canvas (`#F8FAFC`). No shadow, zero elevation.
- **Level 1 (Clinical Card Default):** Pure white container (`#FFFFFF`) framed with a 1px border (`#E2E8F0`) and an ambient, whisper-soft shadow: `0 1px 3px rgba(15, 23, 42, 0.04), 0 4px 12px rgba(15, 118, 110, 0.03)`.
- **Level 2 (Interactive Hover / Priority Focus):** Slightly lifted state for selectable health records and interactive calendar nodes: `0 4px 6px -1px rgba(15, 23, 42, 0.06), 0 10px 20px -2px rgba(15, 118, 110, 0.06)`. Border sharpens to `#CBD5E1`.
- **Level 3 (Overlays, Modals, & Triage Drawers):** Floating clinical dialogs and AI prescription reviews: `0 12px 28px -4px rgba(15, 23, 42, 0.12), 0 8px 16px -4px rgba(15, 118, 110, 0.08)`. Accompanied by a 30% slate backdrop blur (`backdrop-blur-sm`).
- **AI Focus Glow:** Highlighting active automated diagnostic suggestions: a subtle 1px border colored `#4338CA` paired with an ambient halo: `0 0 0 3px rgba(67, 56, 202, 0.15)`.

## Shapes

The shape system adopts a roundedness tier of **2** (`0.5rem` / 8px baseline radius), with specialized large corner treatments (`12px` to `16px`) for cards and modular panels. This geometry softens clinical rigidity while retaining institutional precision.

### Application Specs
- **Cards, Modals, & Containers:** Set strictly to `rounded-lg` (1rem / 16px) or `12px` on compact screens to maintain a friendly, human-centric posture.
- **Buttons, Inputs, & Form Controls:** Set to `rounded` (0.5rem / 8px) for clean alignment and clear click targets.
- **Triage Status Pills & Categorical Badges:** Rendered as full pills (`rounded-full` / 9999px) to clearly differentiate statuses from actionable interactive buttons.
- **Nested Controls:** Maintain concentric alignment; elements nested within 16px cards use an 8px radius to preserve visual harmony.

## Components

### Buttons
- **Primary:** Solid `#0F766E` background, white label, 8px radius, height 44px (touch-compliant). Hover: `#115E59`. Active: `#134E4A`. Focus ring: 3px `#0F766E` at 20% opacity.
- **Secondary (AI Action):** Solid `#4338CA` background, white label. Used exclusively for running AI health analyses, generating symptom summaries, or validating clinical suggestions. Hover: `#3730A3`.
- **Outline / Ghost:** 1px `#E2E8F0` border, `#0F172A` label, transparent background. Hover: `#F1F5F9`.

### Badges & Triage Status Pills
- Compact, pill-shaped tags (`rounded-full`) utilizing `label-md` with 4px vertical and 10px horizontal padding.
- **Emerald (Verified):** `#ECFDF5` background, `#059669` text, 1px `#A7F3D0` border.
- **Amber (Warning/Review):** `#FFFBEB` background, `#D97706` text, 1px `#FDE68A` border.
- **Rose (Emergency Alert):** `#FFF1F2` background, `#E11D48` text, 1px `#FECDD3` border.
- **Slate (Neutral/Inconclusive):** `#F8FAFC` background, `#64748B` text, 1px `#E2E8F0` border.

### Input Fields & Select Controls
- Built with a minimum height of 44px. Background `#FFFFFF`, border 1px solid `#CBD5E1`, border-radius 8px, padding 10px 14px.
- Placeholder text in `#94A3B8`. Focus state introduces a crisp `#0F766E` border with a 3px soft teal glow (`rgba(15, 118, 110, 0.15)`).
- Error state: 1.5px `#E11D48` border with accompanying inline rose-red message and warning icon.

### Cards & Data Panels
- Surface: `#FFFFFF`. Border: 1px `#E2E8F0`. Corner radius: 14px to 16px. Internal padding: `space-lg` (24px).
- Internal dividers: 1px `#F1F5F9`. Card headers use `title-md` paired with contextual triage badges placed in the trailing slot.

### Checkboxes & Radio Controls
- 20x20px touch target minimum with an 8px hit-box extension. Border 1.5px `#CBD5E1`.
- Checked state: Fill `#0F766E` with sharp white iconography. Radios feature concentric white circles.

### Clinical Telemetry & AI Insight Box (Product Specific)
- **AI Insight Container:** Light indigo tint background (`#EEF2FF`), 1px solid `#C7D2FE`, 12px corner radius. Prefixed with an AI indicator icon in `#4338CA`, delivering natural language summaries directly above raw clinical metrics.
- **Vital Metric Unit:** Stacked micro-layout featuring `label-sm` for metric name (e.g., "Heart Rate"), `headline-md` for numerical values, and an inline status indicator.