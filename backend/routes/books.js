const express = require("express")
const router = express.Router()
const Book = require("../models/Book")

// GET all books with optional filtering and searching
router.get("/", async (req, res) => {
  try {
    const { genre, status, search } = req.query
    const query = {}

    // Add filters
    if (genre && genre !== "all") {
      query.genre = genre
    }
    if (status && status !== "all") {
      query.status = status
    }

    // Add search functionality
    if (search) {
      query.$or = [{ title: { $regex: search, $options: "i" } }, { author: { $regex: search, $options: "i" } }]
    }

    const books = await Book.find(query).sort({ createdAt: -1 })
    res.json(books)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// GET single book by ID
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
    if (!book) {
      return res.status(404).json({ message: "Book not found" })
    }
    res.json(book)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// POST create new book
router.post("/", async (req, res) => {
  try {
    const { title, author, genre, status } = req.body

    const book = new Book({
      title,
      author,
      genre,
      status: status || "Want to Read",
    })

    const savedBook = await book.save()
    res.status(201).json(savedBook)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// PUT update book
router.put("/:id", async (req, res) => {
  try {
    const { title, author, genre, status } = req.body

    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author, genre, status },
      { new: true, runValidators: true },
    )

    if (!book) {
      return res.status(404).json({ message: "Book not found" })
    }

    res.json(book)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// DELETE book
router.delete("/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id)

    if (!book) {
      return res.status(404).json({ message: "Book not found" })
    }

    res.json({ message: "Book deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
