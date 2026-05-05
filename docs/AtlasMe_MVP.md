# AtlasMe — MVP Planning Document

## MVP Description

AtlasMe is a personal travel mapping app where users register, drop pins on an interactive Mapbox map to mark places they've visited or wish to visit, and instantly see their travel stats and a personality type derived from their pins. A shareable public profile link (AtlasMe Captured) lets users share their map and identity with others. That's it.

> **Can a user get value from just these core features?** Yes — a user can sign up, map their travels in minutes, and immediately get a meaningful reflection of who they are as a traveler, plus share it.

---

## Part 1: Feature List

### MVP Features (Must Have for Launch)

These features are non-negotiable. Without any one of them, the app fails to deliver its core value.

| # | Feature | Why it's MVP |
|---|---------|--------------|
| 1 | **Authentication** — register, login, logout, protected routes | Without this, there is no personal map. Nothing is private or persistent. |
| 2 | **Interactive Mapbox Map** — full-screen, pan, zoom, drag, monochrome style | The entire app is the map. Without it there is no product. |
| 3 | **Pin System** — drop visited and wishlist pins, persisted to database | Pins are the core interaction. No pins = no data = no value. |
| 4 | **Location Search** — Mapbox Geocoding API, search any city or country to place a pin | Without search, users cannot reliably find and pin locations. The map is unusable. |
| 5 | **Stats Dashboard** — total countries visited, total pins, continents, % of world explored | Stats are what transform a map into a personal identity. Core to the value proposition. |
| 6 | **Travel Personality Engine** — rule-based logic producing one of 4–6 personality types | This is the differentiator. Without it AtlasMe is just another pin map. |
| 7 | **Public Profile Page (AtlasMe Captured)** — shareable URL showing map, stats, personality | Without shareability the app has no growth loop and no social value. |

---

### Nice-to-Have Features

These enhance the experience but users still get full value without them.

| Feature | Category | Notes |
|---------|----------|-------|
| Dark / light mode toggle | UX polish | App works fine in light mode only at launch |
| Edit pin details (notes, date, type) | Pin enhancement | Delete-only is sufficient for MVP |
| Filter map by visited vs wishlist | UX enhancement | Both pin types visible by default |
| Smooth map/pin animations | Polish | Functional without animation |
| Auto-generated social media card (AtlasMe Captured card) | Share enhancement | Shareable link covers MVP; card is v2 |
| Custom pin icons or shapes | Visual upgrade | Default colored pins are sufficient |
| Improved map style themes | Visual upgrade | Monochrome default covers MVP |
| Photo upload per pin | Pin enhancement | Notes/dates are sufficient for MVP |
| Saved trips / collections | Advanced | Out of scope for 3 weeks |
| Advanced filtering and search | Advanced | Basic search covers MVP |

---

### Future Enhancements (V2+)

| Feature | Notes |
|---------|-------|
| Calendar integration for trip hype emails | Great idea — save for v2 |
| Friends maps and overlap view | Social feature, needs user base first |
| Multiple shareable card templates | After core card is built |
| Onboarding wizard (multi-step) | Simple empty state covers MVP |
| Native mobile app | Web responsive is sufficient for now |

---

## Part 2: MVP Scope by Week

### Week 1 — Foundation
- Auth (register, login, JWT, protected routes)
- Mapbox map rendering (monochrome, full pan/zoom)
- Pin data model and REST API endpoints
- Drop and save pins to database (visited vs wishlist)

### Week 2 — Usable
- Location search via Mapbox Geocoding API
- Delete pins
- Stats dashboard (countries, continents, % of world, total pins)
- Travel personality logic (rule-based, 4–6 types)
- Empty state prompt for new users ("Search a city to drop your first pin")

### Week 3 — Ship
- Public profile page (AtlasMe Captured) — shareable URL, no login required to view
- Mobile responsiveness
- Deployment (Render + NeonDB)
- UI polish
- *Bonus if time allows:* dark mode, pin notes/date editing

---

## Personality Type Logic (Sketch)

| Type | Rule |
|------|------|
| The Continent Collector | Visited 4+ continents |
| The Deep Diver | Fewer than 5 countries but 10+ pins (returns to same places) |
| The Dreamer | Wishlist pins outnumber visited pins |
| The Explorer | 10+ countries visited |
| The Homebody | Fewer than 3 countries visited (starter state) |
| The Wanderer | Default balanced state |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React, React Router, react-map-gl (Mapbox wrapper) |
| Backend | Node.js, Express |
| Database | PostgreSQL + Prisma ORM |
| Auth | JWT, bcrypt |
| Map | Mapbox GL JS (monochrome style + Geocoding API) |
| Deployment | Render (frontend + backend), NeonDB (PostgreSQL) |

---

## Color Palette (Rough Outline — Finalize During Implementation)

### Base

| Role | Light Mode | Dark Mode |
|------|-----------|-----------|
| Background | #ffffff | #111111 |
| Surface 1 (cards, panels) | #f5f5f5 | #1a1a1a |
| Surface 2 (elevated, modals) | #efefef | #242424 |
| Surface 3 (inputs, hover bg) | #e5e5e5 | #2e2e2e |
| Border | #d0d0d0 | #333333 |
| Text primary | #1a1a1a | #f0f0f0 |
| Text secondary | #666666 | #888888 |
| Text disabled | #aaaaaa | #555555 |
| Destructive (delete) | #cc3333 | #cc3333 |

### Two-Accent System (Separation of Concerns)

