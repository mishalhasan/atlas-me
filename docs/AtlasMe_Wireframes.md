# AtlasMe — Wireframes & Design Reference

> Quick reference for all pages, layouts, and design decisions.
> Use alongside your code editor during implementation.

---

## Design System Quick Reference

### Colors
| Token | Light | Dark | Used For |
|-------|-------|------|----------|
| Background | #ffffff | #111111 | Page bg |
| Surface 1 | #f5f5f5 | #1a1a1a | Cards, panels |
| Surface 2 | #efefef | #242424 | Elevated, modals |
| Border | #d0d0d0 | #333333 | Dividers, outlines |
| Text primary | #1a1a1a | #f0f0f0 | Headings, body |
| Text secondary | #666666 | #888888 | Labels, captions |
| **Amber** | #d4a843 | #d4a843 | Pins, stats, in-app actions |
| Amber soft | rgba(212,168,67,0.1) | — | Badge bg, hover bg |
| **Indigo** | #4F46E5 | #4F46E5 | Auth CTAs, app-level actions |
| Map bg | #1a1a14 | #1a1a14 | Login bg, Captured hero |
| Destructive | #cc3333 | #cc3333 | Delete actions |

### Typography
| Role | Font | Weight | Size |
|------|------|--------|------|
| Personality type / hero | Playfair Display | 700 | 28–32px |
| Stat numbers | Playfair Display | 400 | 20–24px |
| Section headings | Inter | 600 | 1.25rem |
| Body | Inter | 400 | 1rem |
| Labels / captions | Inter | 500 | 0.875rem |
| Buttons | Inter | 600 | 0.875rem |
| Wordmark | Inter | 500 | 11px, letter-spacing 0.1em |

### Pin System
- **Visited** — solid amber `#d4a843` filled circle, white stroke
- **Wishlist** — hollow circle, `#1a1a1a` outline only
- Map style — Mapbox monochrome (greyscale). Amber pins are the only color on the map.

---

## Page 1 — Login / Register

**Route:** `/`
**Auth state:** Unauthenticated only. Redirect to `/map` if already logged in.
**Toggle:** Sign in / Sign up on same page, no separate routes needed.

### Layout

```
┌─────────────────────────────────────────────┐
│                                             │
│   Background: #1a1a14 (warm dark grey)      │
│   Subtle amber map grid lines overlay       │
│   (SVG, opacity ~0.15)                      │
│                                             │
│         ┌───────────────────────┐           │
│         │  ATLASME              │           │
│         │                       │           │
│         │  Welcome back         │           │
│         │  Your map is waiting. │           │
│         │                       │           │
│         │  ┌────────┬─────────┐ │           │
│         │  │ Sign in│ Sign up │ │           │  ← Toggle, active tab dark bg
│         │  └────────┴─────────┘ │           │
│         │                       │           │
│         │  Email                │           │
│         │  ┌─────────────────┐  │           │
│         │  │                 │  │           │  ← White bg, #d0d0d0 border
│         │  └─────────────────┘  │           │     Focus: #d4a843 border
│         │                       │           │
│         │  Password             │           │
│         │  ┌─────────────────┐  │           │
│         │  │                 │  │           │
│         │  └─────────────────┘  │           │
│         │                       │           │
│         │        Forgot password?           │  ← Amber #d4a843
│         │                       │           │
│         │  ┌─────────────────┐  │           │
│         │  │    Continue     │  │           │  ← Indigo #4F46E5
│         │  └─────────────────┘  │           │
│         │                       │           │
│         │  No account? Sign up  │           │  ← Amber link
│         └───────────────────────┘           │
│                                             │
└─────────────────────────────────────────────┘
```

### Notes
- Card: white bg, subtle white border `rgba(255,255,255,0.25)`
- Map grid lines: amber `#d4a843` at low opacity — visible against dark bg
- Sign up toggle shows additional Username field
- On successful login → `/map`
- First time register → `/onboarding`

---

## Page 2 — Onboarding

**Route:** `/onboarding`
**Auth state:** Protected. First-time users only. Skip sends to `/map`.
**Two screens, no separate routes** — manage with local state.

