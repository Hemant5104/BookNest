"use client"

const Stats = ({ books }) => {
  const totalBooks = books.length
  const readBooks = books.filter((book) => book.status === "Read").length
  const readingBooks = books.filter((book) => book.status === "Reading").length
  const wantToReadBooks = books.filter((book) => book.status === "Want to Read").length

  const genreStats = books.reduce((acc, book) => {
    acc[book.genre] = (acc[book.genre] || 0) + 1
    return acc
  }, {})

  const topGenre = Object.keys(genreStats).reduce((a, b) => (genreStats[a] > genreStats[b] ? a : b), "")

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Library Statistics</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{totalBooks}</div>
          <div className="text-sm text-gray-600">Total Books</div>
        </div>

        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{readBooks}</div>
          <div className="text-sm text-gray-600">Read</div>
        </div>

        <div className="text-center">
          <div className="text-2xl font-bold text-blue-500">{readingBooks}</div>
          <div className="text-sm text-gray-600">Reading</div>
        </div>

        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-600">{wantToReadBooks}</div>
          <div className="text-sm text-gray-600">Want to Read</div>
        </div>
      </div>

      {totalBooks > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="text-sm text-gray-600">
            <span className="font-medium">Most popular genre:</span> {topGenre} ({genreStats[topGenre]} books)
          </div>
        </div>
      )}
    </div>
  )
}

export default Stats
