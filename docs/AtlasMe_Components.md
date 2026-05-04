# AtlasMe — Component Hierarchy & State Management

---

## State Management Approach

**Library:** React Context API (no Redux — overkill for this project size)

**Two contexts:**

### AuthContext
```
AuthContext
├── token
├── user (id, username, email)
├── login()
└── logout()
```

### PinsContext
```
PinsContext
├── visited[]
├── wishlist[]
├── addPin()
├── deletePin()
└── updatePin()   ← toggle visited ↔ wishlist
```

**Stats are derived — not stored in state.**
Compute from `visited[]` and `wishlist[]` using `useMemo`:
- Countries visited → `visited.length` (unique countries)
- Continents → derived from pin coordinates/region field
- % of world → `(uniqueCountries / 195) * 100`
- Total pins → `visited.length + wishlist.length`
- Most visited region → frequency count of region field across visited pins

---

## Token Storage

**Decision: localStorage (MVP) → httpOnly cookie (if time)**

| Option | Complexity | Security |
|--------|-----------|----------|
| localStorage | Low | Vulnerable to XSS |
| httpOnly cookie | Low-Medium | More secure, JS can't access |

- For MVP: localStorage is acceptable — document the tradeoff in README
- If map implementation is faster than expected: upgrade to httpOnly cookie
- Backend: `res.cookie('token', jwt, { httpOnly: true, secure: true })`
- Research: *"JWT storage localStorage vs httpOnly cookie"*

---

## Global vs Local State

| State | Where | Why |
|-------|-------|-----|
| `token` | AuthContext | Needed across all protected pages |
| `user` | AuthContext | Needed for profile, avatar, public URL |
| `visited[]` | PinsContext | Needed on Map, Stats, drawer |
| `wishlist[]` | PinsContext | Needed on Map, Stats, drawer |
| Form inputs | Local | Only needed within the form |
| Drawer open/closed | Local | UI state, map page only |
| Pin popup open/closed | Local | UI state, map page only |
| Next destination | Local | Stats page only, random pick |
| Search results | Local | Search component only |
| Onboarding step | Local | Onboarding page only |

**Note:** Captured page (`/captured/:username`) uses **no context**.
It fetches public data directly from the backend on mount — local state only.

---

## Component Tree

### App Shell
```
App
├── AuthContext.Provider
│   └── PinsContext.Provider
│       ├── Router
│       │   ├── / → LoginPage
│       │   ├── /onboarding → OnboardingPage (protected)
│       │   ├── /map → MapPage (protected)
│       │   ├── /stats → StatsPage (protected)
│       │   ├── /captured/:username → CapturedPage (public)
│       │   └── * → NotFoundPage
│       └── ProtectedRoute (wrapper component)
```

---

## Page 1 — Login / Register (`/`)

```
LoginPage
├── MapBackground          ← dark bg + amber SVG grid lines
└── AuthCard
    ├── Wordmark
    ├── TabToggle           ← Sign in / Sign up local state
    ├── LoginForm           ← local state: email, password
    │   ├── Input (email)
    │   ├── Input (password)
    │   ├── ForgotPassword link
    │   └── Button (Continue) ← calls AuthContext.login()
    └── RegisterForm        ← local state: username, email, password
        ├── Input (username)
        ├── Input (email)
        ├── Input (password)
        └── Button (Continue) ← calls AuthContext.login() after register
```

**Local state:**
- `activeTab` — 'signin' | 'signup'
- `email`, `password`, `username` — form fields
- `error` — validation/API error message
- `loading` — async state for button

---

## Page 2 — Onboarding (`/onboarding`)

```
OnboardingPage
├── MapBackground           ← same as login, reused
└── OnboardingCard
    ├── ProgressBar          ← local state: step (1 | 2)
    │
    ├── Screen 1: WhereHaveyouBeen
    │   ├── Heading
    │   ├── SearchBar        ← reusable component
    │   ├── ChipGroup        ← Popular countries
    │   │   └── Chip[]       ← local selected state
    │   ├── ChipGroup        ← Nearby (geolocation)
    │   │   └── Chip[]
    │   ├── SkipButton       ← goes to /map
    │   └── NextButton       ← advances to step 2
    │
    └── Screen 2: WhereIsNext
        ├── Heading
        ├── SearchBar        ← same reusable component
        ├── SearchResults    ← dropdown, local state
        ├── SkipButton       ← goes to /map
        └── DoneButton       ← saves pins, goes to /map
```

**Local state:**
- `step` — 1 | 2
- `selectedCountries[]` — chips selected in screen 1
- `dreamDestination` — single selection in screen 2
- `searchQuery`, `searchResults` — search component state

**On Done/Next:** calls `PinsContext.addPin()` for each selection

---

## Page 3 — Map (`/map`)

```
MapPage
├── StatsBar                ← reads from PinsContext, derives stats
│   ├── Wordmark
│   ├── StatItem (countries)
│   ├── StatItem (continents)
│   ├── StatItem (pins)
│   └── HamburgerButton     ← toggles drawer (local state)
│
├── MapContainer            ← Mapbox GL JS
│   ├── VisitedPins[]       ← from PinsContext.visited
│   ├── WishlistPins[]      ← from PinsContext.wishlist
│   └── PinPopup            ← local state: selectedPin
│       ├── PinName
│       ├── PinType
│       ├── ToggleTypeButton ← calls PinsContext.updatePin()
│       └── DeleteButton     ← calls PinsContext.deletePin()
│
├── SearchBar               ← reusable, top left overlay
│
├── ZoomControls            ← top right (Mapbox default, styled)
│
├── MapLegend               ← bottom right
│   ├── LegendItem (visited)
│   └── LegendItem (wishlist)
│
├── Copyright               ← bottom left, floating
│
└── Drawer                  ← local state: isOpen
    ├── UserProfile         ← from AuthContext.user
    ├── NavLinks
    │   ├── NavItem (Map)
    │   ├── NavItem (Stats)
    │   └── NavItem (Captured)
    ├── StatsSummary        ← derived from PinsContext
    ├── PersonalityTeaser   ← derived from PinsContext
    └── LogoutButton        ← calls AuthContext.logout()
```

