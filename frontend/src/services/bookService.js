const API_BASE_URL = "http://localhost:5000/api"

export const bookService = {
  // Get all books with optional filters
  getAllBooks: async (filters = {}) => {
    const queryParams = new URLSearchParams()

    if (filters.genre && filters.genre !== "all") {
      queryParams.append("genre", filters.genre)
    }
    if (filters.status && filters.status !== "all") {
      queryParams.append("status", filters.status)
    }
    if (filters.search) {
      queryParams.append("search", filters.search)
    }

    const url = `${API_BASE_URL}/books${queryParams.toString() ? `?${queryParams.toString()}` : ""}`

    const response = await fetch(url)
    if (!response.ok) {
      throw new Error("Failed to fetch books")
    }
    return response.json()
  },

  // Get single book by ID
  getBookById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/books/${id}`)
    if (!response.ok) {
      throw new Error("Failed to fetch book")
    }
    return response.json()
  },

  // Create new book
  createBook: async (bookData) => {
    const response = await fetch(`${API_BASE_URL}/books`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookData),
    })

    if (!response.ok) {
      throw new Error("Failed to create book")
    }
    return response.json()
  },

  // Update book
  updateBook: async (id, bookData) => {
    const response = await fetch(`${API_BASE_URL}/books/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookData),
    })

    if (!response.ok) {
      throw new Error("Failed to update book")
    }
    return response.json()
  },

  // Delete book
  deleteBook: async (id) => {
    const response = await fetch(`${API_BASE_URL}/books/${id}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      throw new Error("Failed to delete book")
    }
    return response.json()
  },
}
