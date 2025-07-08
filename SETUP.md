# Book Management System - Setup Guide

## Prerequisites

1. **Node.js** (v16 or higher)
2. **MongoDB** (v4.4 or higher)
3. **npm** or **yarn** package manager

## Installation Steps

### 1. Install MongoDB

#### Windows:
1. Download MongoDB Community Server from [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
2. Run the installer and follow the setup wizard
3. Make sure MongoDB service is running

#### macOS:
```bash
brew install mongodb-community
brew services start mongodb-community
```

#### Linux (Ubuntu):
```bash
sudo apt update
sudo apt install mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

### 2. Clone and Setup Project

```bash
# Navigate to your project directory
cd book

# Install backend dependencies
cd backend
npm install

# Create .env file for backend
echo "PORT=5000
MONGODB_URI=mongodb://localhost:27017/bookmanagement
NODE_ENV=development" > .env

# Install frontend dependencies
cd ../frontend
npm install
```

### 3. Start the Application

#### Terminal 1 - Start Backend:
```bash
cd backend
npm run dev
```

#### Terminal 2 - Start Frontend:
```bash
cd frontend
npm run dev
```

### 4. Seed the Database (Optional)

To populate the database with sample books:

```bash
cd backend
npm run seed
```

## Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## Available Scripts

### Backend Scripts:
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm run seed` - Seed database with sample books
- `npm run clear` - Clear all books from database

### Frontend Scripts:
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Troubleshooting

### MongoDB Connection Issues:
1. Ensure MongoDB is running: `mongod --version`
2. Check if MongoDB service is started
3. Verify connection string in `.env` file

### Port Issues:
- If port 5000 is in use, change PORT in backend/.env
- If port 3000 is in use, Vite will automatically use the next available port

### CORS Issues:
- The backend is configured with CORS to allow requests from localhost:3000
- If you change the frontend port, update the CORS configuration in backend/server.js

## Project Structure

```
book/
├── backend/
│   ├── models/
│   │   └── Book.js
│   ├── routes/
│   │   └── books.js
│   ├── scripts/
│   │   ├── seedDatabase.js
│   │   └── clearDatabase.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── README.md
```

## Features

- ✅ Add, view, update, and delete books
- ✅ Filter books by genre and status
- ✅ Search books by title or author
- ✅ Responsive design with Tailwind CSS
- ✅ RESTful API with Express.js
- ✅ MongoDB database with Mongoose
- ✅ Real-time statistics
- ✅ Modern UI with smooth animations 