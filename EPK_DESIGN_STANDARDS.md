# BURDEN GHOST Website & EPK Design Standards

Last researched: 11 October 2026
Applies to: burdenghost.com, especially `press-kit.html`, shared `style.css`, the downloadable EPK, and future artist-site changes.

## Objective

The website is an industry-facing artist hub for journalists, playlist curators, promoters, venues, collaborators, labels and fans. A visitor should quickly understand who BURDEN GHOST is, hear the music, access usable media assets, download the press kit, and find a contact route.

## Brand and art direction

- Preserve the established black, charcoal, silver and white visual identity and the alternative rap / metal / gothic tone.
- Keep the existing wordmark identity; solve scale and layout before replacing brand artwork.
- Avoid religious imagery and religious symbols unless explicitly requested.
- Use atmosphere as supporting art direction, not at the expense of readability or navigation.
- Keep one clear primary action, with secondary actions visually quieter.

## Hero / wordmark rules

- Never allow the artist name to be clipped, horizontally overflow, or require sideways scrolling.
- Give the logo a bounded container with fluid but capped typography. Use relative units and a sensible minimum/maximum rather than uncontrolled viewport-only sizing.
- Break the name into deliberate lines where this improves legibility and visual impact; maintain clear hierarchy between wordmark, tagline and calls to action.
- The hero should identify the artist immediately, then present a concise descriptor and a direct listening action.
- Stack CTA links on narrow screens; allow labels to wrap and maintain comfortable touch targets.
- Test desktop and mobile separately; a mobile screenshot alone does not prove desktop correctness.

## EPK content and information architecture

- Make the kit a low-friction, single-link hub. Essential material should be findable without accounts or unnecessary clicks.
- Prioritize: short artist positioning / bio, best music links, approved artist photography and artwork, selected releases or verifiable highlights, social / streaming links, direct media contact, and a downloadable press-ready PDF.
- Write for scanning: concise paragraphs, meaningful headings, useful labels, and restrained section length.
- Offer high-quality, usable press assets and state attribution expectations where appropriate.
- Metrics must show source and capture date because dashboards update at different intervals. Avoid presenting stale snapshots as live values.
- Never publish the reported 113M streams figure associated with MassiveMusic as a verified claim until Amuse or another authoritative source confirms it.
- Do not add unsupported press quotes, credentials, audience claims, release status, or career claims.

## Accessibility and responsive implementation

- Preserve semantic HTML, a logical heading structure, descriptive link labels, keyboard navigation and visible focus states.
- Keep text contrast readable against dark backgrounds; muted text should remain legible.
- Text must remain usable at 200% enlargement, and ordinary page content should reflow at a 320 CSS-pixel viewport without two-dimensional scrolling (WCAG guidance).
- Fluid typography should respect user settings; do not rely on viewport units alone for font size.
- Support reduced-motion preferences for nonessential motion.
- Test navigation, button focus, CTA wrapping, logo containment, long labels, and translated English/Spanish copy.

## Technical and release workflow

1. Research current authoritative guidance relevant to the change before editing.
2. Inspect the live/repository implementation and identify the actual source of the issue.
3. Make a targeted change that preserves working links, SEO, language switching, security controls and existing features.
4. Verify the diff and validate markup/CSS logic; test representative desktop, tablet and mobile widths and zoom/reflow where a browser test environment is available.
5. Check critical routes, press-kit PDF/photo downloads, music links, contact flow and live behavior when tools permit.
6. Report what was actually tested and clearly distinguish code changes from live verification. Never claim a test passed if it was not run.

## Research references

- W3C, WCAG 2.2: https://www.w3.org/TR/WCAG22/
- W3C WAI, Understanding Reflow (320 CSS-pixel viewport): https://www.w3.org/WAI/WCAG21/Understanding/reflow
- W3C WAI, Understanding Resize Text (200%): https://www.w3.org/WAI/WCAG21/Understanding/resize-text
- web.dev, Responsive and fluid typography with Baseline CSS features: https://web.dev/articles/baseline-in-action-fluid-type
- web.dev, Typography: https://web.dev/learn/design/typography
- EPK editorial reference, The Musical Road (2026): https://themusicalroad.com/blog/electronic-press-kit-epk-guide
- Additional 2026 EPK checklist reference: https://getheard.fm/guides/how-to-make-an-epk

The W3C and web.dev sources inform accessibility and responsive typography requirements. EPK editorial guides inform content completeness and reducing friction for industry readers; they are practical guidance, not binding standards.
