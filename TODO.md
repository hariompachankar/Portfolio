# Typography Refinement Plan

**Goal:** Create a consistent, responsive typography scale across the entire website. Refine font sizes and spacing to look cleaner, balanced, and premium while preserving readability. Keep design, colors, animations, layout, and functionality unchanged.

## Typography Scale (base = 16px)
- Display / Hero: clamp(2.5rem, 6vw, 4.5rem) — case study; clamp(2.75rem, 7vw, 5.5rem) — portfolio
- Section heading: clamp(1.75rem, 4vw, 2.6rem)
- Subheading / card title: clamp(1.2rem, 2.4vw, 1.5rem)
- Body text: 0.88–0.95rem
- Small / meta / labels: 0.68–0.85rem
- Buttons / nav: 0.78–0.85rem
- Footer: 0.78rem

## Steps
- [x] 1. portfolio.html — refine hero, nav, headings, body, buttons, cards, footer, spacing
- [x] 2. index.html — apply same refinements + contact form
- [x] 3. case-study.css — refine case study page typography (base 18→16, headings, cards)
- [x] 4. contact-form.css — refine form inputs, labels, buttons, spacing
- [x] 5. Commit and push to branch
- [ ] 6. Create pull request (blocked — requires `gh auth login`)
