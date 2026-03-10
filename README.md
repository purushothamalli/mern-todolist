# 📝 Full-Stack MERN Todo Application

A modern, secure, and responsive Todo management application built with the **MERN Stack** (MongoDB, Express, React, Node.js). This project features a robust authentication system and a clean, user-friendly interface.

---

## 🚀 Features

- **Secure Authentication:** Implementation of JWT-based authentication with **Access Tokens** and **Refresh Tokens** for a seamless and secure login experience.
- **Persistent Sessions:** Uses HttpOnly cookies to securely store refresh tokens, protecting against XSS attacks.
- **Full CRUD Functionality:** Create, view, update, and delete todos with a real-time responsive UI.
- **Advanced API Handling:** Custom **Axios Interceptors** to handle automatic token refreshing and private route protection.
- **Responsive Design:** Built with **Bootstrap 5**, ensuring the application looks great on desktops, tablets, and mobile devices.
- **Modern React:** Utilizes React 19, Hooks (useState, useEffect, useContext), and custom hooks for clean, maintainable code.

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

## 🔧 Installation & Local Setup

### 1. Clone the repository
```bash
git clone https://github.com/purushothamalli/mern-todolist
cd mern-todolist
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` folder and add:
```env
PORT=4000
DB_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_secret_key
REFRESH_TOKEN_SECRET=your_refresh_secret_key
FRONTEND_URL=http://localhost:5173
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```
Create a `.env` file in the `frontend` folder and add:
```env
VITE_API_URL=http://localhost:4000/api
```

### 4. Run the Application
- **Backend:** `cd backend && npm run dev`
- **Frontend:** `cd frontend && npm run dev`

---

## 🌐 Deployment

This application is architected to be deployment-ready:
- **Database:** Hosted on **MongoDB Atlas**.
- **Backend:** Deployed on **Render** (Root: `backend`).
- **Frontend:** Deployed on **Vercel** (Root: `frontend`).

---

## 👨‍💻 Author
**A.Purushotham**
- LinkedIn: https://www.linkedin.com/in/purushotham-alli-34962739b
- Portfolio: https://purushothamalli.github.io/MyPortfolio/

---

*Note: This project was built to demonstrate proficiency in full-stack development, specifically focusing on secure authentication flows and modern React architectural patterns.*
