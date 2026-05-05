# AtlasMe — User Stories

**Total Estimated Time:** ~50 hours
**Timeline:** 3 weeks primary · week 4 buffer if needed
**Deployment:** Deploy early and continuously — not at the end

---

## Sprint Overview

| Sprint            | Focus                             | Stories                                | Est. Time |
| ----------------- | --------------------------------- | -------------------------------------- | --------- |
| Sprint 1 — Week 1 | Backend + DB + Map foundation     | 0, 1BE, 2BE, 3, 5BE, 6BE, 7BE, 8BE, 17 | ~18 hrs   |
| Sprint 2 — Week 2 | Frontend + integration            | 1FE, 2FE, 4, 9, 10, 11                 | ~18 hrs   |
| Sprint 3 — Week 3 | Polish + custom features + deploy | 12, 13, 14, 15, 16, 18                 | ~14 hrs   |
| Buffer — Week 4   | Overflow, polish, nice-to-haves   | —                                      | —         |

---

## Group 1 — Auth & Setup

---

### Story 0: Connect Database to Backend

As a developer,
I want to connect PostgreSQL to the Express server,
So that I can store and retrieve user and pin data.

Acceptance Criteria:

- [ ] Server.js imports and configures Prisma client
- [ ] Database connection string loaded from `.env`
- [ ] Connection established when server starts
- [ ] Success message logged to console on connection
- [ ] Error handling if connection fails
- [ ] Server does not start if database connection fails

Priority: Critical
Sprint: 1
Estimated Time: 30 minutes
Status: Not Started

---

### Story 1: User Registration

As a new user,
I want to create an AtlasMe account with a username, email and password,
So that I can save my travel pins and access my personal map.

Acceptance Criteria:

- [ ] User can enter username, email and password on register form
- [ ] Email format validated (must contain @ and domain)
- [ ] Username validated (3-20 characters, alphanumeric)
- [ ] Password validated (minimum 8 characters)
- [ ] Password hashed with bcrypt (10+ salt rounds) before saving
- [ ] Duplicate email or username returns clear error message
- [ ] On success, JWT token issued and user redirected to `/onboarding`

Priority: High
Sprint: 1 (backend) · 2 (frontend)
Estimated Time: 3-4 hours
Status: Not Started

---

### Story 2: User Login

As a registered user,
I want to log in with my email and password,
So that I can access my map and travel data.

Acceptance Criteria:

- [ ] User can enter email and password on login form
- [ ] Credentials validated against database
- [ ] Password compared using bcrypt
- [ ] JWT token generated and returned on success
- [ ] Token stored in localStorage (httpOnly cookie if time allows)
- [ ] Returning user redirected to `/map` after login
- [ ] Invalid credentials show clear error message
- [ ] User remains logged in across browser sessions
- [ ] On login, pins load automatically and map reflects previous state

Priority: High
Sprint: 1 (backend) · 2 (frontend)
Estimated Time: 3-4 hours
Status: Not Started

---

### Story 3: Protected Routes (Backend)

As the system,
I want to verify authentication on all private API routes,
So that only authenticated users can access or modify their data.

Acceptance Criteria:

- [ ] Auth middleware checks for valid JWT token on every protected route
- [ ] Middleware extracts user ID from token and attaches to request
- [ ] Returns 401 if token is missing
- [ ] Returns 401 if token is invalid or expired
- [ ] Returns 403 if user attempts to access another user's data
- [ ] Public route `GET /api/public/:username` has no auth middleware

Priority: High
Sprint: 1
Estimated Time: 2-3 hours
Status: Not Started

---

### Story 4: Protected Routes (Frontend)

As a user,
I want to be redirected to login if I'm not authenticated,
So that my map and travel data stays private.

Acceptance Criteria:

- [ ] `ProtectedRoute` component checks for token in AuthContext
- [ ] Unauthenticated users redirected to `/` from any protected route
- [ ] `/map`, `/stats`, `/onboarding` are all protected
- [ ] `/captured/:username` and `/` are public — no redirect
- [ ] After register, user lands on `/onboarding`
- [ ] After login, user lands on `/map`
- [ ] After logout, protected routes become immediately inaccessible

