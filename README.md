[![Build Status](https://travis-ci.org/steffencrespo/car-purchase-decision.svg?branch=master)](https://travis-ci.org/steffencrespo/car-purchase-decision)
[![GitHub Pages](https://img.shields.io/badge/view-demo-blue?logo=github)](https://steffencrespo.github.io/car-purchase-decision/)

# 📊 What Car Am I Going to Buy?

> Lots of cars, lots of options — hard to make the right choice.

---

## 🚗 Purpose

When you're shopping for a new car, spreadsheets or paper notes often fall short.
This app helps you visualize your options in one place, store preferences, and track decision progress.

---

## 🧭 How to Use This App

1. Login with your credentials or use seeded users (e.g. test1 / 12345)
2. Add cars with relevant details: make, model, engine, price, seller, etc.
3. View your saved cars in a card layout
4. Delete cars that are no longer candidates
5. (Coming soon) Compare side-by-side, evaluate financing, etc.

---

## ▶️ Running Locally

### ✅ Prerequisites

- Node.js
- MongoDB 7.x running locally

### 📦 Setup

```bash
npm install
```

### 🌱 Seed example users and cars

```bash
npm run seed
```

This will:
- Clear all users
- Create two users: `test1` and `test2`
- Add two sample cars to each

### 🚀 Start the app

```bash
npm run start
```

The frontend is served from Vite (localhost:5173) and the backend from Express (localhost:8080).

---

## 💻 Tech Stack

- React + Vite
- Tailwind CSS (Dark mode supported)
- Node.js / Express
- MongoDB / Mongoose
- Passport (auth)
- Mocha + Chai (tests)

---

## 📂 Project Structure

```
car-purchase-decision/
├── backend/
│   ├── auth/            # Auth logic
│   ├── users/           # User model and routes
│   ├── datasets/        # Optional car datasets
│   ├── scripts/         # Seed and user creation scripts
│   ├── server.js        # Main Express server
│   └── config.js
├── frontend/
│   ├── src/
│   │   ├── components/  # React components (forms, list)
│   │   ├── images/      # Sample car images
│   │   └── App.jsx
│   └── index.html
├── test/
│   └── *.js             # Mocha test suites
├── legacy/              # Old HTML + jQuery UI (archived)
└── .env.example         # Env config template
```

---

## 🔐 API Reference

### Users
| Method | Endpoint                     | Description                    |
|--------|------------------------------|--------------------------------|
| POST   | `/api/users`                 | Register a user                |
| GET    | `/api/users/userId/:name`    | Get user ID by username        |

### Auth
| Method | Endpoint            | Description              |
|--------|---------------------|--------------------------|
| POST   | `/api/auth/login`   | Get auth token (Basic)   |
| POST   | `/api/auth/refresh` | Refresh auth token       |

### Cars
| Method | Endpoint                    | Description             |
|--------|-----------------------------|-------------------------|
| GET    | `/purchaseList/:userId`     | Get cars by user        |
| POST   | `/purchaseList`             | Add a new car           |
| PUT    | `/purchaseList/:carId`      | Update a car            |
| DELETE | `/purchaseList/:carId`      | Delete a car            |

---

## 🧪 Testing

```bash
npm run test
```

Tests backend endpoints using Mocha and Chai.

---

## 📌 Roadmap

- [x] Tailwind CSS with dark mode
- [x] JWT auth with persistent session
- [x] Seed script for users and cars
- [ ] Compare cars side-by-side
- [ ] Estimate financing per model
- [ ] Add image upload per car

---

## 📄 License

MIT — feel free to fork and adapt.

---

## 👤 Author

**Leo Steffen**  
[GitHub @steffencrespo](https://github.com/steffencrespo)