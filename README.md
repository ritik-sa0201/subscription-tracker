# 📊 Subscription Tracker & Renewal Dashboard

A full-stack web app for tracking recurring SaaS and streaming subscriptions — renewal dates, monthly burn rate, and upcoming charges — so nothing renews without you knowing about it.

![Node](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-Frontend-646CFF?logo=vite&logoColor=white)
![Express](https://img.shields.io/badge/Express-Backend-000000?logo=express&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue.svg)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
- [Business Logic](#business-logic)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

Subscription Tracker helps you stay on top of every recurring payment in one place. Add a subscription once, and the dashboard automatically normalizes yearly plans into a monthly-equivalent cost, flags anything renewing in the next 7 days, and keeps a running total of your monthly burn — all without deleting your history when you pause a service.

## Features

- ➕ **Add subscriptions** — service name, cost, billing cycle (monthly/yearly), and next renewal date
- 💰 **Monthly burn rate** — live total across all active subscriptions
- 🔁 **Cost normalization** — yearly plans are automatically converted to a monthly-equivalent value for accurate totals
- ⏰ **Renewal alerts** — subscriptions renewing within 7 days are automatically flagged as "Renewing Soon"
- ⏸️ **Pause / resume** — pause a subscription without losing its data; paused items are excluded from burn calculations
- 🗄️ **Non-destructive storage** — paused subscriptions are preserved, never deleted
- ✅ **Server-side validation** — all business logic and input validation is enforced on the backend, not just the UI
- 🔌 **REST API** — clean separation between frontend and backend via a JSON API

## Tech Stack

| Layer     | Technologies                                  |
|-----------|------------------------------------------------|
| Frontend  | React, JavaScript, Vite, CSS                   |
| Backend   | Node.js, Express.js, REST APIs                 |
| Storage   | JSON-based file persistence                    |

## Project Structure

```text
subscription-tracker/
│
├── frontend/                  # React + Vite client
│   ├── src/
│   │   ├── components/        # UI components (cards, forms, alerts, etc.)
│   │   ├── services/          # API client calls to the backend
│   │   ├── utils/              # Formatting, date, and currency helpers
│   │   └── App.jsx
│   └── package.json
│
├── backend/                   # Node.js + Express API
│   ├── src/
│   │   ├── controllers/       # Request handlers
│   │   ├── routes/            # Express route definitions
│   │   ├── services/          # Business logic (burn rate, normalization, alerts)
│   │   ├── utils/              # Shared helper functions
│   │   ├── data/              # JSON persistence layer
│   │   └── server.js
│   └── package.json
│
└── README.md
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher

### 1. Clone the repository

```bash
git clone https://github.com/your-username/subscription-tracker.git
cd subscription-tracker
```

### 2. Install dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 3. Run the backend

```bash
cd backend
npm run dev
```

The API server starts on `http://localhost:5000` by default.

### 4. Run the frontend

```bash
cd frontend
npm run dev
```

The app is available at `http://localhost:5173` by default.

## Environment Variables

Create a `.env` file inside `backend/` with the following:

| Variable      | Description                          | Default |
|---------------|---------------------------------------|---------|
| `PORT`        | Port the Express server listens on    | `5000`  |
| `DATA_FILE`   | Path to the JSON persistence file     | `./src/data/subscriptions.json` |

## API Reference

Base URL: `http://localhost:5000/api`

| Method | Endpoint                        | Description                                   |
|--------|----------------------------------|------------------------------------------------|
| GET    | `/subscriptions`                | List all subscriptions                         |
| GET    | `/subscriptions/:id`            | Get a single subscription by ID                |
| POST   | `/subscriptions`                | Create a new subscription                       |
| PUT    | `/subscriptions/:id`            | Update an existing subscription                 |
| PATCH  | `/subscriptions/:id/pause`      | Pause a subscription                             |
| PATCH  | `/subscriptions/:id/resume`     | Resume a paused subscription                     |
| DELETE | `/subscriptions/:id`            | Permanently delete a subscription                |
| GET    | `/summary/burn-rate`            | Get total normalized monthly burn rate           |
| GET    | `/summary/renewing-soon`        | Get subscriptions renewing within 7 days         |

**Example — create a subscription**

```bash
curl -X POST http://localhost:5000/api/subscriptions \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Netflix",
    "cost": 15.99,
    "billingCycle": "monthly",
    "nextRenewalDate": "2026-09-01"
  }'
```

## Business Logic

- **Cost normalization**: Yearly subscriptions are converted to a monthly-equivalent cost using `cost / 12`, so the burn rate always reflects an accurate monthly average regardless of billing cycle.
- **Renewing Soon**: A subscription is flagged if `nextRenewalDate` falls within 7 days of the current date.
- **Paused subscriptions**: Paused items are excluded from the monthly burn calculation but remain in storage with a `paused: true` flag, preserving history and renewal data for future reactivation.
- **Validation**: All input (cost, billing cycle, dates) is validated server-side before persistence, independent of any frontend checks.

## Roadmap

- [ ] User authentication and multi-user support
- [ ] Email/push notifications for upcoming renewals
- [ ] Category tagging (streaming, productivity, etc.)
- [ ] Spending analytics and historical trend charts
- [ ] Migration from JSON file storage to a database (PostgreSQL/MongoDB)

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m "Add your feature"`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## License

This project is licensed under the [MIT License](LICENSE).