Priority: High
Sprint: 2
Estimated Time: 2 hours
Status: Not Started

---

## Group 2 — Pins (Core Resource)

---

### Story 5: Add a Pin

As an authenticated user,
I want to drop a pin on the map by searching a city or country,
So that I can mark places I've visited or want to visit.

Acceptance Criteria:

- [ ] `POST /api/pins` accepts authenticated requests
- [ ] Request body validated — name, latitude, longitude, type required
- [ ] Type must be either `visited` or `wishlist`
- [ ] Pin saved to database with user ID from JWT
- [ ] Country and continent fields derived from pin data and saved
- [ ] 201 status returned with created pin object
- [ ] Pin appears on map immediately after creation
- [ ] Works from both map page and onboarding flow
- [ ] User cannot create a pin with missing coordinates

Priority: High
Sprint: 1 (backend) · 2 (frontend)
Estimated Time: 3-4 hours
Status: Not Started

---

### Story 6: Load Pins

As an authenticated user,
I want my pins to load when I open the map,
So that I can see all my visited and wishlist places.

Acceptance Criteria:

- [ ] `GET /api/pins` accepts authenticated requests
- [ ] Returns only pins belonging to the authenticated user
- [ ] Pins returned as two arrays — visited and wishlist
- [ ] Empty arrays returned if user has no pins
- [ ] 200 status returned with pin data
- [ ] Pins render correctly on Mapbox map on page load
- [ ] Loading state shown while pins are being fetched
- [ ] Pins persist across sessions — reloaded from database on every login

Priority: High
Sprint: 1 (backend) · 2 (frontend)
Estimated Time: 2-3 hours
Status: Not Started

---

### Story 7: Toggle Pin Type

As an authenticated user,
I want to change a pin from visited to wishlist or vice versa,
So that I can update my map when my travel plans change.

Acceptance Criteria:

- [ ] `PUT /api/pins/:id` accepts authenticated requests
- [ ] User can only update their own pins — returns 403 otherwise
- [ ] Only the `type` field is updated (visited ↔ wishlist)
- [ ] Returns 200 with updated pin object
- [ ] Returns 404 if pin doesn't exist
- [ ] Pin color updates immediately on map without page reload
- [ ] Toggle button visible in pin popup on map page

Priority: High
Sprint: 1 (backend) · 2 (frontend)
Estimated Time: 2-3 hours
Status: Not Started

---

### Story 8: Delete a Pin

As an authenticated user,
I want to delete a pin from my map,
So that I can remove places I no longer want to track.

Acceptance Criteria:

- [ ] `DELETE /api/pins/:id` accepts authenticated requests
- [ ] User can only delete their own pins — returns 403 otherwise
- [ ] Returns 404 if pin doesn't exist
- [ ] Returns 200 with success message on deletion
- [ ] Pin removed from map immediately without page reload
- [ ] Confirmation step before deletion
- [ ] Stats update immediately after pin is deleted

Priority: High
Sprint: 1 (backend) · 2 (frontend)
Estimated Time: 2 hours
Status: Not Started

---

## Group 3 — Frontend Pages

---

### Story 9: Map Page

As an authenticated user,
I want to see my full screen interactive map with all my pins,
So that I can visualise my travels at a glance.

Acceptance Criteria:

- [ ] Mapbox monochrome map renders full screen on `/map`
- [ ] Visited pins render as filled amber circles
- [ ] Wishlist pins render as hollow outlined circles
- [ ] Stats bar visible at top — countries, continents, total pins
- [ ] Search bar visible top left
- [ ] Map legend visible bottom right
- [ ] Copyright visible bottom left
- [ ] Hamburger opens drawer with nav, stats and personality teaser
- [ ] Clicking a pin opens popup with name, type, toggle and delete
- [ ] Map is pannable, zoomable and draggable
- [ ] Loading state shown while pins are fetching
- [ ] Empty state message shown if user has no pins yet