### Screen 1 — "Where have you been?"

```
┌─────────────────────────────────────────────┐
│                                             │
│   Background: #1a1a14                       │
│   Same amber grid lines as login            │
│                                             │
│         ┌───────────────────────┐           │
│         │  ATLASME              │           │
│         │                       │           │
│         │  Where have you been? │           │
│         │  Pick a few countries  │           │
│         │  — add more later.    │           │
│         │                       │           │
│         │  ┌─────────────────┐  │           │
│         │  │ 🔍 Search...    │  │           │  ← Reusable search component
│         │  └─────────────────┘  │           │
│         │                       │           │
│         │  POPULAR              │           │  ← 11px label, letter-spaced
│         │  ┌──────┐ ┌──────┐   │           │
│         │  │France│ │Japan✓│   │           │  ← Selected: amber tint + border
│         │  └──────┘ └──────┘   │           │     Unselected: white, grey border
│         │  ┌──────┐ ┌──────┐   │           │
│         │  │ USA  │ │Italy✓│   │           │
│         │  └──────┘ └──────┘   │           │
│         │  (10 chips total)     │           │
│         │                       │           │
│         │  NEARBY               │           │  ← Via geolocation API
│         │  ┌─────┐ ┌────────┐  │           │
│         │  │ UAE │ │ Saudi  │  │           │
│         │  └─────┘ └────────┘  │           │
│         │  (5 chips total)      │           │
│         │                       │           │
│         │  Skip         [ Next ]│           │  ← Next: Indigo
│         └───────────────────────┘           │
│                                             │
└─────────────────────────────────────────────┘
```

### Screen 2 — "Where's next?"

```
┌─────────────────────────────────────────────┐
│                                             │
│   Background: rgba(212,168,67,0.08)         │  ← Bridges to light mode
│   (amber wash — transitions from dark login)│
│                                             │
│         ┌───────────────────────┐           │
│         │  ██ ██  ← progress    │           │  ← 2 amber bars, both filled
│         │                       │           │
│         │  ATLASME              │           │
│         │                       │           │
│         │  Where's next?        │           │
│         │  Your dream           │           │
│         │  destination.         │           │
│         │                       │           │
│         │  ┌─────────────────┐  │           │
│         │  │ 🔍 Search...    │  │           │  ← Same search component
│         │  └─────────────────┘  │           │
│         │                       │           │
│         │  ┌─────────────────┐  │           │
│         │  │ 📍 Japan        │  │           │  ← Geocoding results dropdown
│         │  │    East Asia    │  │           │     Amber pin icon
│         │  ├─────────────────┤  │           │
│         │  │ 📍 New Zealand  │  │           │
│         │  │    Oceania      │  │           │
│         │  ├─────────────────┤  │           │
│         │  │ 📍 Peru         │  │           │
│         │  │    S. America   │  │           │
│         │  └─────────────────┘  │           │
│         │                       │           │
│         │  Skip         [ Done ]│           │  ← Done: Indigo → goes to /map
│         └───────────────────────┘           │
│                                             │
└─────────────────────────────────────────────┘
```

### Notes
- Selected chips → POST to `/api/pins` as "visited" type with coordinates
- Dream destination → POST to `/api/pins` as "wishlist" type
- Skip on screen 1 → skip both, go to `/map`
- Skip on screen 2 → go to `/map` with visited pins only
- Search component is reused on the map page — build it as a standalone component

---

## Page 3 — Map

**Route:** `/map`
**Auth state:** Protected.
**Key principle:** Map is full screen at all times. Nothing pushes or shrinks it.

### Layout

