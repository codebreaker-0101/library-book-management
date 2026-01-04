import React, { useState } from "react";

function AddBookForm({ onAdd }) {
  const [form, setForm] = useState({
    title: "",
    author: "",
    category: "",
    publishedYear: "",
    availableCopies: ""
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    onAdd({
      ...form,
      publishedYear: Number(form.publishedYear),
      availableCopies: Number(form.availableCopies)
    });
    setForm({ title:"", author:"", category:"", publishedYear:"", availableCopies:"" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Book</h2>
      <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
      <input name="author" placeholder="Author" value={form.author} onChange={handleChange} required />
      <input name="category" placeholder="Category" value={form.category} onChange={handleChange} required />
      <input name="publishedYear" placeholder="Published Year" value={form.publishedYear} onChange={handleChange} required />
      <input name="availableCopies" placeholder="Copies" value={form.availableCopies} onChange={handleChange} required />
      <button type="submit">Add</button>
    </form>
  );
}

export default AddBookForm;