The principle: **indigo** signals auth/app-level actions. **Amber** signals product/travel identity. Once logged in, indigo largely disappears and amber takes over.

| Accent | Value | Soft Tint | Used For |
|--------|-------|-----------|----------|
| Indigo | #4F46E5 | TBD | Sign up, sign in buttons, app-level CTAs |
| Amber | #d4a843 | rgba(212, 168, 67, 0.1) | Pins, stats, personality badges, in-app actions |

### Rough Interaction States (Refine During Build)

**Indigo — auth / app-level context**

| State | Value |
|-------|-------|
| Button default | #4F46E5 bg, #ffffff text |
| Button hover | ~#4338ca (slightly darkened) |
| Focus ring | #4F46E5 |

**Amber — product / travel context**

| State | Value |
|-------|-------|
| Visited pin | #d4a843 |
| Wishlist pin | Hollow, outlined |
| Personality badge | rgba(212, 168, 67, 0.1) bg, #d4a843 text |
| Stat highlights | rgba(212, 168, 67, 0.1) bg |
| Ghost button hover | rgba(212, 168, 67, 0.1) bg |
| In-app primary actions | #d4a843 bg |
| Input focus border | #d4a843 |

> **Note:** Exact hover states, disabled states, and edge cases to be decided during implementation. The principle is the guide — indigo = entry point, amber = the experience. Map stays grayscale throughout.

---

## Typography

**Font pairing: Playfair Display + Inter**

```html
<!-- Google Fonts import -->
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
```

| Role | Font | Weight | Size |
|------|------|--------|------|
| Page titles / hero headings | Playfair Display | 700 | 2.5rem+ |
| Personality type name | Playfair Display | 600 | 2rem |
| Big stat numbers | Playfair Display | 400 | 3rem |
| Section headings | Inter | 600 | 1.25rem |
| Body / descriptions | Inter | 400 | 1rem |
| Labels / captions | Inter | 500 | 0.875rem |
| Buttons | Inter | 600 | 0.875rem |
| Nav items | Inter | 500 | 0.9rem |
| Input text | Inter | 400 | 1rem |

> **Rule of thumb:** Playfair Display for moments that should feel significant — your personality type, your stats, your profile headline. Inter for everything that needs to be functional and readable.

---

## Acceptance Criteria Checklist

- [x] Complete feature list created with clear labels (MVP / Nice-to-Have / Future)
- [x] 7 core MVP features identified — each fails the "still get value without it?" test
- [x] Non-essential features clearly labeled as Nice-to-Have or Future Enhancement
- [x] Each MVP feature justified: removing it breaks the core value proposition
- [x] MVP features are realistic for a 3-week timeline
- [x] MVP description written (see top of document)
- [x] MVP provides clear user value on its own
- [ ] Instructor approved MVP

---

*AtlasMe — your travels, mapped. Share your world at atlasme.app/captured/[username]*

---

## CRUD Operations

Full CRUD is covered across the core user flows.

| # | Operation | CRUD | Where |
|---|-----------|------|-------|
| 1 | Register user | Create | Register page |
| 2 | Login | Read | Login page |
| 3 | Add pin | Create | Map page + Onboarding |
| 4 | Delete pin | Delete | Map page (pin popup) |
| 5 | Change pin type (visited ↔ wishlist) | Update | Map page (pin popup) |
| 6 | Load pins | Read | Map page |
| 7 | Load stats | Read | Stats page + drawer |
| 8 | Location search (Geocoding) | Read | Map page + Onboarding |

### Notes
- Onboarding pins use the same Create operation as adding a pin on the map — same endpoint, different trigger
- Change pin type is the Update operation — toggles a pin between visited and wishlist via a single PUT request
- Stats are derived from pins on the backend — no separate stats table needed
- Geocoding calls Mapbox API directly from the frontend — no backend involvement

---

## UI & Component Library

### Decisions

| Layer | Choice | Notes |
|-------|--------|-------|
| CSS framework | Tailwind CSS | Utility classes, pairs with shadcn/ui |
| Component library | shadcn/ui | Copy-paste components, fully customizable |
| Icon library | Lucide React | Clean, minimal, consistent stroke weight |
| Map pins | Custom HTML markers (Mapbox) | Pure CSS circles — no icon library needed |

### Why shadcn/ui
- Components are copied into your project — you own and edit them freely
- No library API to learn — just React components and Tailwind classes
- CSS variables for theming — amber and indigo defined once, applied everywhere
- Pairs naturally with your two-accent color system
- Popular in portfolios right now — hiring managers recognize it

### Components you'll likely use
- `Button` — primary, outline, ghost variants
- `Dialog` / `Sheet` — pin popup, drawer
- `Input` — search bar, form fields
- `Badge` — personality type label
- `Separator` — dividers between sections

### Setup Order (Day 1, Week 1)
Do these in order before writing any feature code:

1. Scaffold project structure (`client/` + `server/`)
2. Install Tailwind CSS
3. Run shadcn/ui init — sets up config and CSS variables
4. Define your color tokens in `globals.css`:
   - Amber `#d4a843` → `--color-accent`
   - Indigo `#4F46E5` → `--color-primary`
   - Map bg `#1a1a14` → `--color-map-bg`
5. Add Lucide React (`npm install lucide-react`)
6. Add your first shadcn components (`button`, `input`, `dialog`)
7. Start building features

> **Note:** shadcn/ui has a short learning curve — roughly half a day to set up and feel comfortable. Add it on day 1 as part of project scaffolding, not as a separate learning exercise.
