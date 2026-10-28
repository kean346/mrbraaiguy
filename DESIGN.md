---
version: alpha
name: Ember Glass
description: A private open-fire dining studio with a smoked-glass workspace and editorial proposals.
colors:
  background: '#100F0E'
  surface: '#1A1917'
  primary: '#C62838'
  accent: '#D7A33B'
  foreground: '#F7F5F0'
  muted: '#AAA7A1'
  danger: '#F0A59B'
  success: '#A9C5A1'
typography:
  display:
    fontFamily: 'Cormorant Garamond, Georgia, serif'
  sans:
    fontFamily: 'DM Sans, system-ui, sans-serif'
rounded:
  DEFAULT: '0.75rem'
  sm: '0.4rem'
  lg: '1.25rem'
spacing:
  section-gap: '1.5rem'
  page-max: '100rem'
components:
  button: {}
  field: {}
  panel: {}
  dialog: {}
---

# Ember Glass design system

## Overview

A chef's quiet studio after the coals have settled: dark smoked surfaces, gold accents, and an ivory proposal laid on the workbench. Jay's primary job is composing a bespoke experience with trustworthy prices, using a laptop or phone in South Africa. Product register on every route; English interface, en-ZA money and Africa/Johannesburg business dates. Sources: docs/source-reconciliation.md and the master build brief. The owner supplied a current website screenshot on 2026-10-28. The app palette now follows its near-black, white, warm-gold and crimson identity while retaining the separate ivory customer proposal. The earlier palette was an unverified interpretation of the brief.

The signature is the contrast between the private smoked-glass workbench and the light editorial customer document. A giant hero, decorative charts and revenue guesses would hinder the job; the dashboard instead opens with upcoming work and a New quote action. Fonts are licensed OFL packages, self-hosted.

Token ownership: this seed documents accepted values; src/app/globals.css is the single runtime owner. Shared controls consume CSS semantic variables; no screen-local palette. Typography maps to --font-body / --font-display, colors to --background / --surface / --primary / --accent / --foreground / --muted / --danger / --success. Verify values and computed styles with the browser and design lint; update docs and CSS together.

## Colors

Near-black owns the canvas, nearly black charcoal the panels, warm gold carries navigation accents and focus, and crimson is reserved for primary actions. Soft white carries text. The supplied website screenshot shows this near-black, white, gold and red palette. Customer PDFs retain an ivory page, charcoal type and fine gold rules for print readability. Muted text stays readable over glass. Success and danger include explicit text/icons. The PDF owns an ivory/charcoal print surface and fine warm rules; it does not inherit the dashboard background. Forced-colors defers to system colors.

## Typography

Cormorant Garamond brings hospitality character to page titles and proposal headings; DM Sans handles fields, navigation and numerical work. Body 14–16px with 1.55 line height; title 32–44px. Tabular numerals for currency; no uppercase paragraphs. Genuine official logo is the inspected 3508×2244 raster asset; no invented vector claim.

## Layout

Floating left rail on desktop; main canvas with generous natural document scrolling. Desktop composer has a central authoring column and a sticky preview where width permits. Below 1100px preview becomes a deliberate tab and fields stack; phone navigation remains labelled and usable. Tables scroll horizontally without clipping actions. Twenty records per server page; no unbounded lists. Controls at least 40px, gaps 12–24px. Avoid fixed heights on shared form ancestors.

## Elevation & Depth

A fixed firelit charcoal canvas gives glass surfaces something real to reveal. Shared dashboard cards, quote sections and the navigation rail use restrained translucency, warm highlight edges and 20–24px backdrop blur. Controls stay dark enough for legible text; the preview remains opaque ivory because it represents the customer PDF. Reduced-transparency and blur-unsupported environments receive solid dark surfaces. Dialog elevation stays reserved for decisions; there are no animated particles or neon glows.

## Shapes

12px controls, 20px panels, modest 6px inner geometry. Rounding should feel like worked hardware, not bubbles. Status badges may be pill shaped.

## Components

Shared Button/Field/Select/Textarea/Feedback/Dialog primitives own all screens. Native select and date/time popups are intentionally platform-owned. Primary actions use clear verb labels, muted controls have hover/focus/active feedback, disabled controls cannot run. Busy states retain width; status uses one live region plus persistent errors.

Lucide icons use consistent 18–20px strokes with labels for primary navigation. Motion is 160ms for hover/state only and disabled under reduced motion. Scrollbars are global, visible, tokenized with standards and WebKit fallbacks, and use system colors under forced colors.

## Do's and Don'ts

- Do keep private costs visibly separate from the proposal and apply suggestions explicitly.
- Do make pasted menu prose the largest writing surface.
- Do preserve issued PDFs and label every total as a quotation, never collected revenue.
- Don't use fictional metrics, stock logos, unrelated photography or generic SaaS gradients.
- Don't signal successful saving, sending or payment without a verified event.
