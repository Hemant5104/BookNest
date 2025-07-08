#!/bin/bash

echo "========================================"
echo "Book Management System Setup"
echo "========================================"
echo

# Check Node.js installation
echo "Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi
echo "Node.js is installed ✓"
echo

# Check MongoDB installation
echo "Checking MongoDB installation..."
if ! command -v mongod &> /dev/null; then
    echo "WARNING: MongoDB is not installed or not in PATH!"
    echo "Please install MongoDB:"
    echo "  macOS: brew install mongodb-community"
    echo "  Ubuntu: sudo apt install mongodb"
    echo "  Or download from: https://www.mongodb.com/try/download/community"
    echo
    echo "After installation, make sure MongoDB service is running"
    echo
    read -p "Press Enter to continue..."
fi
echo "MongoDB check completed"
echo

# Install backend dependencies
echo "Installing backend dependencies..."
cd backend
if ! npm install; then
    echo "ERROR: Failed to install backend dependencies!"
    exit 1
fi
echo "Backend dependencies installed ✓"
echo

# Create .env file for backend
echo "Creating .env file for backend..."
cat > .env << EOF
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bookmanagement
NODE_ENV=development
EOF
echo "Backend .env file created ✓"
echo

# Install frontend dependencies
echo "Installing frontend dependencies..."
cd ../frontend
if ! npm install; then
    echo "ERROR: Failed to install frontend dependencies!"
    exit 1
fi
echo "Frontend dependencies installed ✓"
echo

cd ..
echo
echo "========================================"
echo "Setup completed successfully!"
echo "========================================"
echo
echo "To start the application:"
echo
echo "Terminal 1 (Backend):"
echo "  cd backend"
echo "  npm run dev"
echo
echo "Terminal 2 (Frontend):"
echo "  cd frontend"
echo "  npm run dev"
echo
echo "Optional: Seed the database with sample books:"
echo "  cd backend"
echo "  npm run seed"
echo
echo "Access the application at:"
echo "  Frontend: http://localhost:3000"
echo "  Backend API: http://localhost:5000"
echo 