```
┌─────────────────────────────────────────────┐
│ ATLASME  23 countries · 4 cont · 41 pins ☰ │  ← Stats bar, always visible
├─────────────────────────────────────────────┤
│                                             │
│  ┌──────────────────┐          ┌──┐         │
│  │ 🔍 Search a      │          │+ │         │  ← Zoom controls top right
│  │    place...      │          ├──┤         │
│  └──────────────────┘          │− │         │
│                                └──┘         │
│                                             │
│                                             │
│          MAPBOX MONOCHROME MAP              │
│                                             │
│        🟡      🟡   🟡                      │  ← Amber visited pins
│              🟡                             │
│                         ○                  │  ← Hollow wishlist pin
│                   ○                        │
│                                             │
│                    ┌──────────────┐         │
│                    │ 📍 Paris     │         │  ← Pin popup on click
│                    │ Visited      │         │
│                    │ [ Delete ]   │         │
│                    └──────────────┘         │
│                                             │
│  © AtlasMe 2026        ┌────────────────┐  │
│                         │ ● Visited  23  │  │  ← Legend bottom right
│                         │ ○ Wishlist 18  │  │
│                         └────────────────┘  │
└─────────────────────────────────────────────┘
```

### Drawer (slides in from right on ☰ tap)

```
┌─────────────────────────────────────────────┐
│                        ┌──────────────────┐ │
│   Map (dimmed)         │ YO  Your Name    │ │
│   rgba(0,0,0,0.3)      │     @username  × │ │
│   overlay              ├──────────────────┤ │
│   click to close       │ ● Map  ← active  │ │  ← Amber active state
│                        │ ○ Stats          │ │
│                        │ ✦ Captured       │ │
│                        ├──────────────────┤ │
│                        │ YOUR TRAVELS     │ │
│                        │ 23   4    41     │ │
│                        │ co   cont pins   │ │
│                        ├──────────────────┤ │
│                        │ YOUR PERSONALITY │ │
│                        │ The Globetrotter │ │  ← Amber card, teaser
│                        │ 10+ countries... │ │
│                        ├──────────────────┤ │
│                        │ → Logout         │ │
│                        └──────────────────┘ │
└─────────────────────────────────────────────┘
```

### Notes
- Stats bar: wordmark left · stats center · hamburger right
- Drawer slides from right, overlays map, does NOT push it
- Click outside drawer (on overlay) → closes drawer
- Pin popup: shows name, type, delete button. Edit = nice-to-have
- Search uses Mapbox Geocoding API — autocomplete results dropdown
- Zoom +/− provided by Mapbox by default, style to match UI
- Legend: bottom right, stacked, amber dot / hollow dot
- Copyright: bottom left, floating, low opacity text

---

## Page 4 — Stats & Personality

**Route:** `/stats`
**Auth state:** Protected.
**Layout:** Centered single column, max-width ~600px, scrollable.

```
┌─────────────────────────────────────────────┐
│ ATLASME                                  ☰  │  ← Same header, no stats bar
├─────────────────────────────────────────────┤
│                                             │
│  YOUR TRAVEL IDENTITY                       │  ← 11px label
│                                             │
│  The Globetrotter                           │  ← Playfair Display 700 32px
│                                             │
│  You've explored 23 countries across        │  ← Personalized, uses real data
│  4 continents — the world is your           │     Numbers bold #1a1a1a
│  home and you're far from done.             │
│                                             │
│  ─────────────────────────────────────────  │
│                                             │
│  YOUR STATS                                 │
│                                             │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐   │
│  │    23    │ │    4     │ │   12%    │   │  ← Playfair numbers
│  │ countries│ │continents│ │ of world │   │
│  └──────────┘ └──────────┘ └──────────┘   │
│                                             │
│  ┌──────────────────┐ ┌──────────────────┐ │
│  │       41         │ │  🌍 Europe       │ │
│  │   total pins     │ │  top region      │ │
│  └──────────────────┘ └──────────────────┘ │
│                                             │
│  ─────────────────────────────────────────  │
│                                             │
│  NEXT DESTINATION                           │
│  ┌─────────────────────────────────────┐   │
│  │  🇲🇦 Morocco          [↻ Regenerate]│   │  ← Amber tint card
│  │  North Africa · Haven't visited     │   │     Regenerate: amber outline btn
│  └─────────────────────────────────────┘   │
│                                             │
│  ─────────────────────────────────────────  │
│                                             │
│  SHARE YOUR WORLD                           │
│  Your AtlasMe Captured profile is public.  │
│  ┌──────────────────────────────┐ ┌──────┐ │
│  │ atlasme.app/captured/username│ │ Copy │ │  ← Copy: Indigo
│  └──────────────────────────────┘ └──────┘ │
│                                             │
└─────────────────────────────────────────────┘
```

