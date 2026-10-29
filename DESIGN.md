---
version: alpha
name: Mr Braai Guy Quotation Studio
description: A private open-fire dining studio with a firelit workspace and editorial proposals.
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

# Mr Braai Guy quotation studio design system

## Overview

A chef's quiet studio after the coals have settled: dark smoked surfaces, gold accents, and an ivory proposal laid on the workbench. Jay's primary job is composing a bespoke experience with trustworthy prices, using a laptop or phone in South Africa. Product register on every route; English interface, en-ZA money and Africa/Johannesburg business dates. Sources: docs/source-reconciliation.md and the master build brief. The owner supplied a current website screenshot on 2026-10-28. The app palette now follows its near-black, white, warm-gold and crimson identity while retaining the separate ivory customer proposal. The earlier palette was an unverified interpretation of the brief.

The signature is the contrast between the private smoked-glass workbench and the light editorial customer document. A giant hero, decorative charts and revenue guesses would hinder the job; the dashboard instead opens with upcoming work and a New quote action. Fonts are licensed OFL packages, self-hosted.

Token ownership: this seed documents accepted values; src/app/globals.css is the single runtime owner. Shared controls consume CSS semantic variables; no screen-local palette. Typography maps to --font-body / --font-display, colors to --background / --surface / --primary / --accent / --foreground / --muted / --danger / --success. Verify values and computed styles with the browser and design lint; update docs and CSS together.

## Colors

Near-black owns the canvas, nearly black charcoal the panels, warm gold carries navigation accents and focus, and crimson is reserved for primary actions. Soft white carries text. The supplied website screenshot shows this near-black, white, gold and red palette. Customer PDFs retain an ivory page, charcoal type and fine gold rules for print readability. Muted text stays readable over glass. Success and danger include explicit text/icons. The PDF owns an ivory/charcoal print surface and fine warm rules; it does not inherit the dashboard background. Forced-colors defers to system colors.

## Typography

Cormorant Garamond brings hospitality character to page titles and proposal headings; DM Sans handles fields, navigation and numerical work. Body 14–16px with 1.55 line height; title 32–44px. Tabular numerals for currency; no uppercase paragraphs. Genuine official logo is the inspected 3508×2244 raster asset; no invented vector claim.

The navigation uses the Mr Braai Guy logo alone. It appears bright white and prominent on the dark rail, without a secondary product name beside it.

## Layout

Horizontal glass navigation across the top, with the white logo, capsule tabs and workspace lock. Below 1100px tabs occupy their own row; on phones they scroll horizontally with visible labels. The main canvas keeps natural document scrolling. Desktop composer has a central authoring column and a sticky preview where width permits. Tables scroll horizontally without clipping actions. Twenty records per server page; no unbounded lists. Controls at least 40px, gaps 12–24px. Avoid fixed heights on shared form ancestors.

The October 29 revision uses the supplied video as inspiration, not proprietary template source. Soft white reflective edges and charcoal translucency retain the existing gold/crimson palette. Page entry is a restrained 320ms fade and 7px rise; reduced motion disables it. The implementation is custom CSS with no added animation dependency.

## Elevation & Depth

A fixed firelit charcoal canvas gives glass surfaces something real to reveal. Shared dashboard cards, quote sections and the navigation rail use restrained translucency, warm highlight edges and 20–24px backdrop blur. Controls stay dark enough for legible text; the preview remains opaque ivory because it represents the customer PDF. Reduced-transparency and blur-unsupported environments receive solid dark surfaces. Dialog elevation stays reserved for decisions; there are no animated particles or neon glows.

## Shapes

12px controls, 20px panels, modest 6px inner geometry. Rounding should feel like worked hardware, not bubbles. Status badges may be pill shaped.

## Components

The supplied liquid-glass button CSS is the source of the shared reflective rim (`--glass-rim` in globals.css), inset highlights, pill buttons, circular arrow and hover/press motion. Responsive control sizes and light text adapt the light-background example to this dark workspace. Decorative layers ignore pointer events; no global contrast filter or high z-index interferes with menus or dialogs. Panels and top navigation share the rim; customer PDF styling remains editorial. Reduced-motion and reduced-transparency preferences retain usable controls.

Shared Button/Field/Select/Textarea/Feedback/Dialog primitives own all screens. Native select and date/time popups are intentionally platform-owned. Primary actions use clear verb labels, muted controls have hover/focus/active feedback, disabled controls cannot run. Busy states retain width; status uses one live region plus persistent errors.

Lucide icons use consistent 18–20px strokes with labels for primary navigation. Motion is 160ms for hover/state only and disabled under reduced motion. Scrollbars are global, visible, tokenized with standards and WebKit fallbacks, and use system colors under forced colors.

## Do's and Don'ts

- Do keep private costs visibly separate from the proposal and apply suggestions explicitly.
- Do make pasted menu prose the largest writing surface.
- Do preserve issued PDFs and label every total as a quotation, never collected revenue.
- Don't use fictional metrics, stock logos, unrelated photography or generic SaaS gradients.
- Don't signal successful saving, sending or payment without a verified event.

## Contrast refinement

Cards and the top bar use subtle warm-ivory borders at 15% opacity and smoked charcoal fills, without the button rim. Buttons retain liquid reflections at reduced opacity, with warm parchment arrow discs instead of brilliant white. Keep text and keyboard focus legible; soften decorative contrast rather than reducing content contrast.
