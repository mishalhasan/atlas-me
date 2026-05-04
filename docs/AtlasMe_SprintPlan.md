# AtlasMe — Sprint Plan & Daily Targets

**Philosophy:** Push hard weeks 1-2. Week 3 is polish, not core features.
**Daily target:** 6-8 hours. Up to 12 on debugging days.
**Risk:** Work may start week 3 — core app must be done by end of week 2.
**Fallback:** 2 additional weeks post-bootcamp if needed.

---

## Timeline Overview

| Week | Sprint | Goal | End State |
|------|--------|------|-----------|
| Week 1 | Planning + Sprint 1 | Planning done · Backend + Map foundation | Repo set up · Backend running · Map renders · Auth working |
| Week 2 | Sprint 1 complete + Sprint 2 | Full feature complete | Working app end to end |
| Week 3 | Polish + Deploy | Submission ready | Live URL · README · Demo video |
| Week 4 | Buffer | Only if needed | — |

---

## Sprint 1 — "You can log in and see your map"

**Goal by end of sprint:** User can register, log in, see their Mapbox map, and have pins persist in the database.
**Stories covered:** 0, 1BE, 2BE, 3, 4, 5BE, 6BE, 7BE, 8BE, 17

---

### Week 1 — Remaining Days

---

#### Today — Finish Planning Chores
**Goal:** All planning docs done, ready to code tomorrow.

- [ ] Chore 08: User stories — complete ✓
- [ ] Chore 09: Database schema — complete ✓
- [ ] Chore 10: Sprint planning — this document
- [ ] Chore 11: GitHub repository set up
  - Create repo with `client/` and `server/` folders
  - Add `.gitignore` (node_modules, .env)
  - Add `.env.example`
  - Initial commit

---

#### Day 1 — Project Setup + Backend Scaffold
**Goal:** Both client and server running locally. Database connected.
**Est:** 4-6 hours

- [ ] Chore 12: Initialize React frontend
  - `npm create vite@latest client -- --template react`
  - Install Tailwind CSS
  - Install shadcn/ui — run init, configure CSS variables
  - Install Lucide React
  - Add amber + indigo color tokens to `globals.css`
  - Confirm app runs on `localhost:5173`
- [ ] Chore 13: Initialize Express backend
  - `npm init` in `server/`
  - Install Express, Sequelize, pg, bcrypt, jsonwebtoken, dotenv, cors, helmet
  - Install express-rate-limit
  - Basic `server.js` with health check route `GET /api/health`
  - Confirm server runs on `localhost:5000`
