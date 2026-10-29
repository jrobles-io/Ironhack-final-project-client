# Early Bird Tickets — Client

React front end for **Early Bird Tickets**, an event ticketing platform built as the final project of the Ironhack Web Development Bootcamp (2024). Organizers create events and ticket tiers; buyers browse events, add tickets to a cart and check out.

The REST API lives in [Ironhack-final-project-server](https://github.com/jrobles-io/Ironhack-final-project-server).

## Stack

- React 18 + Vite
- React Router 6 for client-side routing
- Context API for auth and cart state (`src/context/`)
- Axios for API calls (`src/services/`)
- Tailwind CSS
- Deployed on Netlify (SPA redirect in `netlify.toml`)

## Features

- Sign up / log in with JWT auth, token verified on load
- Browse events and view event details with ticket tiers
- Organizers create, edit and delete their own events and tickets, with image upload
- Cart that persists per user, and a checkout flow

## Pages

| Route | Page |
|---|---|
| `/` | Home |
| `/events` | Event list |
| `/events/:eventId` | Event details and tickets |
| `/events/edit/:eventId` | Edit event (owner only) |
| `/checkout` | Cart and checkout |
| `/signup`, `/login` | Auth |

## Run locally

```bash
npm install
npm run dev
```

The API URL is set in `src/services/SERVER_URL.js`. Point it at `http://localhost:4000` to use a local server.
