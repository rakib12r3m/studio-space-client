
# StudioSpace — Creative Workspace & Production Studio Marketplace

<p align="center">
  <strong>Discover inspiring spaces. Book with confidence. Create without limits.</strong>
</p>

<p align="center">
  <a href="https://studio-space-tau.vercel.app/">
    <img src="https://img.shields.io/badge/Live%20Demo-StudioSpace-2457D6?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo" />
  </a>
  <img src="https://img.shields.io/badge/Next.js-App%20Router-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-Ready-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
</p>

<p align="center">
  <a href="https://studio-space-tau.vercel.app/"><strong>🚀 Live Website</strong></a>
</p>

---

## 📖 Project Overview

**StudioSpace** is a peer-to-peer creative workspace marketplace that connects studio owners with creators looking for professional spaces to bring their ideas to life.

Photographers, filmmakers, podcasters, musicians, and other creative professionals can explore different types of studios, review workspace details, and book a suitable space.

Studio owners can publish and manage their own listings and handle bookings through the platform.

The goal is to make discovering, sharing, and booking creative workspaces straightforward through a modern, responsive, and user-friendly experience.

## ✨ Key Features

- **Explore Creative Studios:** Browse available creative workspaces and discover spaces that match your project needs.
- **Studio Categories:** Explore Photo Studios, Film Stages, Podcast Lounges, Music Suites, and Workshops.
- **Studio Details:** View studio information, location, pricing, capacity, amenities, and other listing details.
- **User Authentication:** Register and sign in to access account-specific features, with Google authentication support.
- **Add a Studio:** Authenticated users can publish a workspace with its details, pricing, image, and amenities.
- **Manage Listings:** Studio owners can view, update, and delete their own studio listings.
- **Booking System:** Users can submit booking requests for studios and view their booking information.
- **My Bookings:** Access personal bookings and their current status from a private page.
- **Protected Routes:** Restrict private pages and sensitive operations to authenticated users.
- **JWT-Based API Security:** Use JSON Web Tokens to verify authenticated API requests.
- **Responsive Interface:** Designed to provide a consistent experience across desktop, tablet, and mobile devices.
- **Theme Customization:** Switch between light and dark appearances.
- **Toast Notifications:** Provide interactive feedback for user actions.
- **Loading States:** Display loading indicators during asynchronous operations.
- **Custom Not-Found Page:** Provide a dedicated page for unavailable routes or resources.

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| Frontend Framework | Next.js (App Router), React |
| Programming Language | TypeScript, JavaScript |
| Authentication | Better Auth |
| Authentication Database Adapter | Better Auth MongoDB Adapter |
| API Security | JSON Web Token (JWT), JWKS Verification |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| UI & Styling | Tailwind CSS, Component-based UI |
| Icons | Lucide React |
| Notifications | Sonner |
| Deployment | Vercel |

## 📂 Application Routes

| Route | Description | Access |
|---|---|---|
| `/` | Landing page with hero slider, featured studios, categories, and informational sections | Public |
| `/studios` | Browse available studios | Public |
| `/studios/[id]` | View the details of a selected studio | Public |
| `/add-studio` | Create a new studio listing | Private |
| `/my-listings` | Manage studios created by the signed-in user | Private |
| `/studios/edit/[id]` | Update an existing studio listing | Private |
| `/my-bookings` | View and manage the user's bookings | Private |
| `/login` | Sign in to an account | Public |
| `/register` | Create a new account | Public |

## 🏠 Homepage Highlights

The landing page introduces the platform and guides visitors towards its main features.

1. **Hero Slider:** Highlights creative spaces and encourages visitors to explore or host a studio.
2. **Featured Studios:** Introduces selected creative workspaces.
3. **Browse by Category:** Provides quick access to the main studio categories.
4. **How StudioSpace Works:** Explains the discovery and booking journey.
5. **About StudioSpace:** Describes the platform's purpose and creator-focused mission.
6. **Footer:** Includes quick links, popular categories, newsletter subscription UI, and social links.

## 📅 How Booking Works

1. **Discover Spaces:** Find studios that fit your creative requirements.
2. **Select Your Schedule:** Choose a suitable date and time for your project.
3. **Book Your Studio:** Submit your booking request with transparent pricing.
4. **Create & Produce:** Use the selected creative space to work on your project.

## 🔐 Authentication & Security

StudioSpace uses Better Auth for authentication and authorization.