**Local state:**
- `isDrawerOpen` — boolean
- `selectedPin` — pin object | null (for popup)

**Derived (useMemo):**
- `countriesCount`, `continentsCount`, `totalPins` — from PinsContext arrays

---

## Page 4 — Stats (`/stats`)

```
StatsPage
├── Header
│   ├── Wordmark
│   └── HamburgerButton
│
├── TravelIdentity
│   ├── SectionLabel
│   ├── PersonalityType     ← Playfair Display, derived
│   └── PersonalizedHeadline ← derived from pins data
│
├── StatsGrid
│   ├── StatCard (countries)
│   ├── StatCard (continents)
│   ├── StatCard (% of world)
│   ├── StatCard (total pins)
│   └── StatCard (top region)
│
├── NextDestination         ← local state: destination
│   ├── DestinationCard
│   └── RegenerateButton    ← picks new random country
│
├── ShareSection
│   ├── ShareURL            ← constructed from AuthContext.user.username
│   └── CopyButton          ← copies to clipboard
│
└── Drawer                  ← same as MapPage drawer, reusable
```

**Local state:**
- `nextDestination` — randomly picked country object
- `copied` — boolean for copy confirmation flash

**Derived (useMemo):**
- All stats from `PinsContext.visited[]` and `PinsContext.wishlist[]`
- `personalityType` — rule-based from countriesCount + continentsCount

---

## Page 5 — AtlasMe Captured (`/captured/:username`)

```
CapturedPage                ← NO context used — standalone fetch
├── MiniMapHero             ← Mapbox Static API or SVG placeholder
│   └── (static, not interactive)
│
├── UserIdentity
│   ├── Avatar
│   ├── DisplayName
│   └── Username
│
├── PersonalitySection
│   ├── PersonalityType
│   └── PersonalizedHeadline
│
├── StatsGrid               ← same StatCard component, reused
│   ├── StatCard (countries)
│   ├── StatCard (continents)
│   ├── StatCard (% of world)
│   ├── StatCard (pins)
│   └── StatCard (top region)
│
├── JoinCTA                 ← "Map your travels on AtlasMe" → /
└── Copyright
```

**Local state:**
- `profileData` — fetched from `GET /api/public/:username`
- `loading` — boolean
- `error` — null | string (e.g. user not found → 404)

**Note:** This page fetches independently.
No AuthContext, no PinsContext. Username from URL params.
Public endpoint returns only non-sensitive data.

---

## Page 6 — 404

```
NotFoundPage
├── Wordmark
├── AmberPin (SVG)          ← Option B if time
├── Heading ("You've wandered off the map.")
├── Subtext
└── BackButton              ← → /map
```

**State:** None

---

## Reusable Components (minimum 5 — identified)

| Component | Used On | Props |
|-----------|---------|-------|
| `SearchBar` | Onboarding, Map | `onSelect(location)`, `placeholder` |
| `StatCard` | Stats, Captured | `value`, `label` |
| `MapBackground` | Login, Onboarding | — |
| `Drawer` | Map, Stats | `isOpen`, `onClose` |
| `PersonalityType` | Stats, Captured, Drawer | `visited[]`, `wishlist[]` |
| `Button` | Everywhere | shadcn/ui base |
| `Chip` | Onboarding | `label`, `selected`, `onToggle()` |

---

## Derived Stats Logic (useMemo)

```javascript
// Countries visited (unique)
const countriesCount = useMemo(() =>
  new Set(visited.map(p => p.country)).size
, [visited])

// Continents visited (unique)
const continentsCount = useMemo(() =>
  new Set(visited.map(p => p.continent)).size
, [visited])

// % of world
const worldPercent = useMemo(() =>
  ((countriesCount / 195) * 100).toFixed(1)
, [countriesCount])

// Total pins
const totalPins = useMemo(() =>
  visited.length + wishlist.length
, [visited, wishlist])

// Most visited region
const topRegion = useMemo(() => {
  const freq = {}
  visited.forEach(p => freq[p.region] = (freq[p.region] || 0) + 1)
  return Object.entries(freq).sort((a, b) => b[1] - a[1])[0]?.[0] ?? '—'
}, [visited])

// Personality type
const personalityType = useMemo(() => {
  if (countriesCount >= 20 || continentsCount >= 4) return 'The Globetrotter'
  if (countriesCount >= 11 || continentsCount >= 3) return 'The Explorer'
  if (countriesCount >= 6  || continentsCount >= 2) return 'The Adventurer'
  if (countriesCount >= 3)                          return 'The Wanderer'
  return 'The Homebody'
}, [countriesCount, continentsCount])
```

---

## ProtectedRoute Component

```javascript
// Redirects to / if no token in AuthContext
const ProtectedRoute = ({ children }) => {
  const { token } = useAuth()
  return token ? children : <Navigate to="/" />
}
```

---

*AtlasMe Component Plan — reference during Week 1 setup*
