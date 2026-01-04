require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Book = require("./models/Book");

const app = express();         
app.use(cors());                
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas Connected"))
  .catch(err => console.log(err));

// Test route
app.get("/", (req, res) => {
  res.send("Library API running");
});

/* ================= 1. CREATE ================= */
app.post("/books", async (req, res) => {
  try {
    if (Array.isArray(req.body)) {
      const books = await Book.insertMany(req.body);
      return res.status(201).json(books);
    }
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/* ================= 2. READ ================= */
app.get("/books", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

app.get("/books/category/:category", async (req, res) => {
  const books = await Book.find({ category: req.params.category });
  if (!books.length)
    return res.status(404).json({ message: "Book not found" });
  res.json(books);
});

app.get("/books/after/2015", async (req, res) => {
  const books = await Book.find({ publishedYear: { $gt: 2015 } });
  res.json(books);
});

/* ================= 3.UPDATE ================= */
app.put("/books/:id/copies", async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book)
    return res.status(404).json({ message: "Book not found" });

  if (book.availableCopies + req.body.change < 0)
    return res.status(400).json({ message: "Negative stock not allowed" });

  book.availableCopies += req.body.change;
  await book.save();
  res.json(book);
});

app.put("/books/:id/category", async (req, res) => {
  if (!req.body.category)
    return res.status(400).json({ message: "Invalid update" });

  const book = await Book.findByIdAndUpdate(
    req.params.id,
    { category: req.body.category },
    { new: true }
  );

  if (!book)
    return res.status(404).json({ message: "Book not found" });

  res.json(book);
});

/* ================= 4.DELETE ================= */
app.delete("/books/:id", async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (!book)
    return res.status(404).json({ message: "Book not found" });

  if (book.availableCopies !== 0)
    return res.status(400).json({ message: "Copies must be 0 to delete" });

  await book.deleteOne();
  res.json({ message: "Book deleted" });
});

/* ================= SERVER ================= */
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

