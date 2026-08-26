# AUTH & PERMISSIONS REFERENCE

Quick reference for everything authentication and role-based access in CollabBoard.
Written for Milestone 2. Update this file as Milestone 3 wires the real database.

---

## Table of Contents

1. [Backend Endpoints](#1-backend-endpoints)
2. [JWT & Token Storage](#2-jwt--token-storage)
3. [Role System](#3-role-system)
4. [Frontend Auth Layer](#4-frontend-auth-layer)
5. [Route Protection](#5-route-protection)
6. [Permission Hook](#6-permission-hook)
7. [What Is Still Mock Data](#7-what-is-still-mock-data)
8. [Milestone 3 TODO](#8-milestone-3-todo)

---

## 1. Backend Endpoints

**Base URL:** `http://localhost:5001/api`

| Method | Route | Auth | Body | Returns |
|--------|-------|------|------|---------|
| `POST` | `/auth/register` | Public | `{ name, email, password, role }` | `{ token, user }` |
| `POST` | `/auth/login` | Public | `{ email, password }` | `{ token, user }` |
| `GET` | `/auth/me` | Bearer token | — | `{ user }` |

### Request example — Register
```json
POST /api/auth/register
{
  "name": "Jane Smith",
  "email": "jane@company.com",
  "password": "secret123",
  "role": "manager"
}
```

### Response shape
```json
{
  "token": "<jwt>",
  "user": {
    "id": 1,
    "name": "Jane Smith",
    "email": "jane@company.com",
    "role": "manager",
    "createdAt": "2026-08-26T10:00:00.000Z"
  }
}
```

### Error shape
```json
{ "error": "Human-readable message here." }
```

### Backend validation rules
- `name`, `email`, `password` — all required on register
- `password` — minimum 6 characters
- Duplicate `email` → 409 Conflict
- Wrong credentials on login → 401 (same message for email or password to prevent enumeration)
- Missing / expired / invalid JWT on protected routes → 401

---

## 2. JWT & Token Storage

| Key | Storage | Value |
|-----|---------|-------|
| `collabboard-token` | `localStorage` | Raw JWT string |
| `collabboard-user` | `localStorage` | JSON-stringified user object |

Token expiry is controlled by `JWT_EXPIRES_IN` in `collabboard-backend/.env` (default: `7d`).

To generate a secure `JWT_SECRET`:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

To inspect a token's payload (browser console):
```js
JSON.parse(atob(localStorage.getItem('collabboard-token').split('.')[1]))
```

---

## 3. Role System

Three roles. Chosen at registration — not changeable from the UI yet.

| Role value | Display name | Who uses it |
|------------|--------------|-------------|
| `admin` | Admin | Full system access, user management |
| `manager` | Manager | Can create and edit projects/tasks |
| `member` | User | View-only access to projects/tasks |

### Permission matrix

| Action | `admin` | `manager` | `member` |
|--------|---------|-----------|---------|
| View dashboard / tasks / kanban | ✅ | ✅ | ✅ |
| Create tasks / kanban cards | ✅ | ✅ | ❌ |
| Edit tasks / kanban cards | ✅ | ✅ | ❌ |
| Move kanban cards | ✅ | ✅ | ❌ |
| Duplicate kanban cards | ✅ | ✅ | ❌ |
| Delete tasks / kanban cards | ✅ | ❌ | ❌ |
| Access Team Management (`/profiles/admin`) | ✅ | ❌ | ❌ |
| Edit own profile | ✅ | ✅ | ✅ |
| Invite / remove users | ✅ | ❌ | ❌ |
| See "Team" link in Sidebar | ✅ | ❌ | ❌ |

### Profile routing by role

| Role | `/profile` renders | Direct URL allowed |
|------|-------------------|--------------------|
| `admin` | `AdminProfile` | `/profiles/admin` only |
| `manager` | `PMProfile` | `/profiles/admin` + `/profiles/project-manager` |
| `member` | `UserProfile` | All `/profiles/*` (view only) |

Wrong-role direct URL access bounces to `/profile`.

---

## 4. Frontend Auth Layer

### Files

```
client/src/
├── services/authService.js       # fetch wrapper for /api/auth/*
├── context/AuthContext.jsx        # React context — login, register, logout, user state
└── hooks/usePermission.js         # Role-based permission flags
```

### `authService.js`
Thin fetch wrapper. Reads `VITE_API_URL` from `client/.env` (default: `http://localhost:5001/api`).
Throws `Error` with the backend message on non-2xx. Throws a readable message on network failure.

```js
import { authService } from '../services/authService';

const { token, user } = await authService.login({ email, password });
const { token, user } = await authService.register({ name, email, password, role });
const { user }        = await authService.getMe(token);
```

### `AuthContext.jsx`

Wrap your tree with `<AuthProvider>`. Access state with `useAuth()`.

```jsx
import { useAuth } from '../context/AuthContext';

const { user, token, loading, isAuthenticated, login, register, logout } = useAuth();
```

| Value | Type | Description |
|-------|------|-------------|
| `user` | `object \| null` | `{ id, name, email, role, createdAt }` |
| `token` | `string \| null` | Raw JWT |
| `loading` | `boolean` | True while login/register request is in-flight |
| `isAuthenticated` | `boolean` | `!!token` |
| `login(email, password)` | `async fn` | Calls API, persists token+user, throws on error |
| `register(name, email, password, role)` | `async fn` | Same as login |
| `logout()` | `fn` | Clears localStorage, resets state |

---

## 5. Route Protection

All route guards live in `client/src/routes/AppRoutes.jsx`.

### `<ProtectedRoute>`
Redirects to `/login` if the user is not authenticated.
Applied to every workspace page.

### `<GuestRoute>`
Redirects to `/dashboard` if the user is already logged in.
Applied to `/login` and `/register`.

### `<RoleRoute allowed={[...roles]}>`
Redirects to `/profile` if `user.role` is not in the `allowed` array.
Used on direct profile URLs to prevent wrong-role access.

```jsx
// Only admin can reach /profiles/admin
<RoleRoute allowed={['admin']}>
  <AdminProfile />
</RoleRoute>
```

`RoleRoute` is exported from `client/src/components/routing/RoleBasedProfile.jsx`.

### `/profile` — role-aware entry point
Always redirect users here. `RoleBasedProfile` reads `user.role` and renders the correct component.

```
/profile → admin   → <AdminProfile />
/profile → manager → <PMProfile />
/profile → member  → <UserProfile />
```

---

## 6. Permission Hook

```js
import { usePermission } from '../hooks/usePermission';

const { canEdit, canCreate, canDelete, isAdmin, isManager, isMember, role } = usePermission();
```

| Flag | `admin` | `manager` | `member` |
|------|---------|-----------|---------|
| `canCreate` | `true` | `true` | `false` |
| `canEdit` | `true` | `true` | `false` |
| `canDelete` | `true` | `false` | `false` |
| `isAdmin` | `true` | `false` | `false` |
| `isManager` | `false` | `true` | `false` |
| `isMember` | `false` | `false` | `true` |

### Usage examples

```jsx
// Hide a button for view-only users
const { canEdit } = usePermission();
{canEdit && <button>Edit Task</button>}

// Restrict the kanban context menu
<KanbanBoard onCardContextMenu={canEdit ? openContextMenu : null} />

// Show delete only for admin
<TaskContextMenu onDelete={canDelete ? handleDelete : null} />

// Pass read-only flag to a modal
<TaskModal isReadOnly={!canEdit} />
```

---

## 7. What Is Still Mock Data

These are **not** connected to the real backend yet. They will be replaced in Milestone 3.

| Data | Location | Status |
|------|----------|--------|
| Dashboard stats (projects, tasks counts) | `features/dashboard/data/mockDashboardData.js` | Mock |
| Dashboard activity feed | same file | Mock |
| Kanban tasks & board | `features/projects/kanban/services/kanbanApi.js` | In-memory |
| Tasks list & columns | `lib/dataStore.jsx` | In-memory |
| Profile stats (active projects, tasks completed, etc.) | `mockAdminData.js`, `mockPMData.js`, `features/users/mockData.js` | Mock |
| Activity tabs in all profiles | same files | Mock |
| Team list in AdminProfile | `mockAdminData.js → adminUsers` | Mock |
| Notification / permission toggles in Settings tabs | all three profile settings | Local state only |
| Profile fields: phone, jobTitle, bio, department, location | all three profiles | Starts empty — user can fill in, but not persisted |

**Real data (connected to backend):**

| Data | Source |
|------|--------|
| User name | `AuthContext.user.name` (from JWT) |
| User email | `AuthContext.user.email` (from JWT) |
| User role | `AuthContext.user.role` (from JWT) |
| Username | Derived as `email.split('@')[0]` |

---

## 8. Milestone 3 TODO

Things to implement when the real database (MongoDB/Mongoose) is added:

- [ ] Replace in-memory `UserStore` (`models/User.js`) with a Mongoose `User` model
- [ ] Add `phone`, `jobTitle`, `department`, `timezone`, `bio`, `location`, `avatarUrl` fields to the User schema
- [ ] Add `PATCH /api/auth/profile` endpoint to save profile edits
- [ ] Wire profile save buttons to `PATCH /api/auth/profile` instead of local state
- [ ] Replace `GET /api/auth/me` response with full profile fields
- [ ] Add board and task models with owner/member relationships
- [ ] Replace in-memory kanban service with real `GET/POST/PATCH/DELETE /api/tasks` calls
- [ ] Replace mock dashboard stats with real aggregation queries
- [ ] Add refresh token or session persistence strategy (current token is valid for 7 days)
- [ ] Add role-change endpoint (admin only) to update a user's role
- [ ] Hash comparison timing-safe check (already using bcrypt — confirm `bcrypt.compare` is used everywhere)
