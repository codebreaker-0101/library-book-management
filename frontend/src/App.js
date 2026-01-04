import React, { useEffect, useState } from "react";
import BookList from "./components/BookList";
import AddBookForm from "./components/AddBookForm";
import "./App.css";

function App() {
  const [books, setBooks] = useState([]);
  const BACKEND = "http://localhost:5000";

  const fetchBooks = async () => {
    const res = await fetch(`${BACKEND}/books`);
    const data = await res.json();
    setBooks(data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const addBook = async (book) => {
    await fetch(`${BACKEND}/books`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book)
    });
    fetchBooks();
  };

  const deleteBook = async (id) => {
    await fetch(`${BACKEND}/books/${id}`, { method: "DELETE" });
    fetchBooks();
  };

  return (
    <div className="container"> 
      <h1>Library Management</h1>
      <AddBookForm onAdd={addBook} />
      <BookList books={books} onDelete={deleteBook} />
    </div>
  );
}

export default App;
