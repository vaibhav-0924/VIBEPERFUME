# VIBE PERFUME - Luxury Storefront

A modern, high-end perfume storefront built with the MERN stack (MongoDB, Express, React, Node.js). This project showcases a premium user experience with detailed product information, a review system, and a responsive design.

## Features

- **Storefront Homepage**: Featuring a high-impact hero banner and curated product grids.
- **Product Filtering**: Category-based client-side filtering (Woody, Floral, etc.).
- **Rich Product Detail Page**: Includes an image gallery with lightbox, size selection, and detailed fragrance notes.
- **Interactive Review System**: Users can read and submit reviews with star ratings and real-time updates.
- **Social Sharing**: Integrated Web Share API with clipboard fallback for easy sharing.
- **Responsive Design**: Optimized for mobile (375px), tablet (768px), and desktop (1280px).
- **Modern Tech Stack**: React (TypeScript), Express.js, MongoDB (Mongoose), and CSS Modules.

## Tech Stack

- **Frontend**: React 18+, React Router 6, Vite, Axios, Lucide Icons, React Hot Toast, Yet Another React Lightbox.
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), Express Validator.
- **Styling**: Vanilla CSS with modern flex/grid layouts and glassmorphism.

## Prerequisites

- Node.js (v18 or higher)
- MongoDB instance (Local or Atlas)

## Getting Started

### 1. Clone the repository
```bash
git clone <repository-url>
cd perfume-shop
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/perfume_shop
NODE_ENV=development
```

### 3. Seed the Database
```bash
npm run seed
```

### 4. Frontend Setup
```bash
cd ../frontend
npm install
```
Create a `.env` file in the `frontend` directory:
```env
VITE_API_URL=http://localhost:5000/api
```

### 5. Run the Application

**Start Backend:**
```bash
cd ../backend
npm run dev
```

**Start Frontend:**
```bash
cd ../frontend
npm run dev
```

The application will be available at `http://localhost:5173`.
The API will be available at `http://localhost:5000/api`.

## License

This project is licensed under the MIT License.
