# Hotel Website — Detailed Product Requirements Document (PRD)

## 1. Project Overview
| | |
|---|---|
| **Project Name** | Hotel Booking / Showcase Website |
| **Objective** | Modern, aesthetic, fully responsive multi-page website for a hotel — showcase rooms, amenities, gallery, and capture booking/contact inquiries |
| **Pages** | 4 (Home, Rooms & Suites, Amenities & Gallery, Contact/Booking) |
| **Frontend** | React.js |
| **Backend** | Node.js (Express.js) |
| **Database** | MongoDB (or PostgreSQL — see Open Questions) |
| **Styling** | Tailwind CSS |

---

## 2. Tech Stack (Detailed)

### Frontend
- **Framework:** React.js (Vite for build tooling — faster dev server than CRA)
- **Routing:** React Router DOM (multi-page SPA behavior)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion (scroll-reveal, hover, page transitions) or AOS library
- **Sliders/Carousels:** Swiper.js (React version — `swiper/react`)
- **Icons:** Lucide React / React Icons
- **Forms:** React Hook Form + Yup/Zod validation
- **State Management:** React Context API (lightweight — no Redux needed for this scope) or Zustand if state grows
- **HTTP Client:** Axios (API calls to Node backend)
- **Image Lightbox:** yet-another-react-lightbox or react-image-lightbox

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM (flexible for rooms/amenities content) — *or* PostgreSQL with Prisma if relational/admin-reporting needs are stronger
- **Email Service:** Nodemailer (contact/booking form → email notification) or a transactional service (SendGrid/Resend)
- **Environment Config:** dotenv
- **Validation:** express-validator or Zod on backend too
- **API Style:** REST (JSON endpoints)
- **File/Image Uploads (if admin panel needed):** Multer + Cloudinary/S3 for image hosting

### DevOps / Hosting
- **Frontend Hosting:** Vercel / Netlify
- **Backend Hosting:** Render / Railway / VPS
- **Database Hosting:** MongoDB Atlas (or Supabase/Neon if PostgreSQL)
- **Version Control:** Git + GitHub

---

## 3. Sitemap / Pages (4 Pages)

### Page 1 — Home (`/`)
| Section | Details |
|---|---|
| Navbar | Logo, nav links (Home, Rooms, Amenities/Gallery, Contact), "Book Now" CTA button, sticky + transparent-to-solid on scroll, mobile hamburger menu |
| Hero | Full-width background image/video, hotel name, tagline, primary CTA |
| Quick Booking Widget | Check-in date, Check-out date, Guests dropdown, "Search" button (React Datepicker component) |
| About/Intro | Short hotel story, image + text split layout |
| Featured Rooms | Swiper carousel — 3–4 room cards (image, name, price/night, "View Details" → routes to Rooms page with anchor/filter) |
| Amenities Grid | Icon + label grid (Pool, Spa, WiFi, Restaurant, Parking, Gym) — animated on scroll |
| Testimonials | Swiper carousel, guest name, rating stars, review text, photo |
| Gallery Preview | 4–6 image grid, "View Full Gallery" link → Amenities & Gallery page |
| Map/Location Preview | Embedded Google Map iframe or React Google Maps component |
| Footer | Contact info, quick links, social icons, newsletter signup form |

### Page 2 — Rooms & Suites (`/rooms`)
| Section | Details |
|---|---|
| Page Banner | Title + breadcrumb |
| Filter Bar | Room type, price range slider, guest count, amenities checkboxes (client-side filter via React state, or query params to backend API) |
| Room Grid | Cards fetched from `/api/rooms` — image carousel per card, name, size (sq ft), max occupancy, price, key amenities icons, "Book Now" / "View Details" |
| Room Detail Modal/Page | Full image gallery, description, amenities list, pricing table, availability check, booking CTA (React modal or dynamic route `/rooms/:id`) |
| Empty State | "No rooms match your filters" fallback UI |

### Page 3 — Amenities & Gallery (`/amenities`)
| Section | Details |
|---|---|
| Page Banner | Title + breadcrumb |
| Amenities Detail | Alternating image/text rows for each amenity (Spa, Pool, Restaurant, Gym, Conference Hall, Kids Club, etc.) |
| Dining Highlight | Restaurant/menu preview section (optional PDF menu download link) |
| Photo Gallery | Masonry/grid layout, category tabs (Rooms/Pool/Restaurant/Events), click → lightbox viewer |

