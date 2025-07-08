import BookCard from "./BookCard"

const BookList = ({ books, loading, onEdit, onDelete }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (books.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📚</div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No books found</h3>
        <p className="text-gray-500">Start building your library by adding your first book!</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {books.map((book) => (
        <BookCard key={book._id} book={book} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  )
}

export default BookList
