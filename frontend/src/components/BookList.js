import React from "react";

function BookList({ books, onDelete }) {
  return (
    <div>
      <h2>Books</h2>
      <ul>
        {books.map(book => (
          <li key={book._id} className="book-item">
            <b>{book.title}</b> by {book.author} - {book.category} | Copies: {book.availableCopies}
            <button
              className="delete-btn"
              onClick={() => onDelete(book._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;

