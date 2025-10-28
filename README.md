# 🩸 Blood Donation Management System

A full-stack web application designed to streamline blood donation management for hospitals and organizations. It allows tracking of donors, recipients, inventory, and hospital analytics through a clean React-based frontend, an Express.js backend, and a MySQL database.

---

## 🚀 Features

### 🧩 Backend (Node.js + Express)

* RESTful API built with Express
* Routes for donors, recipients, inventory, analytics, and stored procedures
* MySQL2 integration with a connection pool for efficient queries
* Built-in stored procedures, triggers, and functions for data consistency

### 🩸 Database (MySQL)

* Complete relational schema with foreign key constraints
* Stored procedures:

  * `AddBloodDonation`
  * `IssueBlood`
* Functions for:

  * Validating blood types
  * Calculating donor eligibility
  * Counting available blood units per type
* Triggers to ensure automatic updates to inventory and donation history

### 💻 Frontend (React)

* Built using **React + Axios + React Router**
* Pages:

  * Dashboard
  * Donors
  * Recipients
  * Inventory
  * Add Donation / Issue Blood
* Uses Axios to communicate with the backend API

---

## 🛠️ Tech Stack

| Layer                  | Technology                                       |
| ---------------------- | ------------------------------------------------ |
| **Frontend**           | React, Axios, React Router                       |
| **Backend**            | Node.js, Express.js, dotenv, cors, mysql2        |
| **Database**           | MySQL (with triggers, procedures, and functions) |
| **Hosting (optional)** | GitHub Codespaces or Localhost                   |

---

## ⚙️ Setup Instructions

### 🧱 1. Clone the repository

```bash
git clone https://github.com/yuvnahr/blood-donation-system.git
cd blood-donation-system
```

### 🩸 2. Import the MySQL Database

Open MySQL and run:

```bash
mysql -u root -p
SOURCE sql/blood_donation_tables_v3.sql;
```

This creates all required tables, triggers, and procedures with dummy data.

---

### 🖥️ 3. Setup the Backend

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASS=root123
DB_NAME=blood_org_db
```

Then start the backend:

```bash
npm start
```

✅ You should see: `Server running on port 5000`

Test in your browser:

```
http://localhost:5000/api/donors
```

---

### 🌐 4. Setup the Frontend

```bash
cd ../frontend
npm install
```

Open `frontend/src/api.js` and update your backend URL:

```js
const API_BASE_URL = "http://localhost:5000/api";
```

Then start the frontend:

```bash
npm start
```

The app will open at:

```
http://localhost:3000
```

---

## 🧠 Common Fixes

### ❌ Access Denied (MySQL)

Reset MySQL root password:

```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root123';
FLUSH PRIVILEGES;
```

### ❌ Network Error (Axios)

Ensure backend URL in `api.js` matches your backend host (`localhost` or Codespace public URL).

### ❌ 404 Error

Verify backend routes start with `/api` and `api.js` baseURL includes `/api`.

---

## 🧩 API Overview

| Endpoint                   | Method | Description                 |
| -------------------------- | ------ | --------------------------- |
| `/api/donors`              | GET    | List all donors             |
| `/api/recipients`          | GET    | List all recipients         |
| `/api/inventory`           | GET    | Get current blood inventory |
| `/api/analytics/summary`   | GET    | Get hospital summary        |
| `/api/procedures/donation` | POST   | Add a new blood donation    |
| `/api/procedures/issue`    | POST   | Issue blood to a recipient  |

---

## 🧰 Development Notes

* Run MySQL before starting the backend.
* Make sure ports 3000 (frontend) and 5000 (backend) are not blocked.
* For GitHub Codespaces, set both ports as **Public** in the Ports tab.

---

## 🤝 Contributing

Pull requests are welcome! Please follow conventional commit messages and branch naming standards.

---

## 📜 License

MIT License © 2025 [@yuvnahr](https://github.com/yuvnahr)

---

### 🩸 Summary

This project demonstrates a complete **end-to-end MERN-style system (React + Express + MySQL)**, featuring triggers, stored procedures, and a modern frontend — ideal for learning full-stack development and relational data management.