Priority: High
Sprint: 2
Estimated Time: 6-8 hours
Status: Not Started

---

### Story 10: Location Search

As an authenticated user,
I want to search for any city or country and drop a pin there,
So that I can quickly add places without manually finding them on the map.

Acceptance Criteria:

- [ ] Search bar visible on map page and onboarding
- [ ] Typing triggers Mapbox Geocoding API (debounced)
- [ ] Dropdown shows matching results with region label
- [ ] Selecting a result flies the map to that location
- [ ] User can choose visited or wishlist before confirming pin
- [ ] Pin saved to database and appears on map immediately
- [ ] Search clears after pin is dropped
- [ ] Same search component reused on onboarding

Priority: High
Sprint: 2
Estimated Time: 3-4 hours
Status: Not Started

---

### Story 11: Onboarding Flow

As a new user,
I want to be guided to add my first travel pins right after registering,
So that my map isn't empty when I first arrive.

Acceptance Criteria:

- [ ] Onboarding page shown automatically after registration
- [ ] Screen 1 shows popular country chips and nearby chips via geolocation
- [ ] Chips toggle selected state with amber highlight on tap
- [ ] Search bar available to find any country not in chips
- [ ] Progress bar shows step 1 of 2
- [ ] Next advances to screen 2, Skip goes directly to `/map`
- [ ] Screen 2 shows single search for dream destination
- [ ] Progress bar shows step 2 of 2
- [ ] Done saves all selections as pins and redirects to `/map`
- [ ] Skip on screen 2 goes to `/map` without saving screen 2 data

Priority: High
Sprint: 2
Estimated Time: 4-5 hours
Status: Not Started

---

### Story 12: Stats & Personality Page

As an authenticated user,
I want to see my travel stats and personality type,
So that I can understand my travel identity and share it.

Acceptance Criteria:

- [ ] Stats page accessible via drawer nav at `/stats`
- [ ] Personality type displayed in Playfair Display at top
- [ ] Personalized headline uses real countries and continents count
- [ ] 5 stat cards displayed — countries, continents, % of world, pins, top region
- [ ] All stats derived from pins — no separate API call needed
- [ ] Next destination card shows a curated unvisited country suggestion
- [ ] Regenerate button picks a new suggestion client-side
- [ ] Share section shows `/captured/:username` URL with copy button
- [ ] Copy button shows brief "Copied!" confirmation
- [ ] Stats update automatically when pins are added or deleted

Priority: High
Sprint: 3
Estimated Time: 3-4 hours
Status: Not Started

---

### Story 13: AtlasMe Captured Page

As a visitor,
I want to view someone's AtlasMe Captured profile without logging in,
So that I can see their travel identity and be inspired to join.

Acceptance Criteria:

- [ ] Page accessible at `/captured/:username` with no authentication
- [ ] Fetches from `GET /api/public/:username` on mount
- [ ] Mini map hero renders user's pins on dark monochrome background
- [ ] Personality type and personalized headline displayed
- [ ] 5 stat cards rendered from API response
- [ ] "Map your travels on AtlasMe" CTA links to `/`
- [ ] Loading state shown while data fetches
- [ ] Invalid username redirects to 404 page
- [ ] Page is fully read only — no editing possible

Priority: High
Sprint: 3
Estimated Time: 3-4 hours
Status: Not Started

---

### Story 14: Logout

As an authenticated user,
I want to log out of AtlasMe,
So that my account is secure when I'm done.

Acceptance Criteria:

- [ ] Logout button visible in drawer
- [ ] Clicking logout removes token from localStorage
- [ ] AuthContext cleared on logout
- [ ] PinsContext cleared on logout
- [ ] User redirected to `/` after logout
- [ ] Protected routes immediately inaccessible after logout

Priority: Medium
Sprint: 3
Estimated Time: 1 hour
Status: Not Started

---

## Group 4 — AtlasMe Custom Features

---

### Story 15: Travel Personality Engine

As an authenticated user,
I want to be assigned a travel personality type based on my pins,
So that I get a meaningful identity that reflects how I travel.

