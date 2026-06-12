# 📝 MERN Todo Application

Hi, My name is **A.Purushotham**.

This is **MERN Todo**, a task management application designed for productivity with a sleek and minimal interface, secured with advanced dual-token authentication.

---

## 💡 Frictionless Development Features

- **Auto-Environment Setup:** No need to manually create `.env` files; the setup script generates them for you with secure random secrets.
- **Single-Command Startup:** Use `npm run dev` in the root to launch the entire stack.
- **Concurrent Logs:** View both frontend and backend logs in a single terminal window.

---

## 🚀 Features

- **Secure Authentication:** Implementation of JWT-based authentication with **Access Tokens** and **Refresh Tokens** for a seamless and secure login experience.
- **Persistent Sessions:** Uses HttpOnly cookies to securely store refresh tokens, protecting against XSS attacks.
- **Full CRUD Functionality:** Create, view, update, and delete todos with a real-time responsive UI.
- **Advanced API Handling:** Custom **Axios Interceptors** to handle automatic token refreshing and private route protection.
- **Responsive Design:** Built with **Bootstrap 5**, ensuring the application looks great on desktops, tablets, and mobile devices.
- **Modern React:** Utilizes React 19, Hooks (useState, useEffect, useContext), and custom hooks for clean, maintainable code.

---

---

## 🔧 Installation & Local Setup (Zero-Friction)

We've simplified the setup process so you can get started in seconds.

### 1. Clone & Install Everything

One command to install dependencies and run the **Interactive Setup**.

```bash
git clone https://github.com/purushothamalli/mern-todolist
cd mern-todolist
npm install
```

_Note: The `npm install` command triggers an interactive CLI that will ask you for your database URI and preferred ports, automatically generating secure secrets for you._

### 2. Configure Database

Open `backend/.env` and update your `DB_URI` if you are using MongoDB Atlas (it defaults to local MongoDB).

### 3. Run the Application

Start both the Backend and Frontend with a single command:

```bash
npm run dev
```

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:4000

---

### 🐳 Alternative: Run with Docker (Instant Setup)

If you have Docker installed, you don't even need to install Node.js locally:

```bash
docker-compose up --build
```

This will spin up the MongoDB database, Backend, and Frontend all at once.

---

## 🛠️ Tech Stack

**Frontend:**

- **React 19** & **Vite**
- **React Router 7** (Navigation)
- **Bootstrap 5** (Styling)
- **Axios** (API Requests with Interceptors)
- **Context API** (State Management)

**Backend:**

- **Node.js** & **Express 5**
- **MongoDB** & **Mongoose** (Database Modeling)
- **JSON Web Tokens (JWT)** (Security)
- **Bcrypt** (Password Hashing)
- **Cookie-Parser** (Secure Cookie Handling)

---

## 👨‍💻 Author

**A.Purushotham**

- LinkedIn: https://www.linkedin.com/in/purushotham-alli-34962739b
- Portfolio: https://purushothamalli.github.io/MyPortfolio/

---

_Note: This project was built to demonstrate proficiency in full-stack development, specifically focusing on secure authentication flows and modern React architectural patterns._