### Page 4 — Contact / Booking (`/contact`)
| Section | Details |
|---|---|
| Page Banner | Title + breadcrumb |
| Contact/Booking Form | Name, Email, Phone, Check-in/Check-out, Guests, Message → POST to `/api/contact` (Node backend → Nodemailer email + optional DB save) |
| Form Validation | Real-time client-side (React Hook Form) + server-side revalidation |
| Success/Error States | Toast notification (react-hot-toast) or inline confirmation message |
| Hotel Info | Address, phone, email, working hours |
| Embedded Map | Google Map with marker |
| Social Links | Instagram, Facebook, WhatsApp click-to-chat |
| FAQ Accordion | Expand/collapse (React state or Radix UI Accordion) |

---

## 4. API Endpoints (Node/Express Backend)

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/rooms` | List all rooms (supports query filters: type, price, guests) |
| GET | `/api/rooms/:id` | Get single room details |
| POST | `/api/contact` | Submit contact/booking inquiry (sends email + optionally stores in DB) |
| GET | `/api/testimonials` | Fetch testimonials for homepage |
| GET | `/api/amenities` | Fetch amenities list/content |
| POST | `/api/newsletter` | Newsletter signup (optional) |
| (Admin, if needed) | `/api/admin/rooms` (CRUD) | Add/edit/delete rooms — protected route |

---

## 5. Data Models (MongoDB/Mongoose example)

**Room**
```
{
  name: String,
  slug: String,
  images: [String],
  pricePerNight: Number,
  sizeSqFt: Number,
  maxOccupancy: Number,
  amenities: [String],
  description: String,
  type: String, // e.g. Deluxe, Suite, Standard
  available: Boolean
}
```

**Testimonial**
```
{
  guestName: String,
  photo: String,
  rating: Number,
  reviewText: String
}
```

**ContactInquiry**
```
{
  name: String,
  email: String,
  phone: String,
  checkIn: Date,
  checkOut: Date,
  guests: Number,
  message: String,
  createdAt: Date
}
```

---

## 6. Design Requirements (Modern & Aesthetic UI)
- Clean, minimal layout, generous white space
- 1 display font (headings, e.g. serif for luxury feel) + 1 body font (sans-serif)
- Warm neutral palette + 1 accent color (gold/earth tone typical for hospitality branding)
- High-quality imagery, subtle gradient overlays on hero/banners
- Scroll-triggered fade-in/slide-up animations (Framer Motion `whileInView`)
- Rounded cards, soft shadows, hover elevation/scale effects
- Sticky navbar: transparent over hero → solid background on scroll
- Consistent spacing via Tailwind design tokens
- Skeleton loaders while API data fetches (rooms, testimonials)

## 7. Responsiveness
- Breakpoints: mobile (<640px), tablet (640–1024px), desktop (>1024px)
- Tailwind responsive grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3/4`
- Mobile: hamburger nav, stacked booking widget, swipeable Swiper sliders
- Touch targets ≥ 44px
- Images responsive via `srcset` or Next-gen formats (WebP)

## 8. Non-Functional Requirements
- **Performance:** Code-splitting (React.lazy + Suspense per route), image lazy-loading, Lighthouse score 90+
- **SEO:** React Helmet Async for meta tags per page, semantic HTML, sitemap.xml
- **Security:** Input sanitization on backend, rate-limiting on `/api/contact` (express-rate-limit), CORS config, helmet.js
- **Accessibility:** WCAG AA contrast, alt text, keyboard-navigable forms/modals
- **Cross-browser:** Chrome, Safari, Firefox, Edge

## 9. Project Structure (Suggested)
```
/client (React + Vite)
  /src
    /components
    /pages
    /hooks
    /assets
    /context
/server (Node + Express)
  /routes
  /controllers
  /models
  /middleware
  server.js
```

## 10. Deliverables
- React frontend (4 routed pages, reusable components, responsive)
- Node/Express backend with REST API + email handling
- Database schema/models
- Deployment-ready build (frontend + backend)

## 11. Open Questions (confirm before build)
1. Database preference: MongoDB (flexible, faster to prototype) or PostgreSQL (relational, better for admin/reporting)?
2. Booking flow: inquiry-only form, or real booking + payment gateway (Razorpay/Stripe) integration?
3. Admin panel needed to manage rooms/prices/gallery, or will content be static/seeded?
4. Number of room types/categories to showcase?
5. Brand assets available (logo, color palette, professional photography) or need placeholders?
6. Multi-language support needed (e.g. English + Gujarati/Hindi)?
