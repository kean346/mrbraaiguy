---
version: alpha
name: Ember Glass
description: A private open-fire dining studio with a smoked-glass workspace and editorial proposals.
colors:
  background: '#171714'
  surface: '#302B27'
  primary: '#A56A42'
  accent: '#D8B98B'
  foreground: '#F1ECE2'
  muted: '#B9B2A7'
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

A chef's quiet studio after the coals have settled: dark smoked surfaces, copper hardware, and an ivory proposal laid on the workbench. Jay's primary job is composing a bespoke experience with trustworthy prices, using a laptop or phone in South Africa. Product register on every route; English interface, en-ZA money and Africa/Johannesburg business dates. Sources: docs/source-reconciliation.md and the master build brief. The missing screenshot and blocked website mean this follows the explicit palette and supplied official logo, not an inspected screenshot.

The signature is the contrast between the private smoked-glass workbench and the light editorial customer document. A giant hero, decorative charts and revenue guesses would hinder the job; the dashboard instead opens with upcoming work and a New quote action. Fonts are licensed OFL packages, self-hosted.

Token ownership: this seed documents accepted values; src/app/globals.css is the single runtime owner. Shared controls consume CSS semantic variables; no screen-local palette. Typography maps to --font-body / --font-display, colors to --background / --surface / --primary / --accent / --foreground / --muted / --danger / --success. Verify values and computed styles with the browser and design lint; update docs and CSS together.

## Colors

Charcoal owns the canvas, smoky brown the glass layers, bone the main text. Copper is a restrained border or dark-backed accent; bronze carries high-contrast action text and focus. Muted text stays readable over glass. Success and danger include explicit text/icons. The PDF owns an ivory/charcoal print surface and fine copper rules; never inherit the dark dashboard. Forced-colors defers to system colors.

## Typography

Cormorant Garamond brings hospitality character to page titles and proposal headings; DM Sans handles fields, navigation and numerical work. Body 14–16px with 1.55 line height; title 32–44px. Tabular numerals for currency; no uppercase paragraphs. Genuine official logo is the inspected 3508×2244 raster asset; no invented vector claim.

## Layout

Floating left rail on desktop; main canvas with generous natural document scrolling. Desktop composer has a central authoring column and a sticky preview where width permits. Below 1100px preview becomes a deliberate tab and fields stack; phone navigation remains labelled and usable. Tables scroll horizontally without clipping actions. Twenty records per server page; no unbounded lists. Controls at least 40px, gaps 12–24px. Avoid fixed heights on shared form ancestors.

## Elevation & Depth

Fine translucent borders and one restrained glass surface establish hierarchy. Keep blur subtle and behind text. Dialog elevation is reserved for decisions; no excessive glow, animated particles or nested card forest.

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
