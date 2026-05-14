# Social Impact (Community ROI Tracker)

**Social Impact** is a full-stack personal finance dashboard that shifts the focus from simple budgeting to community empowerment. By integrating with the YNAB API, this application calculates the "multiplier effect" of local spending, providing users with a narrative of how their financial choices support local jobs and public services.

---

## 🚀 Concept & Purpose

Traditional financial apps focus on personal wealth. **Social Impact** focuses on community wealth. It answers the question: _"How did my spending actually help my neighborhood today?"_

### Key Features

- **YNAB Integration:** Pulls real-time transaction data from your budget.
- **Impact Narrative:** Logic-based text generation that translates dollar amounts into community stories.
- **Collective Goals:** Visualization of how a group of users contributes to shared community milestones (e.g., funding a community garden).

---

## 🛠️ Tech Stack

- **Frontend:** React.js, Vite, React Router
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Styling:** CSS (BEM Methodology)
- **Third-Party API:** [YNAB API](https://api.ynab.com/)

---

## Development

```bash
npm install
npm run dev
```

## Deployment

Live demo: [https://beamendivil.github.io/SocialImpact/](https://beamendivil.github.io/SocialImpact/)

```bash
npm run deploy
```

## 🏗️ Project Structure

This repository contains the **Frontend** implementation for the TripleTen Final Project.

```text
/src
  /components      # Reusable UI elements (Header, Footer, Button, etc.)
  /pages           # Main views (Dashboard, CommunityGoals)
  /utils           # Impact calculation logic and API services
  /vendor          # Fonts and third-party assets
```
## ✅ Stage 1 Checklist
- [x] Initialize Vite/React environment
- [x] Implement BEM-compliant styling
- [x] Add YNAB API request utilities with native `fetch()`
- [x] Render API/demo transaction responses on the dashboard
- [x] Show a preloader, empty state, and request error message
- [x] Render transaction cards three at a time with a "Show more" control
- [x] Simulate login and token-check responses for instructor access
- [x] Simulate saved community goal API responses for future backend work
- [x] Build "Impact Narrative" logic engine
- [x] Deploy frontend to GitHub Pages
- [ ] Submit the pull request from `stage-1-frontend-and-api` to `main`
