# React + Vite

# Product Management System

A full-stack Product Management System built using React.js, Node.js, Express.js, and MongoDB.

## Features

- User Authentication
  - Sign Up
  - Sign In

- Product Management
  - Add Product
  - View Products
  - View Product Details
  - Edit Product
  - Delete Product

- Category Management
  - Add Category
  - View Categories
  - Delete Category

## Tech Stack

### Frontend
- React.js
- React Router DOM
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js

### Database
- MongoDB

## Installation


### Frontend Setup

cd Frontend

npm install

npm run dev

### Backend Setup

cd Server

npm install

npm start

## Environment Variables

Create a .env file inside Server folder

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

## Project Structure

Frontend/
├── src/
├── components/
└── services/

Server/
├── controllers/
├── models/
├── routes/
├── middleware/
└── server.js

## API Endpoints

### Authentication

POST /register

POST /login

### Products

GET /products

POST /products

PUT /products/:id

DELETE /products/:id

### Categories

GET /categories

POST /categories

DELETE /categories/:id

## Screenshots

Add screenshots here

## Author

Aswin C