- [ ] Story 0: Connect database
  - Set up Supabase project, copy connection string
  - Configure Sequelize with DATABASE_URL from `.env`
  - Confirm connection on server start
  - Deploy backend to Render (early deployment — don't leave this to week 3)

**End of day check:** `GET /api/health` returns 200. Database connected. Frontend renders React default page.

---

#### Day 2 — Auth Backend
**Goal:** Register and login endpoints working and tested in Postman.
**Est:** 6-8 hours

- [ ] Story 1BE: User Registration backend
  - Create User model (Sequelize)
  - `POST /api/auth/register` — validate, hash password, save user, return JWT
  - bcrypt hook on User model
  - Duplicate email/username error handling
- [ ] Story 2BE: User Login backend
  - `POST /api/auth/login` — validate credentials, compare bcrypt, return JWT
  - Invalid credentials error handling
- [ ] Story 3: Auth middleware
  - `authMiddleware.js` — verify JWT, attach user to req
  - 401 if missing or invalid token
  - 403 if wrong user
- [ ] Test all auth endpoints in Postman before moving on

**End of day check:** Can register a user, log in, get a JWT back. Middleware blocks requests without token.

---

#### Day 3 — Pin Endpoints + Public API
**Goal:** All pin CRUD endpoints working. Public profile endpoint working.
**Est:** 6-8 hours

- [ ] Create Pin model (Sequelize)
  - All fields — id, userId, name, latitude, longitude, type, countryCode, continent, region
  - Associations — User hasMany Pins, Pin belongsTo User
  - `sync({ alter: true })` on server start
- [ ] Story 5BE: `POST /api/pins` — create pin
- [ ] Story 6BE: `GET /api/pins` — load user's pins
- [ ] Story 7BE: `PUT /api/pins/:id` — toggle pin type
- [ ] Story 8BE: `DELETE /api/pins/:id` — delete pin
- [ ] Story 17: `GET /api/public/:username` — public profile
  - Returns pins, derived stats, personality type
  - No auth middleware
  - 404 if username not found
- [ ] Test all endpoints in Postman

**End of day check:** Full CRUD working on pins. Public endpoint returns correct data. All routes return correct status codes.

---

#### Day 4 — Mapbox Foundation
**Goal:** Mapbox map renders in React. Mercator projection. Monochrome style.
**Est:** 6-8 hours (biggest unknown — may spill to day 5)

- [ ] Install `react-map-gl` and `mapbox-gl`
- [ ] Add Mapbox token to `.env`
- [ ] Map renders full screen on `/map` route
  - Mercator projection
  - Monochrome style URL from Styles Lab
  - Pan, zoom, drag working
  - Initial center `[0, 20]`, zoom `1.5`
  - Min zoom `1`, max zoom `18`
- [ ] Custom HTML markers working
  - Visited — amber filled circle
  - Wishlist — hollow outlined circle
- [ ] Test with hardcoded dummy pins first
- [ ] Basic React Router setup — all 6 routes defined

**End of day check:** Map renders. Can see the world. Dummy pins show in correct colours. App has all routes defined.

---

#### Day 5 — Auth Frontend + Protected Routes
**Goal:** Register, login, logout working in the UI. Map page protected.
**Est:** 6-8 hours

- [ ] AuthContext — token, user, login(), logout()
- [ ] PinsContext — visited[], wishlist[], addPin(), deletePin(), updatePin()
- [ ] Story 4: ProtectedRoute component
- [ ] Story 1FE: Register form
  - Form validation client-side
  - Calls `POST /api/auth/register`
  - On success → `/onboarding`
- [ ] Story 2FE: Login form
  - Calls `POST /api/auth/login`
  - On success → `/map`
  - Token stored in localStorage
- [ ] Story 14: Logout button in drawer
  - Clears token and context
  - Redirects to `/`
- [ ] Login/Register page — dark background, white card, toggle

**End of day check:** Can register, log in, see map, log out. Unauthenticated users redirected to `/`. Token persists on refresh.

---

#### Day 6 (Weekend) — Sprint 1 Integration + Buffer
**Goal:** Full Sprint 1 working end to end. Fix anything broken.
**Est:** 4-6 hours

- [ ] Load real pins from database on map page
  - `GET /api/pins` called on map mount
  - Pins render as correct marker types
  - PinsContext populated
- [ ] Stats bar derives from PinsContext
  - Countries, continents, total pins
- [ ] Fix any auth/routing bugs from day 5
- [ ] Push to GitHub, verify deployed backend still works
- [ ] Deploy frontend to Render

**End of day check:** Full Sprint 1 done. Can register → log in → see real map with pins loading from DB → log out. Deployed and accessible via live URL.

---

## Sprint 2 — "The full app works"

**Goal by end of sprint:** All core features complete. Search, pins, onboarding, stats, personality, public profile all working.
**Stories covered:** 9, 10, 11, 12, 13, 15, 16, 18

---

### Week 2

---

#### Day 7 — Search + Add Pins
**Goal:** User can search a location and drop a pin on the map.
**Est:** 6-8 hours

- [ ] Story 10: SearchBar component
  - Mapbox Geocoding API integration
  - Debounced input
  - Dropdown results with region label
  - Install `countries-and-timezones` for continent lookup
  - On select → fly map to location
- [ ] Pin type selector — visited or wishlist before confirming
- [ ] Call `POST /api/pins` on confirm
  - Map Mapbox response to pin fields
  - countryCode from `short_code`
  - continent from ISO lookup
- [ ] Pin appears on map immediately (optimistic update)
- [ ] Search clears after pin dropped

**End of day check:** Can search "Tokyo", select it, choose visited, see amber pin on map, pin saved to database.

---

#### Day 8 — Pin Interactions
**Goal:** Pin popup working. Delete and toggle working.
**Est:** 4-6 hours

- [ ] Pin popup on click
  - Pin name, type label
  - Toggle type button → calls `PUT /api/pins/:id`
  - Delete button with confirmation → calls `DELETE /api/pins/:id`
- [ ] Pin updates immediately on map after toggle
- [ ] Pin removed from map immediately after delete
- [ ] Stats bar updates after add/delete/toggle
- [ ] Map legend — bottom right, visited count + wishlist count

**End of day check:** Can click any pin, see popup, toggle its type, delete it. Stats bar reflects changes instantly.

---

#### Day 9 — Onboarding Flow
**Goal:** Full onboarding working after register.
**Est:** 6-8 hours

- [ ] Story 11: Onboarding page
  - Screen 1 — popular chips + nearby chips (geolocation API)
  - Chip toggle selected state
  - Reuse SearchBar component
  - Progress bar (2 steps)
  - Next / Skip buttons
  - Screen 2 — dream destination search
  - Done → save all as pins → `/map`
  - Skip → `/map`
- [ ] Onboarding pins use same `POST /api/pins` endpoint
- [ ] Map is not empty after onboarding

**End of day check:** Full register → onboarding → map flow working. Pins from onboarding visible on map.

---

#### Day 10 — Stats & Personality Page
**Goal:** Stats page complete with personality type and next destination.
**Est:** 6-8 hours

- [ ] Story 12: Stats page at `/stats`
  - Story 15: Personality engine
    - Rule-based logic from PinsContext
    - 5 personality types
    - Personalized headline
  - 5 stat cards — all derived
  - Story 16: Next destination generator
    - Curated list of ~50 popular destinations
    - Filter out visited + wishlist
    - Fallback to full 195 country list
    - Regenerate button
  - Share section — copy `/captured/:username` URL
- [ ] Drawer nav links to stats page
- [ ] Stats update when pins change

**End of day check:** Stats page shows correct personality type, all 5 stats, working regenerate button, copy link works.

---

#### Day 11 — AtlasMe Captured Page
**Goal:** Public profile page complete and shareable.
**Est:** 6-8 hours

- [ ] Story 13 + 18: Captured page at `/captured/:username`
  - Fetches from `GET /api/public/:username`
  - Mini map hero — SVG placeholder with user's pins
  - Personality type + personalized headline
  - 5 stat cards
  - Join AtlasMe CTA
  - Loading state
  - 404 if username not found
- [ ] Share URL from stats page navigates to correct captured page
- [ ] Page works without login

**End of day check:** Can visit `/captured/username` without being logged in and see full profile. Share link from stats page works.

---

#### Day 12 — Drawer + Full Navigation
**Goal:** Drawer fully working. All navigation connected.
**Est:** 4-6 hours

- [ ] Drawer slides in from right on hamburger tap
- [ ] Overlay dims map, click outside closes
- [ ] Nav links — Map, Stats, Captured all work
- [ ] Stats summary in drawer — derives from PinsContext
- [ ] Personality teaser in drawer
- [ ] Logout in drawer
- [ ] All pages reachable from drawer
- [ ] Active nav state in amber

**End of day check:** Full app navigable. Every page reachable. Drawer opens and closes smoothly.

---

#### Day 13 (Weekend) — Sprint 2 Integration + Buffer
**Goal:** Full app working end to end. Fix bugs. Push to production.
**Est:** 6-8 hours

- [ ] Full end-to-end test
  - Register → onboarding → map → add pins → stats → captured → share → logout → login → pins still there
- [ ] Fix any integration bugs
- [ ] Verify deployed app works in production
- [ ] Push final sprint 2 code to GitHub

**End of day check:** Complete working app deployed. All stories done or nearly done.

---

## Week 3 — Polish + Submission

> **Note:** Work may start this week. Treat each day as a bonus.
> Core app should already be done. This week is about presentation quality.

---

#### Day 14 — Mobile Responsiveness
- [ ] Map page — search, legend, stats bar scale on mobile
- [ ] Drawer full width on mobile
- [ ] Stats page — card grid stacks on mobile
- [ ] Captured page — card fits mobile viewport
- [ ] Login/onboarding — cards fit small screens

---

#### Day 15 — UI Polish
- [ ] Loading states on all async operations
- [ ] Error messages display correctly
- [ ] Empty state on map — "Search a city to drop your first pin"
- [ ] Smooth transitions — drawer slide, pin popup
- [ ] Typography pass — Playfair Display on all hero text
- [ ] Spacing and alignment pass

---

#### Day 16 — README + Screenshots
- [ ] README.md with all required sections
  - Project description
  - Tech stack
  - Installation instructions
  - Environment variables
  - Features list
  - At least 3 screenshots
  - Live URL
- [ ] `.env.example` file committed
- [ ] Screenshots taken of all key pages

---

#### Day 17 — Demo Video + Final Deploy
- [ ] Record 3-5 minute demo video
  - Overview of what AtlasMe does
  - Register + onboarding flow
  - Add pins on map
  - Stats + personality type
  - Captured public profile
  - Share link
- [ ] Upload to Loom or YouTube
- [ ] Final production deployment check
- [ ] Submit to #project-showcase

---

#### Day 18 (Weekend) — Nice-to-Haves Buffer
Only if all above is done:
- [ ] Dark mode toggle
- [ ] Pin notes / visit date (edit pin)
- [ ] Filter map — visited vs wishlist only
- [ ] Shareable social media card
- [ ] httpOnly cookie upgrade

---

## Week 4 — True Buffer

Only use if week 3 was disrupted by work starting.
Pick up wherever week 3 left off.

---

## Story → Sprint Assignment

| Story | Title | Sprint | Week | Day |
|-------|-------|--------|------|-----|
| 0 | Connect Database | 1 | 1 | Day 1 |
| 1BE | Registration backend | 1 | 1 | Day 2 |
| 2BE | Login backend | 1 | 1 | Day 2 |
| 3 | Auth middleware | 1 | 1 | Day 2 |
| 5BE | Add pin endpoint | 1 | 1 | Day 3 |
| 6BE | Load pins endpoint | 1 | 1 | Day 3 |
| 7BE | Toggle pin endpoint | 1 | 1 | Day 3 |
| 8BE | Delete pin endpoint | 1 | 1 | Day 3 |
| 17 | Public profile API | 1 | 1 | Day 3 |
| 4 | Protected routes frontend | 1 | 1 | Day 5 |
| 1FE | Registration frontend | 1 | 1 | Day 5 |
| 2FE | Login frontend | 1 | 1 | Day 5 |
| 14 | Logout | 1 | 1 | Day 5 |
| 9 | Map page | 1 | 1 | Day 4-6 |
| 10 | Location search | 2 | 2 | Day 7 |
| 5FE | Add pin frontend | 2 | 2 | Day 7 |
| 6FE | Load + display pins | 2 | 2 | Day 6-7 |
| 7FE | Toggle pin frontend | 2 | 2 | Day 8 |
| 8FE | Delete pin frontend | 2 | 2 | Day 8 |
| 11 | Onboarding flow | 2 | 2 | Day 9 |
| 12 | Stats page | 2 | 2 | Day 10 |
| 15 | Personality engine | 2 | 2 | Day 10 |
| 16 | Next destination | 2 | 2 | Day 10 |
| 13 | Captured page | 2 | 2 | Day 11 |
| 18 | Captured public page | 2 | 2 | Day 11 |

---

## Daily Check-In Questions

Ask yourself at the end of every day:

1. Did I hit today's end of day check?
2. If not — what blocked me and how long did it take?
3. Do I need to adjust tomorrow's targets?
4. Have I committed and pushed to GitHub?

> If you miss a day's target, don't try to catch up by doubling the next day.
> Adjust the plan, keep moving forward.

---

*AtlasMe Sprint Plan — living document, update as you go*
