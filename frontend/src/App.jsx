"use client"

import { useState, useEffect } from "react"
import BookList from "./components/BookList"
import BookForm from "./components/BookForm"
import SearchAndFilter from "./components/SearchAndFilter"
import Header from "./components/Header"
import { bookService } from "./services/bookService"
import Stats from "./components/Stats"
import Login from "./components/Login"
import Signup from "./components/Signup"
import UserProfile from "./components/UserProfile"
import SupportPage from "./components/SupportPage";
import FAQ from "./components/FAQ";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import Footer from "./components/Footer";

function App() {
  const [books, setBooks] = useState([])
  const [filteredBooks, setFilteredBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingBook, setEditingBook] = useState(null)
  const [filters, setFilters] = useState({
    genre: "all",
    status: "all",
    search: "",
  })
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token")
    return token ? {} : null
  })
  // Remove showLogin, showSignup, and their handlers
  // Remove handleLogout from here

  useEffect(() => {
    fetchBooks()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [books, filters])

  const fetchBooks = async () => {
    try {
      setLoading(true)
      const data = await bookService.getAllBooks(filters)
      setBooks(data)
    } catch (error) {
      console.error("Error fetching books:", error)
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = () => {
    let filtered = [...books]

    if (filters.genre !== "all") {
      filtered = filtered.filter((book) => book.genre === filters.genre)
    }

    if (filters.status !== "all") {
      filtered = filtered.filter((book) => book.status === filters.status)
    }

    if (filters.search) {
      filtered = filtered.filter(
        (book) =>
          book.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          book.author.toLowerCase().includes(filters.search.toLowerCase()),
      )
    }

    setFilteredBooks(filtered)
  }

  const handleAddBook = async (bookData) => {
    try {
      await bookService.createBook(bookData)
      fetchBooks()
      setShowForm(false)
    } catch (error) {
      console.error("Error adding book:", error)
    }
  }

  const handleUpdateBook = async (bookData) => {
    try {
      await bookService.updateBook(editingBook._id, bookData)
      fetchBooks()
      setShowForm(false)
      setEditingBook(null)
    } catch (error) {
      console.error("Error updating book:", error)
    }
  }

  const handleDeleteBook = async (bookId) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await bookService.deleteBook(bookId)
        fetchBooks()
      } catch (error) {
        console.error("Error deleting book:", error)
      }
    }
  }

  const handleEditBook = (book) => {
    setEditingBook(book)
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingBook(null)
  }

  const handleLogin = (userData) => {
    setUser(userData)
    // setShowLogin(false) // This line is removed
    // setShowSignup(false) // This line is removed
  }

  const handleSignup = () => {
    // setShowSignup(false) // This line is removed
    // setShowLogin(true) // This line is removed
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        {/* Hero Section only on Home page */}
        <Routes>
          <Route path="/" element={
            <HomePageContent
              user={user}
              setUser={setUser}
              books={books}
              filteredBooks={filteredBooks}
              loading={loading}
              showForm={showForm}
              setShowForm={setShowForm}
              editingBook={editingBook}
              setEditingBook={setEditingBook}
              filters={filters}
              setFilters={setFilters}
              handleAddBook={handleAddBook}
              handleUpdateBook={handleUpdateBook}
              handleDeleteBook={handleDeleteBook}
              handleEditBook={handleEditBook}
              handleCloseForm={handleCloseForm}
              fetchBooks={fetchBooks}
              applyFilters={applyFilters}
            />
          } />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/faq" element={<FAQ />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

function HomePageContent({ user, setUser, books, filteredBooks, loading, showForm, setShowForm, editingBook, setEditingBook, filters, setFilters, handleAddBook, handleUpdateBook, handleDeleteBook, handleEditBook, handleCloseForm }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };
  return (
    <>
      <section className="bg-[#001f3f] py-16 px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#f5f5dc] mb-4 drop-shadow-lg">Welcome to BookNest</h2>
        <p className="text-lg md:text-xl text-[#f5f5dc] mb-8 max-w-2xl mx-auto">Your personal online library. Organize, search, and track your books with a beautiful, modern interface inspired by the best digital libraries.</p>
        {/* <a href="#" className="inline-block bg-[#f5f5dc] text-[#001f3f] font-bold px-8 py-3 rounded-lg shadow hover:bg-[#ffd700] hover:text-[#001a33] transition-colors">Browse Collection</a> */}
      </section>
      <div className="container mx-auto px-4 py-8">
        {!user && (
          <div className="text-center text-gray-600 mt-12">Please log in or sign up to manage your books.</div>
        )}
        {user && (
          <>
            <div className="flex justify-end mb-4">
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Logout
              </button>
            </div>
            <UserProfile user={user} />
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h1 className="text-3xl font-bold text-gray-800">My Book Collection</h1>
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Add New Book
                </button>
              </div>
              <SearchAndFilter filters={filters} onFiltersChange={setFilters} />
              <Stats books={filteredBooks} />
            </div>
          </>
        )}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <BookForm
                book={editingBook}
                onSubmit={editingBook ? handleUpdateBook : handleAddBook}
                onCancel={handleCloseForm}
              />
            </div>
          </div>
        )}
        <BookList books={filteredBooks} loading={loading} onEdit={handleEditBook} onDelete={handleDeleteBook} />
      </div>
    </>
  );
}

export default App
