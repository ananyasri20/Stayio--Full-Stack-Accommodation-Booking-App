# Stayio — Hotel Booking Frontend

A modern Airbnb-style hotel booking app built with React + Vite, featuring a warm earthy design aesthetic.

## Tech Stack

- **React 18** with functional components + hooks
- **React Router v6** for client-side navigation
- **Framer Motion** for page & card animations
- **CSS Modules** for scoped styling
- **Vite** for blazing-fast development

## Color Palette

| Token          | Hex       |
|----------------|-----------|
| Beige          | `#F5F1E8` |
| Warm Brown     | `#8B5E3C` |
| Olive Green    | `#6B8E23` |
| Soft Sand      | `#EADBC8` |
| Dark Charcoal  | `#333333` |

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev

# 3. Open in browser
# http://localhost:5173
```

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx / .module.css
│   ├── Footer.jsx / .module.css
│   ├── HotelCard.jsx / .module.css
│   ├── ReviewCard.jsx / .module.css
│   ├── Sidebar.jsx / .module.css
│   ├── SearchBar.jsx / .module.css
│   ├── FilterPanel.jsx / .module.css
│   └── BookingCard.jsx / .module.css
├── pages/
│   ├── Landing.jsx / .module.css
│   ├── Signup.jsx
│   ├── Login.jsx
│   ├── Auth.module.css     ← shared by Login & Signup
│   ├── Dashboard.jsx / .module.css
│   ├── Listings.jsx / .module.css
│   ├── HotelDetails.jsx / .module.css
│   └── Reviews.jsx / .module.css
├── data/
│   └── hotels.js           ← dummy hotel + testimonial data
├── styles/
│   └── global.css
├── App.jsx
└── main.jsx
```

## Pages

| Route          | Page           | Description                              |
|----------------|----------------|------------------------------------------|
| `/`            | Landing        | Hero, featured hotels, features, reviews |
| `/listings`    | Listings       | Filter/sort hotel grid                   |
| `/hotel/:id`   | Hotel Details  | Gallery, amenities, booking widget       |
| `/reviews`     | Reviews        | Write + read reviews                     |
| `/signup`      | Signup         | Registration with role selection         |
| `/login`       | Login          | Authentication form                      |
| `/dashboard`   | Dashboard      | User stats, bookings, saved, profile     |

## Reusable Components

| Component     | Description                                     |
|---------------|-------------------------------------------------|
| `Navbar`      | Sticky top nav with mobile hamburger menu       |
| `Footer`      | 4-column footer with social links               |
| `HotelCard`   | Hotel grid card with favourite toggle           |
| `ReviewCard`  | Review with helpful vote buttons                |
| `Sidebar`     | Dashboard left-side navigation                  |
| `SearchBar`   | Location / date / guest search strip            |
| `FilterPanel` | Price, rating, location, amenity filters        |
| `BookingCard` | Booking status card for dashboard               |

## Customisation

- **Add hotels**: edit `src/data/hotels.js`
- **Change colours**: update CSS variables in `src/styles/global.css`
- **Add pages**: create component in `src/pages/` and add a `<Route>` in `App.jsx`
