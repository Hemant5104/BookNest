"use client"

const BookCard = ({ book, onEdit, onDelete }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "Read":
        return "bg-[#e6e6d6] text-[#001f3f] border border-[#001f3f]"
      case "Reading":
        return "bg-[#fdf6e3] text-[#001f3f] border border-[#001f3f]"
      case "Want to Read":
        return "bg-[#f5f5dc] text-[#001f3f] border border-[#001f3f]"
      default:
        return "bg-[#f5f5dc] text-[#001f3f] border border-[#001f3f]"
    }
  }

  const getGenreColor = (genre) => {
    return "bg-[#001f3f] text-[#f5f5dc] border border-[#001f3f]"
  }

  return (
    <div className="bg-[#f5f5dc] rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-200 p-6 flex flex-col h-full border border-[#e6e6d6]">
      {/* Placeholder for book cover */}
      <div className="w-full h-40 bg-[#e6e6d6] rounded-lg mb-4 flex items-center justify-center">
        <span className="text-5xl text-[#001f3f]">📖</span>
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-bold text-[#001f3f] mb-1 line-clamp-2">{book.title}</h3>
        <p className="text-[#001f3f] text-sm mb-3">by {book.author}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getGenreColor(book.genre)}`}>{book.genre}</span>
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(book.status)}`}>{book.status}</span>
        </div>
      </div>
      <div className="flex justify-between items-center pt-4 border-t border-[#e6e6d6] mt-auto">
        <span className="text-xs text-[#001f3f]">Added {new Date(book.createdAt).toLocaleDateString()}</span>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(book)}
            className="px-3 py-1 rounded bg-[#001f3f] text-[#f5f5dc] hover:bg-[#003366] text-xs font-semibold transition-colors border border-[#001f3f]"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(book._id)}
            className="px-3 py-1 rounded bg-[#ffd700] text-[#001f3f] hover:bg-[#ffe066] text-xs font-semibold transition-colors border border-[#ffd700]"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default BookCard
