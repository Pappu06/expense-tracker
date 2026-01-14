# 💸 Expense Tracker – Full Stack Web Application

A full-stack **Expense Tracker Web App** built using **React (Vite)**, **Node.js**, **Express**, and **MongoDB**.  
This application allows users to **register with OTP verification**, **login securely**, and **manage their personal expenses** through a protected dashboard.

---

## 🚀 Features

### 🔐 Authentication & Security
- User Signup with **Email OTP Verification**
- Secure Login using Email & Password
- Only **verified users** can access the dashboard
- Protected routes (unauthorized users redirected to login)

### 👤 User Profile
- View logged-in user profile (Name, Email, Mobile)
- Profile stored in MongoDB
- Session maintained using `localStorage`

### 💰 Expense Management
- Add Income & Expenses
- Categorize expenses (Food, Travel, Shopping, etc.)
- Track Date & Time of expenses
- View balance, total income, and total expense
- Each user sees **only their own expenses**

### 🧩 Tech Stack
**Frontend**
- React (Vite)
- React Router
- Tailwind CSS
- Ant Design
- Axios

**Backend**
- Node.js
- Express.js
- MongoDB + Mongoose
- Nodemailer (OTP emails)
- dotenv, cors

---

## 📂 Project Structure

