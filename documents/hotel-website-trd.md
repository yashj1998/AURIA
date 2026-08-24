# Hotel Website — Technical Requirements Document (TRD)

## 1. Purpose
Ama PRD (product/functional scope) ne technical implementation level par define karvama aavyu chhe — architecture, tech stack versions, API contracts, DB schema, folder structure, security, performance, ane deployment.

---

## 2. System Architecture

```
┌─────────────────┐        HTTPS/REST         ┌──────────────────┐
│   React (Vite)   │  <---------------------->  │  Node.js/Express  │
│   Frontend SPA    │        JSON/API            │   Backend API      │
└─────────────────┘                             └──────────────────┘
                                                          │
                                                          │ Mongoose/Prisma
                                                          ▼
                                                  ┌──────────────────┐
                                                  │  MongoDB Atlas /  │
                                                  │  PostgreSQL DB     │
                                                  └──────────────────┘
                                                          │
                                          ┌───────────────┼───────────────┐
                                          ▼                              ▼
                                  ┌───────────────┐            ┌──────────────────┐
                                  │ Cloudinary/S3  │            │ Nodemailer/       │
                                  │ (image hosting) │            │ SendGrid (email)  │
                                  └───────────────┘            └──────────────────┘
```

- **Pattern:** Decoupled SPA (React) + REST API (Node/Express)
- **Deployment:** Frontend on Vercel/Netlify (static build), Backend on Render/Railway (Node server), DB on managed cloud (MongoDB Atlas / Neon-PostgreSQL)
- **Communication:** JSON over HTTPS, Axios on client

---

## 3. Tech Stack — Exact Versions/Libraries

### Frontend
| Layer | Library | Purpose |
|---|---|---|
| Build tool | Vite | Fast dev/build |
| Framework | React 18+ | UI |
| Routing | react-router-dom v6 | Page routing |
| Styling | Tailwind CSS v3 | Utility CSS |
| Animation | Framer Motion | Scroll/hover animations |
| Carousel | swiper/react | Rooms/testimonials sliders |
| Forms | react-hook-form + zod | Form state + validation |
| HTTP | axios | API calls |
| Icons | lucide-react | Icon set |
| Lightbox | yet-another-react-lightbox | Gallery viewer |
| SEO | react-helmet-async | Per-page meta tags |
| Notifications | react-hot-toast | Success/error toasts |
| Date picker | react-datepicker | Check-in/out selection |

### Backend
| Layer | Library | Purpose |
|---|---|---|
| Runtime | Node.js 20 LTS | Server runtime |
| Framework | Express.js 4 | REST API |
| DB ODM | Mongoose (MongoDB) | Schema/queries |
| Validation | express-validator / zod | Input validation |
| Email | Nodemailer | Send booking/contact emails |
| File upload | Multer + Cloudinary SDK | Image upload/hosting |
| Security | helmet, cors, express-rate-limit | Headers, CORS, rate limiting |
| Env config | dotenv | Environment variables |
| Logging | morgan | Request logging |

---

## 4. Folder Structure

```
/client
  /public
  /src
    /assets
    /components
      Navbar.jsx
      Footer.jsx
      RoomCard.jsx
      BookingWidget.jsx
      TestimonialSlider.jsx
      GalleryLightbox.jsx
      ContactForm.jsx
    /pages
      Home.jsx
      Rooms.jsx
      RoomDetail.jsx
      AmenitiesGallery.jsx
      Contact.jsx
    /hooks
      useFetch.js
    /context
      AppContext.jsx
    /lib
      axiosClient.js
    App.jsx
    main.jsx
  tailwind.config.js
  vite.config.js

/server
  /config
    db.js
    cloudinary.js
  /models
    Room.js
    Testimonial.js
    ContactInquiry.js
  /routes
    roomRoutes.js
    contactRoutes.js
    testimonialRoutes.js
    amenityRoutes.js
  /controllers
    roomController.js
    contactController.js
    testimonialController.js
  /middleware
    errorHandler.js
    rateLimiter.js
    validateRequest.js
  server.js
  .env
```

---

## 5. API Contract (Detailed)

### GET `/api/rooms`
**Query params:** `type`, `minPrice`, `maxPrice`, `guests`
**Response 200:**
```json
{
  "success": true,
  "count": 4,
  "data": [
    {
      "_id": "665f...",
      "name": "Deluxe Suite",
      "slug": "deluxe-suite",
      "images": ["url1", "url2"],
      "pricePerNight": 4500,
      "sizeSqFt": 450,
      "maxOccupancy": 3,
      "amenities": ["WiFi", "AC", "Mini Bar"],
      "type": "Suite",
      "available": true
    }
  ]
}
```