### Personality Type Rules
| Type | Trigger |
|------|---------|
| The Homebody | 0–2 countries |
| The Wanderer | 3–5 countries |
| The Adventurer | 6–10 countries OR 2+ continents |
| The Explorer | 11–20 countries OR 3+ continents |
| The Globetrotter | 20+ countries OR 4+ continents |

### Next Destination Logic
- Fetch all world countries
- Exclude user's visited pins
- Return one at random
- Regenerate button → new random pick, client-side
- Nice-to-have: weight toward unvisited continents

### Notes
- Header has no stats bar on this page — stats are the page content
- Regenerate only refreshes the destination card, nothing else
- Copy button copies shareable URL to clipboard, shows brief "Copied!" confirmation
- Page scrolls naturally on mobile

---

## Page 5 — AtlasMe Captured

**Route:** `/captured/:username`
**Auth state:** Public. No login required to view.
**Layout:** Centered card on neutral background. Max-width 400px.

```
┌─────────────────────────────────────────────┐
│                                             │
│   Background: var(--color-background-       │
│   secondary) — neutral, not white           │
│                                             │
│         ┌───────────────────────┐           │
│         │ ┌─────────────────────┤           │
│         │ │  #1a1a14 dark bg    │           │  ← Mini map hero
│         │ │  amber grid lines   │           │     160px tall
│         │ │  amber visited pins │           │     Mapbox Static API
│         │ │  hollow wishlist    │           │     or SVG placeholder
│         │ │  ATLASME    atlasme.app          │
│         │ └─────────────────────┤           │
│         │                       │           │
│         │  ┌──┐  Your Name      │           │  ← Avatar + name
│         │  │YO│  @username      │           │
│         │  └──┘                 │           │
│         │                       │           │
│         │  The Globetrotter     │           │  ← Playfair Display 700
│         │  Explored 23 countries│           │
│         │  across 4 continents  │           │
│         │                       │           │
│         │  ───────────────────  │           │
│         │                       │           │
│         │  ┌─────┐┌─────┐┌─────┐│           │
│         │  │ 23  ││  4  ││ 12% ││           │
│         │  │ co  ││cont ││world││           │
│         │  └─────┘└─────┘└─────┘│           │
│         │                       │           │
│         │  ┌─────────┐┌────────┐│           │
│         │  │   41    ││🌍 Europe││           │
│         │  │  pins   ││top reg ││           │
│         │  └─────────┘└────────┘│           │
│         │                       │           │
│         │  ┌─────────────────┐  │           │
│         │  │ Map your travels │  │           │  ← Indigo CTA
│         │  │   on AtlasMe    │  │           │     Growth loop for new users
│         │  └─────────────────┘  │           │
│         └───────────────────────┘           │
│                                             │
│              © AtlasMe 2026                 │
│                                             │
└─────────────────────────────────────────────┘
```

### Notes
- No header/nav — standalone page, not part of app shell
- Mini map: Mapbox Static Images API generates PNG from user's pin coordinates
  - If skipped for MVP: use dark SVG placeholder with amber dots for pins
- Stats identical to Stats page but smaller, card-compressed
- Indigo CTA links to `/` (register page) — growth loop
- If username doesn't exist → show 404 page
- No edit functionality — view only

---

## Page 6 — 404

**Route:** `*`

### Option B (if time — preferred)
```
┌─────────────────────────────────────────────┐
│                                             │
│              ATLASME                        │
│                                             │
│                  📍                         │  ← Amber pin, slightly large
│                                             │
│         You've wandered off the map.        │  ← Playfair Display
│                                             │
│      This page doesn't exist — yet.        │  ← Subtext, muted
│                                             │
│           ┌─────────────────┐               │
│           │  Back to my map │               │  ← Amber button → /map
│           └─────────────────┘               │
│                                             │
└─────────────────────────────────────────────┘
```

