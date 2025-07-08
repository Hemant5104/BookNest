const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    genre: {
      type: String,
      required: true,
      enum: [
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
      ],
    },
    status: {
      type: String,
      required: true,
      enum: ["Read", "Reading", "Want to Read"],
      default: "Want to Read",
    },
    dateAdded: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model("Book", bookSchema)
