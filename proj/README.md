# Aurelia Grand Resort — Hotel Management / Booking System

A responsive BCA II Front-End Designing project built with HTML5, CSS3, JavaScript and jQuery.

## Run the project
1. Extract the ZIP folder.
2. Open `index.html` in Chrome or another modern browser.
3. For the smoothest local development experience, use VS Code with the Live Server extension and open `index.html`.

No package installation or backend is required. An internet connection is recommended for Google Fonts and the Unsplash room/experience photography.

## Main pages
- `index.html` — home, introduction, featured rooms, facilities and contact
- `about.html` — about/brand information
- `rooms.html` — room listings and room details
- `facilities.html` — resort facilities/experiences
- `register.html` — registration with validation
- `login.html` — login and logout demo
- `forgot-password.html` — demo forgot-password flow
- `booking.html` — booking form, date validation and estimated total
- `confirmation.html` — booking confirmation and summary

## Features
- Black, cream and muted-gold luxury resort theme
- Responsive layout, mobile navigation, hover effects and transitions
- Form validation for required fields, email, mobile number and matching passwords
- Demo registration/login/logout using `localStorage`
- Room selection, guest count, date validation and estimated price calculation
- Booking confirmation with generated reference and reservation summary
- Navigation links, home/back paths and contact details
- CSS Grid/Flexbox and mobile media queries

## Demo room prices
- Deluxe Retreat: ₹6,500 per night
- Premier Suite: ₹9,800 per night
- Signature Villa: ₹18,500 per night

## Important academic note
This is a **front-end demo**, not a production hotel management platform. It has no server, real database, real email delivery, inventory/availability checking, or payment gateway. Account and booking demo data are stored in the current browser's `localStorage`; this is not secure for real credentials or personal information. Booking submissions do not create real hotel reservations.

## Suggested presentation screenshots
1. Home page / navigation
2. Rooms & Suites page
3. Registration page with fields
4. Booking form and estimate
5. Invalid form validation message
6. Booking confirmation summary
7. Mobile/responsive layout


## jQuery usage
The project includes jQuery 3.7.1 from the official jQuery CDN and `js/jquery-effects.js`:
- Room search filters room cards by name, view and amenities.
- A nightly-price selector filters room categories by maximum price.
- `fadeIn()` / `fadeOut()` animate filtered room cards.
- `animate()` provides smooth scrolling and gentle card entrance effects.
- Required fields receive a visual cue when left empty after focus.
An internet connection is required to load jQuery from the CDN.

## Project structure
- `css/style.css` — shared theme and responsive layouts
- `js/script.js` — site navigation and shared behavior
- `js/auth.js` — registration/login/forgot-password demo
- `js/booking.js` — booking validation and estimate
- `js/confirmation.js` — confirmation summary
- `js/jquery-effects.js` — jQuery interactions
