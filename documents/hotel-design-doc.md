# Auria — Design Documentation
### Premium Hotel Website — Visual Identity & UI Specification

---

## 1. Concept
The brief asked for "premium, expensive, award-winning" — that's a feeling, not a template. Instead of a generic luxury-hotel look (gold gradients, stock beach photos, big rounded cards), the design is grounded in a specific fictional property: **Auria**, an 11-room hotel built into a basalt cliff on the Tyrrhenian coast. Every design decision — color, type, layout, copy — comes from that one place. This specificity is what makes it read as designed rather than assembled from a component library.

**Signature element — "The Horizon Line":** a thin brass line that appears as a live scroll-progress indicator at the top of the page, echoes as the sea horizon in the hero illustration, and repeats as section dividers throughout. It's the one motif the whole site is built around.

---

## 2. Design Tokens

### Color
| Token | Hex | Use |
|---|---|---|
| Basalt | `#16171A` | Primary background (volcanic stone, near-black) |
| Basalt 2 | `#1D1E22` | Card/panel background |
| Plaster | `#EDE7DB` | Primary text, headlines (warm ivory whitewash) |
| Brass | `#A9834B` | Primary accent — CTAs, dividers, the horizon line |
| Brass Light | `#CBAA76` | Hover states, secondary accent |
| Aegean | `#1F3B45` | Deep sea-teal, used in illustrations/gradients |
| Mist | `#9AA39A` | Secondary/muted text |
| Ember | `#7A2E1F` | Reserved — sparing use only (e.g. "sold out" state) |

*Deliberately avoids the two most common AI-default palettes: warm-cream-with-terracotta and near-black-with-acid-accent. Brass + basalt + deep teal reads as material (stone, metal, sea) rather than decorative.*

### Typography
| Role | Typeface | Notes |
|---|---|---|
| Display | **Instrument Serif** (italic) | Headlines, room names, pull quotes — editorial, high-contrast, used only in italic for a consistent "written by hand" feel |
| Body | **Manrope** | Paragraph text, form labels — clean, warm geometric sans |
| Utility/Data | **Space Mono** | Eyebrows, nav links, coordinates, prices' meta, buttons — gives the page a "ledger/instrument" precision that contrasts the soft serif |

### Layout Signature
- Hero: full-bleed vector cliff/sea illustration (not stock photography) with a floating glass booking widget that overlaps the hero/next-section boundary
- Rooms: horizontal scroll-snap "ledger" of room cards (not a static grid) — reinforces the idea of a small, finite, numbered collection (11 rooms)
- Amenities: numbered ledger rows instead of an icon grid — nothing here is decorative, everything is information
- Gallery: offset masonry grid with intentional vertical misalignment, avoiding a symmetrical grid

---

## 3. Page-by-Page Notes

### Home (built — see `auria-home.html`)
Hero → floating booking widget → About (coordinates + big room count) → Rooms (horizontal scroll) → Amenities (ledger) → Testimonial → Gallery (offset masonry) → Footer.

### Rooms & Suites (extend this system)
- Reuse room-card component from Home, in a responsive grid (not horizontal scroll) with filter bar styled as a single thin bordered row using the mono utility type
- Room detail view: large hero image left, sticky booking panel right, amenities as the same ledger-row pattern

### Amenities & Gallery
- Extend the ledger rows from Home into full detail sections (image + copy, alternating sides)
- Full gallery: same offset-masonry logic as Home's preview, just longer, with category filter tabs styled as mono-uppercase text (no pill buttons)

### Contact / Booking
- Split layout: left = form (inputs styled borderless with bottom-line only, matching the booking widget), right = coordinates block reused from About section + embedded map treated in duotone (basalt/brass) to match the illustration system rather than a default Google Maps skin

---

## 4. Motion
- Horizon progress line at top of viewport, tied to scroll position
- Section content fades/slides up on scroll (`IntersectionObserver`), one direction only, no bounce or overshoot
- Navbar transitions from transparent to solid basalt with blur after 60px of scroll
- All motion respects `prefers-reduced-motion`

---

## 5. Why these choices
- **No stock photography.** Every visual is a custom SVG built from the palette — this keeps the whole site tonally consistent in a way that licensed photography never quite achieves, and reads as considered rather than templated.
- **Mono type for data, serif for feeling.** Prices, coordinates, and nav are precise and quiet; room names and headlines are the emotional, italic voice. The contrast between the two does most of the "expensive" work.
- **Restraint.** One accent color used deliberately (brass), one animation idea (the horizon), one layout risk (horizontal room scroll). Nothing else competes for attention.

---

## 6. Implementation Note
The attached `auria-home.html` is a static, dependency-free build (Google Fonts only, vanilla JS) so it's easy to preview in any browser. For the actual React/Node build, port this 1:1 into components:
`Navbar`, `Hero`, `BookingWidget`, `AboutSplit`, `RoomScroller` + `RoomCard`, `AmenityLedger`, `TestimonialQuote`, `GalleryMasonry`, `Footer` — with the token table above going directly into `tailwind.config.js` as custom colors/fonts.
