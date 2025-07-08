"use client"

import { useState, useEffect } from "react"

const BookForm = ({ book, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "Fiction",
    status: "Want to Read",
  })

  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title,
        author: book.author,
        genre: book.genre,
        status: book.status,
      })
    }
  }, [book])

  const genres = [
    "Fiction",
    "Non-Fiction",
    "Mystery",
    "Romance",
    "Sci-Fi",
    "Fantasy",
    "Biography",
    "History",
    "Self-Help",
    "Other",
  ]

  const statuses = ["Want to Read", "Reading", "Read"]

  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
    }

    if (!formData.author.trim()) {
      newErrors.author = "Author is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-6">{book ? "Edit Book" : "Add New Book"}</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter book title"
          />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
        </div>

        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
            Author *
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.author ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter author name"
          />
          {errors.author && <p className="text-red-500 text-xs mt-1">{errors.author}</p>}
        </div>

        <div>
          <label htmlFor="genre" className="block text-sm font-medium text-gray-700 mb-1">
            Genre
          </label>
          <select
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="flex space-x-3 pt-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
          >
            {book ? "Update Book" : "Add Book"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default BookForm