- Email and password authentication.
- Google social authentication.
- Secure session management.
- Private route protection.
- JWT-based API authentication.
- JWKS-based JWT verification.
- Protected server-side operations.

## ⚙️ CRUD Operations

StudioSpace provides complete studio listing management functionality.

- **Create:** Authenticated users can publish new studio listings.
- **Read:** Visitors can explore studios and view their details.
- **Update:** Studio owners can update their existing listings.
- **Delete:** Studio owners can remove their listings with confirmation.

## 🗓️ Booking Management

- Users can submit booking requests for available studios.
- Booking information is stored in MongoDB.
- Users can view their personal bookings.
- Booking status is displayed on the My Bookings page.
- Pending bookings can be cancelled.

## 🚀 Getting Started

Follow these instructions to run the project locally.

### Prerequisites

Make sure you have installed:

- Node.js (LTS recommended)
- npm
- Git
- MongoDB Atlas account or a local MongoDB instance
- Google OAuth credentials (for Google authentication)

### 1. Clone the Client Repository

```bash
git clone <CLIENT_REPOSITORY_URL>
cd <CLIENT_PROJECT_DIRECTORY>
```

### 2. Clone the Server Repository

Open another terminal:

```bash
git clone <SERVER_REPOSITORY_URL>
cd <SERVER_PROJECT_DIRECTORY>
```

### 3. Install Dependencies

Run the following command inside both client and server directories:

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env.local` file inside the client project.

**Client — `.env.local`**

```env
MONGODB_URI=your_mongodb_connection_string

BETTER_AUTH_SECRET=your_long_random_secret
BETTER_AUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret

NEXT_PUBLIC_API_URL=http://localhost:8000
```

Create a `.env` file inside the server project.

**Server — `.env`**

```env
PORT=8000
MONGODB_URI=your_mongodb_connection_string
```

**Important:**

- Replace all placeholder values with your actual credentials.
- Never commit `.env` or `.env.local` files to GitHub.
- Never expose database passwords or authentication secrets.
- Add any additional environment variables required by your actual source code.

### 5. Run the Backend Server

Navigate to the server directory and run:

```bash
npm run dev
```

Backend API:

```text
http://localhost:8000
```

### 6. Run the Frontend Application

Navigate to the client directory and run:

```bash
npm run dev
```

Open your browser:

```text
http://localhost:3000
```

The StudioSpace application should now be running locally.

> If your package.json uses different development scripts, use the scripts defined in your project.

## 🌐 Live Deployment

The frontend application is deployed on Vercel.

**Live Website:** https://studio-space-tau.vercel.app/

For successful deployment:

1. Deploy the backend API.
2. Configure the production API URL in the frontend environment variables.
3. Configure MongoDB connection settings.
4. Set the correct Better Auth base URL and trusted origins.
5. Configure Google OAuth callback URLs.
6. Allow the frontend domain through backend CORS settings.
7. Add all required environment variables to the hosting platform.

## 🧪 Demo / Examiner Credentials

Create a test account using the Register page to evaluate the application.

| Credential | Value |
|---|---|
| Website | https://studio-space-tau.vercel.app/ |
| Email | YOUR_DEMO_EMAIL |
| Password | YOUR_DEMO_PASSWORD |

**Note:** Replace the placeholder credentials with a working test account before submitting the project. Do not publish personal account credentials.

## 🔮 Future Improvements

- Advanced studio availability calendar.
- Automated prevention of overlapping confirmed bookings.
- Downloadable PDF booking invoices.
- Saved studios and personal wishlists.
- Studio reviews and ratings.
- Advanced search, filtering, and sorting.
- More detailed booking analytics.

## 👨‍💻 Author

**Rakib Mia**

Full Stack Developer

- **Portfolio:** [rakib12r3m-portfolio.vercel.app](https://rakib12r3m-portfolio.vercel.app/)
- **GitHub:** [github.com/rakib12r3m](https://github.com/rakib12r3m)
- **LinkedIn:** [linkedin.com/in/rakib12r3m](https://www.linkedin.com/in/rakib12r3m)
- **Email:** [rakib12r3m@gmail.com](mailto:rakib12r3m@gmail.com)

---

<p align="center">
  <strong>StudioSpace — Discover. Book. Create.</strong>
  <br />
  Made for creators, with creativity.
  <br /><br />
  © 2026 StudioSpace. All Rights Reserved.
</p>
