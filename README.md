# MERN Book Management System

A full-stack book management application built with MongoDB, Express.js, React.js, and Node.js.

## Features

- ✅ Add, view, update, and delete books
- ✅ Filter books by genre and status
- ✅ Search books by title or author
- ✅ Responsive design with Tailwind CSS
- ✅ RESTful API with Express.js
- ✅ MongoDB database with Mongoose

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   \`\`\`bash
   cd backend
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Create a `.env` file and add your MongoDB connection string:
   \`\`\`
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/bookmanagement
   NODE_ENV=development
   \`\`\`

4. Start the server:
   \`\`\`bash
   npm run dev
   \`\`\`

### Frontend Setup

1. Navigate to the frontend directory:
   \`\`\`bash
   cd frontend
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

The frontend will run on `http://localhost:3000` and the backend on `http://localhost:5000`.

## API Endpoints

- `GET /api/books` - Get all books (with optional filtering)
- `GET /api/books/:id` - Get single book
- `POST /api/books` - Create new book
- `PUT /api/books/:id` - Update book
- `DELETE /api/books/:id` - Delete book

## Getting Started with Sample Data

After setting up both frontend and backend, you can populate your database with sample books using the provided script:

\`\`\`bash
cd backend
node scripts/seedDatabase.js
\`\`\`

This will add some sample books to help you test the application features.

## Book Schema

\`\`\`javascript
{
  title: String (required),
  author: String (required),
  genre: String (enum: Fiction, Non-Fiction, Mystery, etc.),
  status: String (enum: Read, Reading, Want to Read),
  dateAdded: Date,
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

## Technologies Used

- **Frontend**: React.js, Tailwind CSS, Vite
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **HTTP Client**: Fetch API
