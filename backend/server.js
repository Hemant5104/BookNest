const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")
const bookRoutes = require("./routes/books")
const authRoutes = require("./routes/auth")
const supportRoutes = require("./routes/support")
const faqRoutes = require("./routes/faq")

dotenv.config()

const app = express()
const PORT = process.env.PORT || 10000;

// Middleware
app.use(cors({
  origin: 'https://book-nest-rouge.vercel.app',
  credentials: true
}));
app.use(express.json())
//app.use(cors())
// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/bookmanagement")
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err))

// Routes
app.use("/api/books", bookRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/support", supportRoutes)
app.use("/api/faq", faqRoutes)

app.get("/", (req, res) => {
  res.json({ message: "Book Management API is running!" })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
