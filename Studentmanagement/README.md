# Student Exam Management (React + Vite + Redux + JSON Server)

A CRUD dashboard for tracking student exam records — matches the "Student's
Name / Subject / Marks Scored / Type of Exam" layout, with a teacher profile
header, stats, tabs (All / Class Exam / Online Exam / Missed Exam), search,
sort, and simple sign-in.

## 1. Install dependencies

```bash
npm install
```

## 2. Run the backend (JSON Server)

This project uses `json-server` to simulate a REST API from `db.json`.

```bash
npm run server
```

This starts the API at `http://localhost:5000` with a `/students` and
`/users` resource.

## 3. Run the Vite dev server (in a second terminal)

```bash
npm run dev
```

Opens at `http://localhost:3000`.

## 4. Sign in

Use the pre-filled demo credentials on the Sign In page:
- Email: `teacher@orchids.com`
- Password: `password123`

You must be signed in to add, edit, or delete records (see `PrivateRoute`).
Viewing the list is public.

## Project structure

```
index.html               → Vite entry HTML, loads /src/main.jsx as a module
vite.config.js            → Vite + @vitejs/plugin-react config
src/
  main.jsx                → ReactDOM root + Redux Provider (was index.js)
  App.jsx                  → react-router routes (was App.js)
  components/
    Navbar.jsx             → top navigation, shows auth state
    Login.jsx               → sign-in form (checks against db.json "users")
    PrivateRoute.jsx         → route guard for add/edit
    StudentList.jsx          → main dashboard: header, filters, tabs, table
    StudentDetails.jsx       → single table row with Edit/Delete
    StudentForm.jsx          → shared Add + Edit form
  redux/
    store.js
    actions/
      studentActions.js      → fetch/add/update/delete thunks (CRUD against API)
      authActions.js          → login/logout thunks
    reducers/
      studentReducer.js
      authReducer.js
      index.js                 → combineReducers
db.json                    → json-server seed data (6 sample records)
```

## What changed from the Create React App version

- Component files that use JSX are named `.jsx` (`App.jsx`, `main.jsx`,
  everything in `components/`) — Vite's default esbuild config expects
  this for `.js` files not to contain JSX.
- `index.html` now lives at the project root (not `public/`) and loads
  the app itself via `<script type="module" src="/src/main.jsx">`, which
  is how Vite bootstraps instead of `react-scripts`.
- `vite.config.js` replaces CRA's hidden webpack config; the dev server
  is set to port 3000 to match the original CRA default.
- `npm start` → `npm run dev`; `npm run build` still works the same way
  but now outputs to `dist/` instead of `build/`.
- Bootstrap CSS is imported from `node_modules` in `main.jsx` (unchanged);
  Font Awesome is still pulled from a CDN in `index.html` since it isn't
  an npm dependency here.
- No other logic changed — Redux store/actions/reducers, the JSON Server
  backend, and every component's behavior are identical to the CRA
  version.

## Features implemented against the rubric

- **Redux store, actions, reducers, thunks** — `redux/` folder, async
  thunks for every network call.
- **JSON Server backend** — `db.json` + `npm run server`, full REST CRUD
  on `/students`.
- **Fetch & display** — `fetchStudents` thunk dispatched from
  `StudentList` on mount.
- **Add student** — `StudentForm` (create mode) → `addStudent` thunk →
  POST.
- **Update student** — `StudentForm` (edit mode, `/edit/:id`) →
  `updateStudent` thunk → PATCH.
- **Delete student** — `StudentDetails` → `deleteStudent` thunk →
  DELETE, with a confirm prompt.
- **Sorting & filtering** — sort by name/marks and filter by subject or
  exam-type tab, plus a live name search, all in `StudentList`.
- **Authentication** — `Login.jsx` + `authReducer` + `localStorage`
  persistence + `PrivateRoute` guarding `/add` and `/edit/:id`.
- **Navbar** — responsive Bootstrap navbar with conditional links based
  on auth state.
- **Bootstrap styling** — Bootstrap 5 (npm package) plus utility classes
  throughout, with the purple theme matched to the reference dashboard.

## Notes for presenting/submitting

- If you want more seed rows to match "150 students / 84 exams" exactly,
  just add more objects to the `students` array in `db.json` — the UI's
  stat counters are computed live from whatever is in there.
- The `image` field accepts any URL; leave it blank when adding a
  student and a generated avatar (ui-avatars.com) is used automatically.
