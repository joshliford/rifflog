# Rifflog

A personal guitar practice journal for logging recordings, tracking gear, and documenting sessions. Visitors can browse all recordings and the rig page publicly. Only the admin (Josh) can upload, edit, and delete content.

**Live:** [rifflog.netlify.app](https://rifflog.netlify.app)

---

## What It's For

Rifflog is a personal music logging app that lets you:

- Upload audio and video recordings from practice sessions, covers, etc.
- Tag recordings with metadata — tuning, key, gear used, notes, and custom tags
- Browse and filter recordings on a searchable dashboard
- Showcase gear and amp sim screenshots on a dedicated Rig page with categorized photo cards

---

## Tech Stack

### Frontend (`rifflog-ui`)
| Technology | Purpose |
|---|---|
| React 19 + TypeScript | UI framework |
| Vite | Build tool / dev server |
| Tailwind CSS v4 | Styling |
| shadcn/ui + Radix UI | Component primitives |
| React Router DOM v7 | Client-side routing |
| Axios | HTTP client |
| Lucide React | Icons |
| Cloudinary Upload Widget | Direct browser-to-cloud file uploads |

### Backend (`rifflog-backend`)
| Technology | Purpose |
|---|---|
| Java 21 + Spring Boot 3.4 | REST API framework |
| Spring Security + JWT (JJWT 0.12) | Authentication & authorization |
| Spring Data JPA + Hibernate | ORM / database access |
| MySQL | Relational database |
| Cloudinary SDK | Media deletion on recording/photo removal |
| Maven | Build tool |

---

## Architecture

```
Browser
  │
  ├── Netlify (rifflog-ui)          React SPA — static build deployed via Netlify
  │       │
  │       └── API calls ──────────► Railway (rifflog-backend)   Spring Boot REST API on port 8080
  │                                        │
  │                                        └── Railway MySQL     Managed MySQL database
  │
  └── Cloudinary                    Media files (audio, video, images) stored & served from Cloudinary
```

---

## Deployment

### Frontend — Netlify

- Build command: `npm run build` (runs `tsc -b && vite build`)
- Publish directory: `dist/`
- Environment variables set in Netlify dashboard:
  - `VITE_API_BASE_URL` — Railway backend URL
  - `VITE_CLOUDINARY_CLOUD_NAME`
  - `VITE_CLOUDINARY_UPLOAD_PRESET`
- A `_redirects` file routes all paths to `index.html` for SPA routing

### Backend — Railway

- Deployed as a Spring Boot JAR via Railway's GitHub integration
- Environment variables set in Railway dashboard:
  - `MYSQLHOST`, `MYSQLPORT`, `MYSQL_DATABASE`, `MYSQLUSER`, `MYSQLPASSWORD` — provisioned automatically by Railway's MySQL plugin
  - `JWT_SECRET` — secret key for signing JWTs
- Server runs on port `8080`

---

## Access Control

Rifflog uses a single-admin model. There is no public registration flow exposed in the UI.

| Action | Visitor | Admin (Josh) |
|---|---|---|
| Browse dashboard / recordings | ✅ | ✅ |
| View recording detail page | ✅ | ✅ |
| View Rig page | ✅ | ✅ |
| Search recordings | ✅ | ✅ |
| Upload recording | ❌ | ✅ |
| Edit recording | ❌ | ✅ |
| Delete recording | ❌ | ✅ |
| Add rig photo | ❌ | ✅ |
| Edit rig photo | ❌ | ✅ |
| Delete rig photo | ❌ | ✅ |

**How it works:**
- The backend enforces access via Spring Security. All `GET` requests to `/api/recordings/**` and `/api/rig/**` are public. All `POST`, `PATCH`, and `DELETE` requests require a valid JWT bearer token.
- The frontend conditionally renders admin controls (upload button, edit/delete buttons) based on the `isAuthenticated` state from `AuthContext`. Protected routes (`/admin/upload`, `/admin/edit/:id`) redirect unauthenticated users to `/login`.
- The JWT is stored in `localStorage` and attached to every mutating request via an Axios request interceptor.
- Passwords are hashed with BCrypt.

---

## API Endpoints

### Recordings — `/api/recordings`
| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| `GET` | `/api/recordings` | No | Get all recordings |
| `GET` | `/api/recordings/:id` | No | Get a single recording by ID |
| `POST` | `/api/recordings` | ✅ Yes | Create a new recording |
| `PATCH` | `/api/recordings/:id` | ✅ Yes | Update an existing recording |
| `DELETE` | `/api/recordings/:id` | ✅ Yes | Delete a recording (also removes from Cloudinary) |

---

### Rig Photos — `/api/rig`
| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| `GET` | `/api/rig` | No | Get all rig photos |
| `POST` | `/api/rig` | ✅ Yes | Upload a new rig photo |
| `PATCH` | `/api/rig/:id` | ✅ Yes | Update category/description of a rig photo |
| `DELETE` | `/api/rig/:id` | ✅ Yes | Delete a rig photo |

---

## Frontend Routes

| Path | Access | Description |
|---|---|---|
| `/` | Public | Dashboard — grid of all recordings with search |
| `/recordings/:id` | Public | Recording detail page with media player and session info |
| `/rig` | Public | Rig page — categorized gear photos |
| `/login` | Public | Admin login form |
| `/admin/upload` | Admin only | Multi-step recording upload form |
| `/admin/edit/:id` | Admin only | Edit an existing recording |

---

## Local Development

### Backend
```bash
cd rifflog-backend
# Copy application-local.properties and fill in local DB credentials
./mvnw spring-boot:run
```

### Frontend
```bash
cd rifflog-ui
npm install
# Create .env with VITE_API_BASE_URL, VITE_CLOUDINARY_CLOUD_NAME, VITE_CLOUDINARY_UPLOAD_PRESET
npm run dev
```