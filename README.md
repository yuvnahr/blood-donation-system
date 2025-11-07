# Blood Donation Management System

A full-stack web application that streamlines blood donation workflows for hospitals and organizations. It supports managing donors, recipients, blood inventory, donation records, and hospital analytics.

---

## Features

### Backend (Node.js + Express)

* RESTful API architecture with modular route structure
* SQL procedures, triggers, and functions integrated with MySQL
* Uses MySQL2 connection pooling for efficient DB operations
* Centralized database config and environment variable support

### Database (MySQL)

* Relational schema with strong foreign key integrity
* Stored Procedures:

  * `AddBloodDonation`
  * `IssueBlood`
  * `RegisterRecipient`
* Triggers for automated updates to camp units and transaction auditing
* Views for hospital inventory summary dashboards

### Frontend (React)

* React + Axios + React Router SPA
* Pages:

  * Dashboard
  * Donors
  * Recipients
  * Blood Inventory
  * Add Donation / Issue Blood
* Interactive UI for CRUD and analytics operations

---

## Tech Stack

| Layer      | Technology                                 |
| ---------- | ------------------------------------------ |
| Frontend   | React, Axios, React Router                 |
| Backend    | Node.js, Express.js, dotenv, cors, mysql2  |
| Database   | MySQL with triggers, procedures, functions |
| Deployment | GitHub Codespaces or Localhost             |

---

## Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yuvnahr/blood-donation-system.git
cd blood-donation-system
```

### 2️⃣ Import Database

Start MySQL and run:

```bash
mysql -u root -p < sql/blood_donation_tables_v3.sql
```

This file creates all tables, triggers, procedures, and dummy data.

### 3️⃣ Setup Backend

```bash
cd backend
npm install
```

Create `.env`:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASS=root123
DB_NAME=blood_org_db
```

Run backend:

```bash
npm start
```

Test:

```
http://localhost:5000/api/donors
```

### 4️⃣ Setup Frontend

```bash
cd ../frontend
npm install
npm start
```

The app opens at:

```
http://localhost:3000
```

---

## API Overview

| Endpoint                   | Method | Description                |
| -------------------------- | ------ | -------------------------- |
| `/api/donors`              | GET    | List all donors            |
| `/api/recipients`          | GET    | List all recipients        |
| `/api/inventory`           | GET    | Blood stock by hospital    |
| `/api/analytics/summary`   | GET    | Dashboard summary          |
| `/api/procedures/donation` | POST   | Add a new blood donation   |
| `/api/procedures/issue`    | POST   | Issue blood to a recipient |

---

## Troubleshooting

| Issue                  | Fix                                                   |
| ---------------------- | ----------------------------------------------------- |
| MySQL Access Denied    | Update root password and enable native auth           |
| Axios Network Error    | Ensure backend URL matches Codespaces public endpoint |
| Backend not responding | MySQL service must be running before `npm start`      |
| Port already in use    | Kill process or run frontend on next available port   |

---

## Development Notes

* Use environment variables for DB credentials
* Keep ports 3000 (frontend) & 5000 (backend) open/public in Codespaces
* API follows REST conventions for maintainability

---

## Contributing

Pull requests welcomed.
Please follow conventional commit messages and feature-branch workflow.

---

## License

MIT License © 2025 [@yuvnahr](https://github.com/yuvnahr)