Acceptance Criteria:

- [ ] Personality type derived from countries visited and continents count
- [ ] Five types implemented with defined rules:
  - 0–2 countries → The Homebody
  - 3–5 countries → The Wanderer
  - 6–10 countries or 2+ continents → The Adventurer
  - 11–20 countries or 3+ continents → The Explorer
  - 20+ countries or 4+ continents → The Globetrotter
- [ ] Personality updates automatically when pins are added or deleted
- [ ] Personalized headline uses real numbers from pin data
- [ ] Displayed on Stats page and as teaser in drawer
- [ ] Same logic reused on Captured page via public API response

Priority: High
Sprint: 3
Estimated Time: 2 hours
Status: Not Started

---

### Story 16: Next Destination Generator

As an authenticated user,
I want to be suggested an inspiring destination I haven't visited yet,
So that I can discover new places to add to my wishlist.

Acceptance Criteria:

- [ ] Next destination card displayed on Stats page
- [ ] Suggestion drawn from curated list of ~50 popular destinations first
- [ ] Filters out countries already in user's visited or wishlist pins
- [ ] If all popular destinations visited → falls back to full 195 country list
- [ ] If all countries visited → shows a fun congratulatory message
- [ ] Country name and region displayed on card
- [ ] Regenerate button picks a new suggestion client-side
- [ ] No extra API call on regenerate — all logic frontend
- [ ] Curated list and full country list hardcoded as constants

Priority: Medium
Sprint: 3
Estimated Time: 2 hours
Status: Not Started

---

### Story 17: Public Profile API

As the system,
I want to serve a public endpoint for each user's Captured profile,
So that anyone can view a user's travel identity without logging in.

Acceptance Criteria:

- [ ] `GET /api/public/:username` requires no authentication
- [ ] Returns username, visited pins, wishlist pins
- [ ] Derived stats computed server-side — countries, continents, % of world, total pins, top region
- [ ] Personality type computed server-side and returned
- [ ] Returns 404 if username not found
- [ ] Returns only non-sensitive data — no email, no password hash, no JWT
- [ ] Response is read only — no mutations possible on this route

Priority: High
Sprint: 1
Estimated Time: 2 hours
Status: Not Started

---

### Story 18: Captured Public Profile Page

As a visitor viewing someone's Captured profile,
I want to see a shareable travel identity card,
So that I'm inspired by their travels and motivated to join AtlasMe.

Acceptance Criteria:

- [ ] Page fetches from `GET /api/public/:username` on mount
- [ ] Mini map hero renders user's pins on dark monochrome background
- [ ] Personality type displayed in Playfair Display
- [ ] Personalized headline uses fetched countries and continents count
- [ ] 5 stat cards rendered from API response
- [ ] "Map your travels on AtlasMe" CTA links to `/`
- [ ] Loading state shown while data fetches
- [ ] Invalid username shows 404 page
- [ ] No auth required — fully public

Priority: High
Sprint: 3
Estimated Time: 3 hours
Status: Not Started

---

## Story Status Tracker

| Story | Title                        | Sprint | Est. Time   | Status      |
| ----- | ---------------------------- | ------ | ----------- | ----------- |
| 0     | Connect Database             | 1      | 0.5 hrs     | Not Started |
| 1     | User Registration            | 1+2    | 3-4 hrs     | Not Started |
| 2     | User Login                   | 1+2    | 3-4 hrs     | Not Started |
| 3     | Protected Routes (Backend)   | 1      | 2-3 hrs     | Not Started |
| 4     | Protected Routes (Frontend)  | 2      | 2 hrs       | Not Started |
| 5     | Add a Pin                    | 1+2    | 3-4 hrs     | Not Started |
| 6     | Load Pins                    | 1+2    | 2-3 hrs     | Not Started |
| 7     | Toggle Pin Type              | 1+2    | 2-3 hrs     | Not Started |
| 8     | Delete a Pin                 | 1+2    | 2 hrs       | Not Started |
| 9     | Map Page                     | 2      | 6-8 hrs     | Not Started |
| 10    | Location Search              | 2      | 3-4 hrs     | Not Started |
| 11    | Onboarding Flow              | 2      | 4-5 hrs     | Not Started |
| 12    | Stats & Personality Page     | 3      | 3-4 hrs     | Not Started |
| 13    | AtlasMe Captured Page        | 3      | 3-4 hrs     | Not Started |
| 14    | Logout                       | 3      | 1 hr        | Not Started |
| 15    | Travel Personality Engine    | 3      | 2 hrs       | Not Started |
| 16    | Next Destination Generator   | 3      | 2 hrs       | Not Started |
| 17    | Public Profile API           | 1      | 2 hrs       | Not Started |
| 18    | Captured Public Profile Page | 3      | 3 hrs       | Not Started |
|       | **Total**                    |        | **~50 hrs** |             |

