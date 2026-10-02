# Electronics Store – Frontend

Modern React frontend for a full-stack Electronics Store application.

The application provides a responsive shopping experience with product browsing, authentication, cart management, checkout, order tracking, customer reviews, and an admin dashboard.

## 🚀 Technologies

* React
* Vite
* Tailwind CSS
* JavaScript
* React Router
* REST API
* Git & GitHub

## ✨ Features

### Customer Experience

* Responsive home page
* Product browsing
* Product details
* Product search and filtering
* Shopping cart
* Quantity management
* Checkout
* Order history
* Order details
* Customer reviews
* Brand showcase

### Authentication

* User registration
* User login
* JWT-based authentication
* Protected routes
* Customer and Admin roles

### Admin Dashboard

* Product management
* Add products
* Edit products
* Delete products
* View orders
* Update order status
* Stock management

### Cart & Orders

* Persistent shopping cart
* Stock-aware quantity management
* Checkout validation
* Automatic cart clearing after successful checkout
* Order tracking

## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/AZZ687/electronics-store-frontend.git
cd electronics-store-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

## 🔗 Backend API

This frontend communicates with the ASP.NET Core backend:

**Electronics Store Backend**

https://github.com/AZZ687/electronics-store-backend

The backend provides:

* Authentication
* Product APIs
* Order APIs
* Admin APIs
* SQL Server database integration
* JWT authorization

## 📁 Project Structure

```text
electronics-store-frontend/
│
├── public/
│
├── src/
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── services/
│   ├── App.jsx
│   └── main.jsx
│
├── package.json
├── vite.config.js
├── index.html
├── .gitignore
└── README.md
```

## 🔐 Authentication

Authentication tokens are stored locally in the browser after successful login and are sent with protected API requests using the Authorization header.

Sensitive backend configuration is not stored in the frontend repository.

## 📱 Responsive Design

The interface is designed to work across:

* Desktop
* Tablet
* Mobile

## 📌 Project

This project was developed as a full-stack portfolio application to demonstrate practical experience with modern frontend development, REST APIs, authentication, e-commerce functionality, responsive UI design, and Git-based development.
