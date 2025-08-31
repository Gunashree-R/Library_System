import React, { useEffect, useState } from "react";
import axios from "axios";
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [bookForm, setBookForm] = useState({ title: "", author: "", isbn: "" });
  const [editingBookId, setEditingBookId] = useState(null);

  const backendURL = "http://localhost:8081/books";

  // Fetch all books
  const fetchBooks = () => {
    axios.get(backendURL)
      .then(res => setBooks(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    setBookForm({ ...bookForm, [e.target.name]: e.target.value });
  };

  // Add or update book
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingBookId) {
      // Update book
      axios.put(`${backendURL}/${editingBookId}`, bookForm)
        .then(() => {
          fetchBooks();
          setEditingBookId(null);
          setBookForm({ title: "", author: "", isbn: "" });
        });
    } else {
      // Add new book
      axios.post(backendURL, bookForm)
        .then(() => {
          fetchBooks();
          setBookForm({ title: "", author: "", isbn: "" });
        });
    }
  };

  // Edit book
  const handleEdit = (book) => {
    setEditingBookId(book.id);
    setBookForm({ title: book.title, author: book.author, isbn: book.isbn });
  };

  // Delete book
  const handleDelete = (id) => {
    axios.delete(`${backendURL}/${id}`)
      .then(() => fetchBooks());
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Library Management</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          name="title"
          placeholder="Title"
          value={bookForm.title}
          onChange={handleChange}
          required
        />
        <input
          name="author"
          placeholder="Author"
          value={bookForm.author}
          onChange={handleChange}
          required
        />
        <input
          name="isbn"
          placeholder="ISBN"
          value={bookForm.isbn}
          onChange={handleChange}
          required
        />
        <button type="submit">{editingBookId ? "Update Book" : "Add Book"}</button>
      </form>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>ISBN</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.isbn}</td>
              <td>
                <button onClick={() => handleEdit(book)}>Edit</button>
                <button onClick={() => handleDelete(book.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