---

## Sprint Breakdown

### Sprint 1 — Week 1: Backend Foundation (~18 hours)

**Goal:** Working API, database connected, all endpoints built and tested.
**Deploy:** Set up Render + NeonDB early this week.

- [ ] Story 0 — Connect database (0.5 hrs)
- [ ] Story 1 — Registration backend (2 hrs)
- [ ] Story 2 — Login backend (2 hrs)
- [ ] Story 3 — Auth middleware (2-3 hrs)
- [ ] Story 5 — Add pin endpoint (2 hrs)
- [ ] Story 6 — Load pins endpoint (1 hr)
- [ ] Story 7 — Toggle pin type endpoint (1 hr)
- [ ] Story 8 — Delete pin endpoint (1 hr)
- [ ] Story 17 — Public profile API (2 hrs)
- [ ] Mapbox — Get map rendering, basic pan/zoom working (3 hrs)

---

### Sprint 2 — Week 2: Frontend + Integration (~18 hours)

**Goal:** Full working app — auth, map, pins, search, onboarding.
**Deploy:** Push frontend to Render, verify full stack works in production.

- [ ] Story 4 — Protected routes frontend (2 hrs)
- [ ] Story 1 — Registration frontend (1-2 hrs)
- [ ] Story 2 — Login frontend (1-2 hrs)
- [ ] Story 9 — Map page (6-8 hrs)
- [ ] Story 10 — Location search (3-4 hrs)
- [ ] Story 11 — Onboarding flow (4-5 hrs)
- [ ] Story 6 — Load + display pins (included in story 9)

---

### Sprint 3 — Week 3: Custom Features + Polish (~14 hours)

**Goal:** Personality engine, stats page, captured page, mobile responsiveness, deployment verified.

- [ ] Story 12 — Stats & personality page (3-4 hrs)
- [ ] Story 13 — Captured page (3-4 hrs)
- [ ] Story 14 — Logout (1 hr)
- [ ] Story 15 — Personality engine (2 hrs)
- [ ] Story 16 — Next destination generator (2 hrs)
- [ ] Story 18 — Captured public profile page (3 hrs)
- [ ] Mobile responsiveness + UI polish (remaining time)

---

### Week 4 — Buffer

**Use if:** Mapbox took longer than expected, stories spilled over, or nice-to-haves worth adding.

Nice-to-haves to tackle if time allows:

- Dark mode toggle
- Shareable social media card (AtlasMe Captured card)
- Edit pin notes / visit date
- Filter map by visited vs wishlist
- httpOnly cookie (upgrade from localStorage)
- Custom pin icons

---

## Deployment Plan

| When            | Action                                               |
| --------------- | ---------------------------------------------------- |
| Week 1, Day 2-3 | Set up NeonDB (PostgreSQL), connect to backend       |
| Week 1, Day 4-5 | Deploy Express backend to Render                     |
| Week 2, Day 2-3 | Deploy React frontend to Render                      |
| Week 2 onwards  | Push to main regularly — keep production working     |
| Week 3          | Final deployment check, README screenshots, live URL |

> Deploy early. A broken production app at the end is worse than a working one that's missing a feature.

---

_AtlasMe User Stories — last updated pre-sprint 1_
