---
name: Mochimo
description: The first post-quantum cryptocurrency on mainnet, signed with WOTS+ since June 25, 2018.
colors:
  mint-signal: "#15DC96"
  mint-deep: "#10B078"
  brand-band: "#15C288"
  slate-ground: "#172124"
  slate-raised: "#1D2A2E"
  slate-hover: "#22333A"
  hairline-frame: "#24343A"
  hairline: "#2B3B40"
  hairline-strong: "#3A4C52"
  ink: "#F5F7F7"
  ink-dim: "#B4BFC2"
  ink-faint: "#8A989C"
  dial-graphite: "#5E7379"
typography:
  display:
    fontFamily: "Montserrat, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(2.4rem, 4.6vw, 3.4rem)"
    fontWeight: 700
    lineHeight: 1.06
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Montserrat, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(2rem, 3.4vw, 2.75rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  manifesto:
    fontFamily: "Montserrat, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(1.6rem, 3.6vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Montserrat, system-ui, -apple-system, sans-serif"
    fontSize: "1.35rem"
    fontWeight: 600
    lineHeight: 1.3
  lede:
    fontFamily: "Poppins, system-ui, -apple-system, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 300
    lineHeight: 1.65
  body:
    fontFamily: "Poppins, system-ui, -apple-system, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.68
    letterSpacing: "0.002em"
  button:
    fontFamily: "Montserrat, system-ui, -apple-system, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.01em"
  data:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.06em"
  label:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontSize: "0.625rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.14em"
  label-wide:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontSize: "0.6875rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.16em"
  small:
    fontFamily: "Poppins, system-ui, -apple-system, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.6
  haiku:
    fontFamily: "Redressed, cursive"
    fontSize: "1.75rem"
    fontWeight: 400
    lineHeight: 1.45
rounded:
  control: "10px"
  row: "14px"
  surface: "20px"
  pill: "999px"
spacing:
  hairline: "1px"
  tight: "12px"
  gap: "20px"
  tile-pad: "28px"
  section-mobile: "56px"
  section: "96px"
  container: "1200px"
components:
  button-primary:
    backgroundColor: "{colors.mint-signal}"
    textColor: "{colors.slate-ground}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "10px 22px"
  button-primary-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.slate-ground}"
  button-outline:
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "10px 22px"
  button-outline-hover:
    textColor: "{colors.mint-signal}"
  button-on-mint:
    backgroundColor: "{colors.slate-ground}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "14px 30px"
  tile:
    backgroundColor: "{colors.slate-raised}"
    textColor: "{colors.ink}"
    rounded: "{rounded.surface}"
    padding: "{spacing.tile-pad}"
  link-row:
    backgroundColor: "{colors.slate-raised}"
    textColor: "{colors.ink}"
    rounded: "{rounded.row}"
    padding: "12px 18px"
    height: "64px"
  link-row-hover:
    backgroundColor: "{colors.slate-hover}"
  status-pill-safe:
    backgroundColor: "{colors.mint-signal}"
    textColor: "{colors.slate-ground}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "4px 10px"
  status-pill-exposed:
    textColor: "{colors.ink-dim}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "4px 10px"
  mint-band:
    backgroundColor: "{colors.brand-band}"
    textColor: "{colors.slate-ground}"
    typography: "{typography.manifesto}"
---

# Design System: Mochimo

## Overview

**Creative North Star: "Since Block Zero"**

Mochimo has been signing every transaction with post-quantum signatures since its genesis block on June 25, 2018. The design system treats that record as its ornament. Nothing on the page is decorative unless it is proof: the mark drawing itself line by line, a dial whose readouts are real protocol facts, a table that names which signatures break, dates written out in full. The world is a dark slate ground with one mint signal, cut with hairlines and set in confident Montserrat. It is bold, sovereign and uncompromising: it states the claim plainly, shows the mechanism, and does not raise its voice with gradients, glow or hype.

