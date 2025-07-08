const mongoose = require("mongoose")
const Book = require("../models/Book")
require("dotenv").config()

const sampleBooks = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Fiction",
    status: "Read",
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Fiction",
    status: "Read",
  },
  {
    title: "1984",
    author: "George Orwell",
    genre: "Sci-Fi",
    status: "Reading",
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Romance",
    status: "Want to Read",
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    genre: "Fiction",
    status: "Read",
  },
  {
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    genre: "Fantasy",
    status: "Read",
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    status: "Reading",
  },
  {
    title: "Dune",
    author: "Frank Herbert",
    genre: "Sci-Fi",
    status: "Want to Read",
  },
  {
    title: "The Girl with the Dragon Tattoo",
    author: "Stieg Larsson",
    genre: "Mystery",
    status: "Read",
  },
  {
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    genre: "Non-Fiction",
    status: "Reading",
  },
  {
    title: "The 7 Habits of Highly Effective People",
    author: "Stephen R. Covey",
    genre: "Self-Help",
    status: "Want to Read",
  },
  {
    title: "Steve Jobs",
    author: "Walter Isaacson",
    genre: "Biography",
    status: "Read",
  },
]

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/bookmanagement")

    console.log("Connected to MongoDB")

    // Clear existing books
    await Book.deleteMany({})
    console.log("Cleared existing books")

    // Insert sample books
    const insertedBooks = await Book.insertMany(sampleBooks)
    console.log(`Inserted ${insertedBooks.length} sample books`)

    // Display inserted books
    console.log("\nSample books added:")
    insertedBooks.forEach((book, index) => {
      console.log(`${index + 1}. "${book.title}" by ${book.author} (${book.genre}) - ${book.status}`)
    })

    console.log("\n✅ Database seeded successfully!")
  } catch (error) {
    console.error("Error seeding database:", error)
  } finally {
    // Close connection
    await mongoose.connection.close()
    console.log("Database connection closed")
  }
}

// Run the seed function
seedDatabase()
