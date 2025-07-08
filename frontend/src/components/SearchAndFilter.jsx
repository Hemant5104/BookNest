"use client"

const SearchAndFilter = ({ filters, onFiltersChange }) => {
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

  const handleFilterChange = (key, value) => {
    onFiltersChange((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search */}
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
            Search Books
          </label>
          <input
            type="text"
            id="search"
            placeholder="Search by title or author..."
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Genre Filter */}
        <div>
          <label htmlFor="genre" className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Genre
          </label>
          <select
            id="genre"
            value={filters.genre}
            onChange={(e) => handleFilterChange("genre", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Genres</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Status
          </label>
          <select
            id="status"
            value={filters.status}
            onChange={(e) => handleFilterChange("status", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Statuses</option>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

export default SearchAndFilter
