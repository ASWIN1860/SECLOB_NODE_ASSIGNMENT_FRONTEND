# React + Vite

# Product Management Application

A full-stack Product Management Application developed as part of a technical assessment using React.js, Node.js, Express.js, MongoDB, and Tailwind CSS.

---

## Live Demo

Frontend: https://your-vercel-link.vercel.app

Backend: https://your-render-link.onrender.com

---

## GitHub Repositories

### Frontend Repository

https://github.com/ASWIN1860/SECLOB_NODE_ASSIGNMENT_FRONTEND.git

### Backend Repository

https://github.com/ASWIN1860/SECLOB_NODE_ASSIGNMENT_BACKEND.git

---

## Features

### Authentication

- User Signup
- User Login
- JWT Authentication
- Protected Routes

### Category Management

- Add Category
- View Categories

### Sub Category Management

- Add Sub Category
- View Sub Categories
- Category-wise Sub Category Mapping

### Product Management

- Add Product
- View All Products
- View Single Product Details
- Update Product

### Product Variants

- Multiple RAM Variants
- Variant-wise Price
- Variant-wise Quantity

### Product Listing

- Product Search
- Sub Category Filter
- Pagination

### Wishlist

- Add Product to Wishlist
- View Wishlist
- Remove Product from Wishlist

### UI Features

- Responsive Design
- Product Detail Page
- Variant Selection
- Toast Notifications

---

## Tech Stack

### Frontend

- React.js
- React Router DOM
- Axios
- Tailwind CSS
- React Toastify
- React Icons

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT

### Deployment

- Frontend : Vercel
- Backend : Render
- Database : MongoDB Atlas

---

## Project Structure

### Frontend

src/

├── components/

├── pages/

├── services/

├── App.jsx

└── main.jsx

### Backend

server/

├── Controllers/

├── Models/

├── Routes/

├── Config/

└── index.js

---

## Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=3000

MONGO_URI=your_mongodb_connection_string

SECRET_KEY=your_secret_key
```

---

## API Endpoints

### Authentication

- POST /signup
- POST /signin

### Categories

- POST /add-category
- GET /all-category

### Sub Categories

- POST /add-subcategory
- GET /all-subcategory

### Products

- POST /add-products
- GET /all-products
- GET /single-product/:id
- PUT /product/:id

### Wishlist

- POST /add-wishlist
- GET /wishlist/:userId
- DELETE /wishlist/:id

---

## Pagination Implementation

Pagination is implemented on the backend using MongoDB `skip()` and `limit()` methods.

Features:

- Server-side Pagination
- Dynamic Page Numbers
- Previous / Next Navigation
- Total Page Calculation

---

## AI Usage Disclosure

AI-assisted development tools were used for:

- Code suggestions
- UI implementation guidance
- Debugging support
- Documentation preparation

All application logic, integrations, testing, and final implementation decisions were manually reviewed, modified, and validated before submission.

---

## Author

**Aswin C**

MERN Stack Developer