The brand source is the 2025 brandbook (mint #15DC96 on slate, Montserrat and Poppins, line-art mark, repeat pattern) and the reference mockup in /Resources. From the brandbook the system keeps the slate ground, the rare mint, the outline mark, the pattern and the oversized cropped mark. It rejects the brandbook's stock coin photography, neon light effects and campaign taglines. From the mockup it keeps the instrument dial, the signature comparison table, the bento entry points, the single mint band and the hairline surfaces; it rejects numbered eyebrows, section numbers and kicker labels.

Surfaces are machined and exact: flat fills, 1px borders, tonal layering instead of shadow, and motion measured in one or two pixels. The one exception to restraint is the authored moment: the mark draws itself once in the hero and settles.

**Key Characteristics:**
- Slate ground, one mint signal, one full mint field per page at most.
- The mark is the hero: drawn on, oversized, cropped, or repeated as a quiet pattern.
- Proof as ornament: readouts, dates, tables and mechanisms instead of illustration.
- Hairlines and tonal layers; no drop shadows, no glass, no glow.
- Montserrat for the voice, Poppins for the reading, IBM Plex Mono only for data.
- One authored motion moment; everything else enters quietly or not at all.

## Colors

A cold slate world lit by a single mint signal.

### Primary
- **Mint Signal** (mint-signal): the brand's only voice colour. Primary buttons, the emphasised word in the hero headline, links, the dial's sweep arc and brackets, the safe row and pill in the comparison table, active nav underline, focus rings, and the one full-bleed mint band. On slate it reaches 9.15:1 contrast.
- **Deep Mint** (mint-deep): the brandbook's secondary green. Reserved for low-opacity washes and fixed-background glows; never for text or controls.
- **Band Mint** (brand-band): mint mixed about 12% toward slate. The full-width WOTS+ band on the homepage uses it so a large mint field does not glare; buttons, links and small accents keep #15DC96.

### Neutral
- **Slate Ground** (slate-ground): the page. Every page starts here, including the header bar and footer.
- **Raised Slate** (slate-raised): tiles, panels, accordion items, link rows, the quantum section band and the dial's inner disc. Depth comes from stepping between ground and raised, not from shadow.
- **Hover Slate** (slate-hover): the hover fill for rows and tooltips.
- **Frame Hairline** (hairline-frame): structural rules between header, sections, page heroes and footer.
- **Hairline** (hairline): borders of tiles, panels, rows, tables and dividers.
- **Strong Hairline** (hairline-strong): outline buttons, hovered panels and the unsafe status pill.
- **Ink** (ink): headings, titles and primary text. Never pure white.
- **Dim Ink** (ink-dim): body copy and ledes (8.7:1 on slate).
- **Faint Ink** (ink-faint): mono labels, metadata, captions and table headers (5.5:1 on slate, 5.0:1 on raised slate).
- **Dial Graphite** (dial-graphite): the degree markings on the hero dial only (decorative, aria-hidden). Never for readable text.

### Named Rules
**The Single Signal Rule.** Mint is the only accent and stays under about a tenth of any screen. If two mint elements compete in one view, one of them is wrong.

**The Mint Field Swap Rule.** When mint becomes a whole field (the band), everything on it turns slate: text, mark, pattern and the button. Never mint on mint, never white on mint.

**The Slate Ground Rule.** The site is dark by brand decision, not by category habit. No section inverts to a light theme.

## Typography

**Display Font:** Montserrat (with system-ui)
**Body Font:** Poppins (with system-ui)
**Label/Mono Font:** IBM Plex Mono (with ui-monospace)

**Character:** Montserrat carries the sovereign voice: wide, geometric, confident at 600 and 700 with tight negative tracking. Poppins at 300 and 400 gives long copy an even, calm texture. IBM Plex Mono appears only where the content is data: readouts, signatures, dates, addresses and table headers. All three are self-hosted (@fontsource).

### Hierarchy
- **Display** (700, clamp(2.4rem, 4.6vw, 3.4rem), 1.06): the homepage hero headline only. Two lines maximum on desktop; one mint word.
- **Page title** (600, 2.4rem to 3.4rem, 1.06, -0.03em): the shared page hero on inner pages, left aligned, balanced, at most 22 characters per line.
- **Headline** (700, clamp(2rem, 3.4vw, 2.75rem), 1.1): section headings, sentence case, ending with a period when they are a statement.
- **Manifesto** (700, clamp(1.6rem, 3.6vw, 3rem), 1.08, uppercase): the mint band headline only. The single place where caps are allowed for a heading, following the brandbook's bold caps headlines.
- **Title** (600, 1.2rem to 1.35rem, 1.3): tile, card, row and accordion titles.
- **Lede** (300, 1rem to 1.125rem, 1.65): hero and page intro paragraphs, 560px or 62ch maximum.
- **Body** (400, 1rem, 1.68): running copy, 65 to 75ch.
- **Data** (Plex Mono 400, 0.8125rem, 0.06em): readout values, signature names, addresses, tabular facts.
- **Label** (Plex Mono 400, 0.625rem, 0.14em, uppercase): readout and table labels only. Never above a heading.
- **Wide label** (Plex Mono 400, 0.6875rem, 0.16em, uppercase): detail-row labels and callout labels on inner pages.
- **Small** (Poppins 400, 0.875rem, 1.6): table cell text, tile calls to action, secondary metadata in prose.
- **Haiku** (Redressed, 1.5rem to 1.75rem, 1.45): the block haiku only. under proof of work every block's nonce had to come from a valid haiku, so the haiku is set as poetry; Redressed is used nowhere else.

### Named Rules
**The Data Is Mono Rule.** Monospace means "this is a measured fact". It is never used as a costume for prose, headings or buttons.

**The No Kicker Rule.** Nothing sits above a heading: no eyebrow, no section number, no status pill. The heading carries its own weight.

**The One Poem Rule.** Redressed appears only for the block haiku; it is the single expressive exception to the system's restraint.

## Layout

A 1200px container (MUI lg) with 16px side gutters on mobile and 24px from sm up. Sections breathe at 56px vertical padding on mobile and 96px from md up; the quantum band and mint band run taller (64 to 112px and 80 to 128px). Layout is left aligned by default; only the mint band centres its content.

The homepage composes distinct layout families in sequence and never repeats one: a 7/5 split hero with the dial on the right; a full-width raised band with a comparison table; a 5/7 split with an accordion; an asymmetric bento (1.35fr 1fr 1fr, with the wallet tile spanning two rows); the centred mint band; a 5/7 split community grid. Inner pages open with a shared page hero (left-aligned title, optional lede, faint pattern on the right, a frame hairline beneath) and then use the same section rhythm.

Every multi-column layout collapses to one column below 900px (md) and keeps 16px gutters at 375px with no horizontal scroll. The dial's corner readouts become a 2 by 2 grid of bordered boxes under the dial below 600px.

## Elevation & Depth

The system is flat. Depth is tonal: slate ground, raised slate for anything that is a container, hover slate for pressed or hovered rows, separated by 1px hairlines. There are no drop shadows on buttons, tiles, panels, the header or the band. There are no shadows anywhere: hoverable panels respond with a mint-tinted border and a 2px rise, and team portraits use a 6px slate outline ring. The header uses a 12px backdrop blur because it floats over content; that is the only blur in the system.

### Named Rules
**The Hairline Rule.** If something needs separating, use a 1px line or a tonal step. A shadow is never the answer.

**The No Glow Rule.** No outer glows, no neon, no gradient text. The brandbook lists effects as logo misuse; the same applies to the interface.

## Shapes

Corners follow one documented scale: controls (buttons, small icon tiles, mobile readout boxes) at 10px; rows (link rows, accordion items, callouts) at 14px; surfaces (tiles, panels, the comparison table) at 20px; pills and status tags fully round. The mark is always a circle; the dial is concentric circles with tick marks at the cardinal points and right-angle corner brackets around its readouts. The brand pattern is the mark repeated on an even grid, used at 7 to 12 percent opacity and masked so it fades toward the content. Small icon tiles use the control radius (10px).

## Components

### Buttons
Machined and exact: flat fill, no shadow, a 1px press.
- **Shape:** gently squared (10px).
- **Primary:** mint fill, slate text, Montserrat 600 (10px 22px; large 14px 30px).
- **Hover / Focus:** fill turns to ink (near-white) with slate text in 200ms; active presses down 1px; focus shows a 2px mint outline offset 3px.
- **Outline:** transparent with a strong hairline and ink text; on hover the border and text turn mint over an 8% mint wash.
- **On mint:** inside the mint band the primary becomes a slate fill with ink text, hovering to raised slate with mint text.

### Chips and Status Pills
- **Safe:** solid mint pill, slate mono label ("Resistant since 2018").
- **Exposed:** transparent pill with a strong hairline and dim-ink mono label ("Breakable by Shor").

### Cards / Containers (Tiles and Panels)
- **Corner Style:** 20px.
- **Background:** raised slate on the slate ground.
- **Shadow Strategy:** none (see Elevation & Depth).
- **Border:** 1px hairline; on hover the border turns half-opacity mint and the tile rises 2px (no rise under reduced motion).
- **Internal Padding:** 24px on mobile, 28px from md up.
- Whole tiles are links when they lead somewhere; an external destination shows a north-east arrow in the top-right corner.

### Navigation
Montserrat 500 at 14px, dim ink, 30px apart, on a 76px slate bar with a frame hairline beneath and a 12px backdrop blur. Hover and active turn ink and draw a 1px mint underline from the left. The primary action (Buy MCM) sits at the right as a primary button. Below 900px the links move into a right-hand drawer.

### Inputs / Fields
Inputs appear only in the explorer search. They follow MUI outlined fields on raised slate with a mint caret and a mint focus outline.

### The Dial (signature component)
The homepage hero's instrument: a square stage of concentric rings (tick ring, inner hairline ring, a dotted mint ring at 40% opacity, a mint sweep arc with an end dot), a raised-slate disc, and the animated mark drawing itself at its centre. Four corner readouts in Plex Mono (Signatures, Consensus, Max supply, Block height or Genesis) sit in mint right-angle brackets. On load the sweep arc rotates in from minus 300 degrees and the dotted ring from minus 40 degrees over 3.3s with cubic-bezier(.22,.7,.2,1); with a fine pointer the rings and mark follow the cursor by a few degrees and pixels (900ms ease-out). Reduced motion removes both and swaps in the static mark.

### The Mint Band (signature component)
One full-bleed mint field per page at most, carrying a manifesto headline in slate caps, one slate paragraph, one slate button, and the pattern in slate at 12% opacity, masked to clear the centre.

### Motion
One authored moment per page: the dial on the homepage. The mark draws on in the brand's fixed order (ring, base, box and columns, diagonal) and holds; it never loops, never rotates once finished, and is replaced by a still under reduced motion. Content below the fold enters once as it scrolls into view: 18px rise, 6px blur to sharp, opacity to full, 800ms cubic-bezier(0.16, 1, 0.3, 1), with small staggers. Content already on screen at load never hides. Hover transitions run 160 to 250ms. Under reduced motion every hover rise and slide is switched off globally; colour feedback remains.

## Do's and Don'ts

### Do:
- **Do** keep mint under about a tenth of any screen, and use it for the action, the proof or the mark.
- **Do** turn everything slate on a mint field: text, mark, pattern and buttons.
- **Do** separate with 1px hairlines and tonal steps between slate ground (#172124) and raised slate (#1D2A2E).
- **Do** use IBM Plex Mono only for measured data: readouts, signatures, dates, addresses, table headers.
- **Do** let the mark carry the brand: drawn on once, oversized and cropped, or repeated as a faint masked pattern.
- **Do** write dates in full and keep every number checkable; prefer a mechanism to an adjective.
- **Do** give every interactive element a 2px mint focus outline and honour prefers-reduced-motion.
- **Do** keep every multi-column layout single-column below 900px with no horizontal scroll at 375px.

### Don't:
- **Don't** put an eyebrow, kicker, section number or status pill above a heading.
- **Don't** use gradient text, glow, neon, glass or drop shadows.
- **Don't** rotate, stretch, blur or add effects to the mark; never recolour it outside mint, slate or ink.
- **Don't** use stock coin photography, third-party coin logos or the brandbook's campaign taglines.
- **Don't** add a second full mint field to a page, or invert a section to a light theme.
- **Don't** animate more than one authored moment per page, loop the mark, or hide content that is already on screen.
- **Don't** use pure white (#FFFFFF) or pure black for text or surfaces.
- **Don't** use em or en dashes in visible text.
