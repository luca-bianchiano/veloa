# 🛍️ **Veloa**
### _A modern e-shop platform built with Next.js, Express, Prisma, and Redis_

---

## 🌟 Overview

**Veloa** is a full-stack e-commerce project designed for scalability and performance.  
It combines a sleek **Next.js** frontend with a robust **Express.js** backend, powered by **Prisma** ORM and **Redis** caching.

The project is split into two main parts:
- 🖥️ **Frontend:** Built with **Next.js**
- ⚙️ **Backend:** Built with **Express.js**, **Prisma**, and **Redis**

---

## 🧱 Tech Stack

### **Frontend**
- ⚛️ Next.js (React framework)
- 💅 TailwindCSS (styling)
- 🔄 Axios (API communication)

### **Backend**
- 🚀 Express.js
- 🧩 Prisma ORM
- ⚡ Redis (for caching and sessions)
- 🗃️ PostgreSQL / MySQL (database support)
- 🧰 Node.js environment

---

## 📂 Project Structure
```plaintext
Veloa/
├── shop-frontend/ # Next.js frontend
└── shop-backend/ # Express + Prisma + Redis backend
```

## 🛠️ Setup & Usage

### 1️⃣ Start the Backend
```bash
cd shop-backend
cp .env.example .env   # Copy environment template
# 📝 Edit .env to set your custom parameters (DB URL, Redis URL, etc.)
npm install
npm start
```
### 2️⃣ Start the Frontend
```bash
cd shop-frontend
npm install
npm start
```