# 🎓 UniNest - Student House Rental Platform

> A modern, transparent, zero-commission accommodation and annex rental platform connecting university students with verified house owners in Sri Lanka.

---

## 🌟 Overview

**UniNest** is a dedicated web application designed to simplify student housing discovery around university campuses across Sri Lanka (University of Colombo, University of Peradeniya, University of Moratuwa, University of Kelaniya, SLIIT, and USJ). 

It solves the challenges faced by students seeking verified boarding houses, annexes, and private rooms by providing transparent pricing, walking distance calculations to university faculties, direct contact with verified landlords, and interactive Google Maps location views—without any hidden broker fees.

---

## 🚀 Key Features

### 🎓 1. Student Housing Portal & Search
* **Campus-Based Filtering**: Search and filter accommodations near specific university campuses or faculties.
* **Smart Proximity Filters**: Filter by walking distance (<500m, <1km), maximum monthly rent budget, gender preference (*Girls Only*, *Boys Only*, *Any*), and included utility bills.
* **Side-by-Side Comparison Tool**: Select up to 3 accommodations to compare monthly rent, deposits, walking minutes, included utilities, landlord verification, and student ratings side-by-side.
* **Bookmarks & Saved Units**: Save favourite accommodation units to view later or compare.
* **Direct Viewing & Application Requests**: Submit formal viewing requests and rental applications with target move-in dates and student registration IDs.
* **Direct Messaging**: Chat directly with verified house owners to inquire about room availability.

### 🏠 2. House Owner (Landlord) Management Portal
* **Strict Role Isolation**: Dedicated Landlord Portal completely isolated from student search views.
* **Property Management Dashboard**: Overview of active listings, pending student applications, approved move-in tenants, and total monthly yield potential.
* **Instant Listing Wizard**: 4-step wizard to post new accommodations with property details, street address, pricing, utility terms, photo URLs, and facility checklists.
* **Tenant Application Review**: Review student details (university, faculty, student ID, move-in date) and accept or decline applications with one click.
* **Listing Management**: Delete or update active boarding house listings.

### 🗺️ 3. Google Maps Location Viewer
* **Embedded Interactive Map**: View the exact location pin of every boarding house inside the property details modal.
* **Open in Google Maps**: Direct one-click link to open walking routes and street locations in Google Maps.
* **Faculty Proximity Verification**: Clear indicator of walking time in minutes to target university gates.

### ☀️ 4. Premium Light Theme Design
* Modern, crisp, high-contrast user interface with slate typography, sky blue and emerald green accents, smooth micro-animations, and full mobile responsiveness.

---

## 🛠️ Technology Stack

* **Core**: React 18, JavaScript (ES6+), HTML5
* **Build Tool & Server**: Vite
* **Styling**: Tailwind CSS & Custom CSS custom properties (`index.css`)
* **Icons**: Lucide React
* **Maps**: Google Maps Embed & Location Query API

---

## 💻 Getting Started & Installation

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v16+ recommended) and `npm` installed on your machine.

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/RiyaasathMJM/UniNest-House-Rental-Platform.git
   cd UniNest-House-Rental-Platform/frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

4. **Build for Production**
   ```bash
   npm run build
   ```
   The production-ready bundle will be generated inside the `dist/` directory.

---

## 📁 Repository Architecture

```text
UniNest-House-Rental-Platform/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx               # Header navigation & role selector
│   │   │   ├── HeroSection.jsx          # Hero search banner & quick filters
│   │   │   ├── FilterSidebar.jsx        # Left filter sidebar controls
│   │   │   ├── ListingCard.jsx          # Accommodation listing card
│   │   │   ├── ListingDetailModal.jsx   # Property details & Google Maps embed
│   │   │   ├── StudentDashboard.jsx     # Student saved units & application tracker
│   │   │   ├── LandlordDashboard.jsx    # Landlord property & application management
│   │   │   ├── LoginScreen.jsx          # Role selection screen
│   │   │   ├── CompareModal.jsx         # Side-by-side comparison modal
│   │   │   ├── BookingModal.jsx         # Viewing & rental application modal
│   │   │   ├── DirectMessageModal.jsx   # Student-landlord direct chat modal
│   │   │   ├── AddListingModal.jsx      # Post new accommodation wizard
│   │   │   └── Footer.jsx               # App footer & campus quick links
│   │   ├── data/
│   │   │   └── mockData.js              # Initial mock listings, universities & data
│   │   ├── App.jsx                      # Main app controller & routing logic
│   │   ├── index.css                    # Design tokens & custom component styles
│   │   └── main.jsx                     # React entry point
│   ├── package.json
│   └── vite.config.js
└── README.md
```

---

## 🛡️ License

This project is open-source and available under the [MIT License](LICENSE).

---

<p align="center">
  Made for University Students & House Owners in Sri Lanka 🇱🇰
</p>