### Option C (fallback — 20 min build)
```
┌─────────────────────────────────────────────┐
│                                             │
│              ATLASME                        │
│                                             │
│                  404                        │
│                                             │
│           Page not found.                   │
│                                             │
│           ┌─────────────────┐               │
│           │  Back to my map │               │
│           └─────────────────┘               │
│                                             │
└─────────────────────────────────────────────┘
```

---

## Reusable Components

### Search Component
Used on: Onboarding screen 1 & 2, Map page
```
┌──────────────────────────────────┐
│ 🔍  Search a city or country...  │  ← White bg, grey border
└──────────────────────────────────┘
         ↓ on type
┌──────────────────────────────────┐
│ 📍  Paris          Europe        │  ← Geocoding results
│ 📍  Lyon           Europe        │     amber pin icon
│ 📍  Marseille      Europe        │     region label muted
└──────────────────────────────────┘
```
- Calls Mapbox Geocoding API on input change (debounced)
- Returns: name, coordinates, region
- On select → drops pin at coordinates

### Pin Popup
Used on: Map page
```
┌─────────────────┐
│ 📍  Paris        │
│ Visited          │  ← or Wishlist
│ [ Delete ]       │  ← Destructive #cc3333
└─────────────────┘
```

### Stat Card
Used on: Stats page, Captured page
```
┌─────────────┐
│     23      │  ← Playfair Display
│  countries  │  ← Inter, muted
└─────────────┘
```

### Chip (Country selector)
Used on: Onboarding screen 1
```
Unselected:  ┌────────┐
             │ France │  ← white bg, grey border
             └────────┘

Selected:    ┌────────┐
             │ Japan  │  ← rgba(212,168,67,0.1) bg
             └────────┘    amber border, amber text
```

---

## Routes Summary

| Route | Page | Protected |
|-------|------|-----------|
| `/` | Login / Register | No |
| `/onboarding` | Onboarding | Yes (first time) |
| `/map` | Map | Yes |
| `/stats` | Stats & Personality | Yes |
| `/captured/:username` | AtlasMe Captured | No |
| `*` | 404 | No |

---

## Responsive Notes

- All pages designed mobile-first
- Max-width containers: 600px (Stats), 400px (Captured card)
- Map: always full width, overlay elements scale down on mobile
- Stats bar: may abbreviate on very small screens (23co · 4cont · 41📍)
- Drawer: same behaviour on mobile and desktop — overlays, does not push
- Onboarding chips: wrap naturally via flexbox

---

*AtlasMe Wireframes — last updated pre-build*

---

## Mapbox Configuration Notes

### Projection
Use **Mercator** — flat wall map feel, not a 3D globe.

```javascript
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v11', // swap for monochrome style URL
  projection: 'mercator',   // flat map — classic wall map feeling
  zoom: 1.5,                // zoomed out enough to see most of the world
  center: [0, 20],          // centered on the world, slightly north of equator
})
```

### Map Style
- Use Mapbox monochrome style — configured in Mapbox Styles Lab
- Paste your custom style URL in place of the default style string above
- Monochrome keeps the map greyscale — amber pins are the only color

### Why Mercator
- Flat projection — exactly like a map hung on a wall
- No 3D globe behaviour as user zooms out
- Standard atlas/travel poster aesthetic
- Consistent with the AtlasMe visual identity

### Pin Rendering
Pins are custom HTML markers — not Mapbox symbol layers:

```javascript
// Visited pin — amber filled circle
const visitedEl = document.createElement('div')
visitedEl.style.cssText = `
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #d4a843;
  border: 2px solid #ffffff;
  cursor: pointer;
`

new mapboxgl.Marker({ element: visitedEl })
  .setLngLat([pin.longitude, pin.latitude])
  .addTo(map)

// Wishlist pin — hollow outlined circle
const wishlistEl = document.createElement('div')
wishlistEl.style.cssText = `
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: transparent;
  border: 2px solid #1a1a1a;
  cursor: pointer;
`
```

### Initial View
Set zoom and center so the full world map is visible on load:
- `zoom: 1.5` — sees most of the world
- `center: [0, 20]` — centered, slightly above equator so Africa/Europe prominent
- `minZoom: 1` — prevent zooming out so far the map tiles disappear
- `maxZoom: 18` — standard max zoom
