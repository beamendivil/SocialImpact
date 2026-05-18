# SocialImpact

SocialImpact is a React and Vite personal finance dashboard that rethinks personal finance through a social impact lens. Instead of treating spending only as a set of budget categories, the project explores how financial behavior can be connected to community goals, values-based decision making, and broader social outcomes.

The current version establishes the frontend experience, YNAB-style transaction loading, demo-data fallback, and impact calculation logic. A Node.js/Express backend with MongoDB data modeling is planned as the next major phase to support persistent user data, server-side API handling, and a more complete full-stack architecture.

## Why I Built This

Most budgeting tools focus on where money goes in a purely transactional sense. I wanted to explore a different perspective: how financial choices might also reflect social priorities and community impact.

SocialImpact was built as a way to combine product thinking, frontend architecture, financial data integration, and meaningful user-centered design. It reflects my interest in building software that is technically solid while also addressing real-world questions.

## Features

- View a dashboard with transaction-level spending and impact insights
- Load live YNAB transactions in development when API credentials are configured
- Fall back to demo transaction data for the deployed review build
- Calculate local-spending impact using multiplier and fiscal ROI logic
- Render impact narratives that translate spending into community-focused outcomes
- Track community goals with progress indicators and status labels
- Simulate login and token-check flows for prototype review access
- Use route-based pages for the dashboard, community goals, and UI showcase
- Plan for backend API, database persistence, and full-stack expansion

## Key Technical Highlights

- Built a route-based React/Vite frontend with dashboard and community-goal views
- Integrated YNAB-style transaction loading with production-safe demo fallback
- Implemented local-spending impact calculations and narrative generation
- Added simulated auth flow for prototype review
- Added Vitest coverage for impact calculations and generated impact narratives
- Deployed production build to GitHub Pages

## Tech Stack

### Current frontend

- React
- Vite
- React Router
- JavaScript
- CSS
- shadcn/Radix UI primitives
- YNAB API
- GitHub Pages

### Planned backend

- Node.js
- Express
- MongoDB
- Mongoose
- Axios
- dotenv

## Project Structure

```text
SocialImpact/
  README.md
  package.json
  vite.config.js
  public/
    demo-transactions.json
  src/
    components/
      App/
      Preloader/
      ui/
    pages/
      DashboardPage.jsx
      CommunityGoalsPage.jsx
      UIShowcasePage.jsx
    utils/
      auth.js
      impactLogic.js
      impactNarrative.js
      ynabApi.js
    main.jsx
```

### Planned backend structure

```text
backend/
  src/
    models/
      User.js
    routes/
      ynab.js
    app.js
    server.js
  .env.example
  package.json
```

## Application Flow

### Frontend flow

- `src/main.jsx` boots the React application and configures the router
- `src/components/App/App.jsx` defines the application shell, navigation, auth state, and routes
- `src/pages/DashboardPage.jsx` loads transaction data and displays spending impact cards
- `src/pages/CommunityGoalsPage.jsx` shows community initiative progress
- `src/utils/impactLogic.js` and `src/utils/impactNarrative.js` convert transaction amounts into impact metrics and readable summaries

### Data flow

1. The user opens the dashboard
2. The app attempts to load transaction data through `src/utils/ynabApi.js`
3. Development can use configured YNAB API credentials
4. Production uses demo data so no private API token is exposed
5. The dashboard calculates impact metrics and renders the updated UI

### Planned backend flow

- `backend/src/server.js` will load environment variables, connect to MongoDB, and start the server
- `backend/src/app.js` will configure middleware and register API routes
- `backend/src/routes/` will contain API route handlers, including YNAB integration routes
- `backend/src/models/` will contain Mongoose schemas such as `User.js`

## Getting Started

### Prerequisites

- Node.js
- npm
- Optional YNAB API credentials for local development
- MongoDB connection string for planned backend development

### Installation

```bash
git clone git@github.com:beamendivil/SocialImpact.git
cd SocialImpact
npm install
```

### Environment Variables

Create a local `.env` file if you want to test against YNAB during development.

```env
VITE_YNAB_API_URL=https://api.ynab.com/v1
VITE_YNAB_API_KEY=your_ynab_api_key
```

Planned backend variables:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
YNAB_API_KEY=your_ynab_api_key
```

### Run Locally

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

### Test

```bash
npm test
```

## Deployment

Live demo: [https://beamendivil.github.io/SocialImpact/](https://beamendivil.github.io/SocialImpact/)

```bash
npm run deploy
```

## Current Status

This project is actively being developed. The current version establishes the frontend foundation, including:

- client-side routing
- transaction loading with YNAB/demo-data support
- impact calculation utilities
- dashboard summary cards
- community goal tracking
- simulated authentication for prototype review
- deployment to GitHub Pages

Planned improvements may include:

- Node.js/Express backend API
- MongoDB and Mongoose data modeling
- persistent user and transaction data support
- real authentication and user accounts
- richer transaction categorization logic
- expanded social impact scoring
- analytics and reporting views
- expanded automated test coverage

## What I Focused On

This project reflects my focus on:

- building a clean frontend foundation with room for full-stack expansion
- organizing application flow clearly between routes, utilities, and data-loading logic
- integrating third-party financial data into a custom product concept
- designing software around both technical execution and meaningful user impact

## Resume Summary

Built a React/Vite financial impact dashboard that integrates YNAB-style transaction data, calculates local-spending impact metrics, and visualizes community goal progress through a responsive multi-page UI deployed on GitHub Pages. Planned the next full-stack phase around a Node.js/Express API, MongoDB persistence, and server-side financial data integration.

## Author

Built by Bea Mendivil.
