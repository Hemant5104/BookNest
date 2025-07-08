const mongoose = require("mongoose")
const Book = require("../models/Book")
require("dotenv").config()

async function clearDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/bookmanagement")

    console.log("Connected to MongoDB")

    // Get count before deletion
    const count = await Book.countDocuments()
    console.log(`Found ${count} books in database`)

    if (count === 0) {
      console.log("Database is already empty")
      return
    }

    // Ask for confirmation
    const readline = require("readline")
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })

    rl.question(`Are you sure you want to delete all ${count} books? (yes/no): `, async (answer) => {
      if (answer.toLowerCase() === "yes" || answer.toLowerCase() === "y") {
        // Clear all books
        const result = await Book.deleteMany({})
        console.log(`✅ Deleted ${result.deletedCount} books from database`)
      } else {
        console.log("Operation cancelled")
      }

      rl.close()
      await mongoose.connection.close()
      console.log("Database connection closed")
    })
  } catch (error) {
    console.error("Error clearing database:", error)
    await mongoose.connection.close()
  }
}

// Run the clear function
clearDatabase()
