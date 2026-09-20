# ⚙️ GearUp — Premium Sports & Outdoor Gear Rental Platform

[![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat-square&logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791?style=flat-square&logo=postgresql)](https://www.postgresql.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)

**GearUp** is a full-stack, modern web application designed to empower outdoor enthusiasts to rent sports gear seamlessly while providing gear owners a platform to monetize their assets safely. Built with server-side performance, accessibility, and modern glassmorphic aesthetics in mind.

---

## 🌟 Key Features

### 👤 Multi-Role Architecture & Dashboards
* **Customer Portal:** Browse items, select rental dates via calendar, book gear, manage order status, and track payment receipts.
* **Gear Provider Dashboard:** List new gear items, toggle availability, view rental schedules, and track earnings.
* **Admin Control Center:** Platform-wide oversight with user moderation, gear listing approvals, order inspection, and transaction monitoring.

### 💼 Rental & Booking Management
* **Interactive Date Selection:** Dynamic total day and price calculation.
* **Moderation Engine:** Real-time inventory status, approval workflows, and order tracking (`PENDING`, `CONFIRMED`, `ON_RENT`, `RETURNED`, `CANCELLED`).
* **Secure Payment Integration:** Integrated payment ledger with detailed transaction tracking and status verification.

### 🎨 UI/UX Excellence
* **Modern Glassmorphic Aesthetic:** Fully responsive UI built with Tailwind CSS, supporting dark/light contrast elements, custom status badges, and skeleton loading states.
* **Optimized UX:** Non-blocking error boundaries, server-side dynamic loading, and smooth transitions using React Server Components and `useTransition`.

---

## 🛠️ Tech Stack

### **Frontend & Rendering**
* **Framework:** Next.js (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS (v4), Custom HSL CSS Variables, Glassmorphic Utility Classes,Shadcn UI
* **UI Components & Icons:** Lucide React, DaisyUI

### **Backend & Database**
* **Runtime Environment:** Node.js
* **Framework:** Next.js Server Actions & API Routes
* **Database ORM:** Prisma ORM
* **Database Engine:** PostgreSQL

### **Deployment & Infrastructure**
* **Hosting:** Vercel (Edge Network)
* **Version Control:** Git / GitHub

---

## 📁 Repository Structure

```text
gear-up/
├── app/
│   ├── (auth)/             # Authentication routes (Login/Register)
│   ├── dashboard/          # Role-based dashboard interfaces
│   │   ├── admin/          # Platform administration & moderation
│   │   ├── provider/       # Gear inventory management
│   │   └── customer/       # Customer orders & active rentals
│   ├── api/                # Internal backend API endpoints
│   ├── loading.tsx         # Global and route-level skeleton fallbacks
│   ├── error.tsx           # Error boundaries and recovery interfaces
│   └── page.tsx            # Landing page
├── components/             # Reusable UI components & modal dialogs
├── prisma/                 # Database schema and migration files
├── public/                 # Static assets & brand media
└── types/                  # TypeScript definitions & data interfaces
```


---

## 👥 User Roles & Dashboard Capabilities

| Role | Permissions & Access Controls |
| :--- | :--- |
| **`ADMIN`** | Full overview telemetry, user status moderation (Active/Suspended), gear inventory inspection, and system-wide rental order logs. |
| **`PROVIDER`** | Add/Edit equipment listings, inventory stock management, rental requests overview, and revenue logs. |
| **`CUSTOMER`** | Explore equipment catalog, rent gear items, track booking schedules, and view transaction history. |

---

# Admin Credential
## email: admin@rentnest.com
### password:admin123

# Provider Credential
## email: provider@rentnest.com
### password:123456789

# Provider: Customar Credential
## email: user@rentnest.com
### password:123456789


## 🚀 Getting Started

Follow these steps to set up the project locally on your machine:

### 1. Clone the repository
```bash
git clone [https://github.com/your-username/gear-up-frontend.git](https://github.com/your-username/gear-up-frontend.git)
cd gear-up-frontend


# API Base URLs
NEXT_PUBLIC_BASE_API="http://localhost:5000/api/v1"
BACKEND_API_URL="http://localhost:5000"

# JWT Secrets
JWT_ACCESS_SECRET="your_access_secret_here"
JWT_REFRESH_SECRET="your_refresh_secret_here"