### GET `/api/rooms/:id`
**Response 200:** single room object (as above)
**Response 404:** `{ "success": false, "message": "Room not found" }`

### POST `/api/contact`
**Body:**
```json
{
  "name": "Yash Patel",
  "email": "yash@example.com",
  "phone": "+91XXXXXXXXXX",
  "checkIn": "2026-09-01",
  "checkOut": "2026-09-03",
  "guests": 2,
  "message": "Need a sea-facing room"
}
```
**Validation:** name (required, min 2), email (valid format), phone (10 digit), checkIn < checkOut
**Response 201:** `{ "success": true, "message": "Inquiry received" }`
**Response 400:** `{ "success": false, "errors": [...] }`
**Rate limit:** 5 requests / 15 min / IP

### GET `/api/testimonials`
**Response 200:** array of testimonial objects

### GET `/api/amenities`
**Response 200:** array of amenity objects `{ title, description, icon, image }`

---

## 6. Database Schema (Mongoose)

```js
// models/Room.js
const roomSchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  images: [{ type: String }],
  pricePerNight: { type: Number, required: true },
  sizeSqFt: Number,
  maxOccupancy: { type: Number, required: true },
  amenities: [String],
  description: String,
  type: { type: String, enum: ["Standard", "Deluxe", "Suite", "Executive"] },
  available: { type: Boolean, default: true }
}, { timestamps: true });

// models/ContactInquiry.js
const contactInquirySchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  checkIn: Date,
  checkOut: Date,
  guests: Number,
  message: String
}, { timestamps: true });

// models/Testimonial.js
const testimonialSchema = new Schema({
  guestName: { type: String, required: true },
  photo: String,
  rating: { type: Number, min: 1, max: 5 },
  reviewText: String
}, { timestamps: true });
```

---

## 7. State Management (Frontend)
- **Local UI state:** `useState`/`useReducer` per component (filters, modal open/close)
- **Global state:** React Context (`AppContext`) for booking-widget dates shared between Home widget and Rooms filter
- **Server state:** `useFetch` custom hook wrapping Axios (or React Query if data-fetching complexity grows — recommended if pagination/caching needed)

---

## 8. Security Requirements
- `helmet` for secure HTTP headers
- `cors` restricted to frontend domain only
- `express-rate-limit` on `/api/contact` (prevent spam submissions)
- Input sanitization/validation on all POST routes (server-side, not just client)
- Environment secrets (DB URI, email API key) in `.env`, never committed
- HTTPS enforced in production (via hosting provider)
- If admin panel added later: JWT-based auth + bcrypt password hashing

---

## 9. Performance Requirements
- Route-based code splitting: `React.lazy()` + `Suspense` for each page
- Image optimization: WebP format, lazy-loading (`loading="lazy"`), responsive `srcset`
- API response caching where applicable (e.g. amenities/testimonials rarely change — cache 1hr)
- Lighthouse targets: Performance ≥ 90, Accessibility ≥ 90, SEO ≥ 90
- Gzip/Brotli compression on server responses

---

## 10. Testing Requirements
- **Frontend:** Component tests with Vitest + React Testing Library (forms, room card rendering)
- **Backend:** API tests with Jest + Supertest (contact form validation, room endpoints)
- **Manual QA:** Cross-browser (Chrome, Safari, Firefox, Edge) + responsive check (mobile/tablet/desktop)

---

## 11. Deployment Plan
| Component | Platform | Notes |
|---|---|---|
| Frontend | Vercel | Auto-deploy on `main` push, env vars for API base URL |
| Backend | Render/Railway | Node server, env vars for DB URI, email keys |
| Database | MongoDB Atlas | Free/shared tier to start |
| Images | Cloudinary | Free tier sufficient for initial gallery/room images |
| Domain/SSL | Managed via hosting provider | Auto SSL cert |

---

## 12. Environment Variables

**Backend (`.env`)**
```
PORT=5000
MONGO_URI=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
EMAIL_HOST=
EMAIL_USER=
EMAIL_PASS=
CLIENT_URL=
```

**Frontend (`.env`)**
```
VITE_API_BASE_URL=
```

---

## 13. Open Technical Decisions
1. MongoDB vs PostgreSQL — confirm based on whether relational reporting/admin is needed
2. React Query adoption for server-state caching (recommended if data grows beyond 4 endpoints)
3. Payment gateway integration (Razorpay/Stripe) — only if real booking (not inquiry-only) is confirmed
4. Admin panel scope — CRUD UI for rooms/gallery, or manual DB seeding for now
