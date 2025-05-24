import React, { useState } from 'react';
import './upload.css';
import product1 from '../assets/shoe.jpg';

function Upload({ onProductUpload, existingProducts }) {
  const [form, setForm] = useState({
    name: '',
    category: '',
    price: '',
    image: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({ ...prev, image: URL.createObjectURL(file) }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.category || !form.price || !form.image) {
      alert("All fields are required.");
      return;
    }

    const newId = existingProducts.length ? Math.max(...existingProducts.map(p => p.id)) + 1 : 1;

    const newProduct = {
      id: newId,
      name: form.name,
      category: form.category,
      price: parseFloat(form.price),
      image: form.image || product1,
    };

    onProductUpload(newProduct);
    alert("Product uploaded successfully!");
    setForm({ name: '', category: '', price: '', image: null });
  };

  return (
    <div className="upload-container">
      <h2>Upload a New Product</h2>
      <form className="upload-form" onSubmit={handleSubmit}>
        <label>Name:<input type="text" name="name" value={form.name} onChange={handleChange} /></label>
        <label>Category:
          <select name="category" value={form.category} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Electronics">Electronics</option>
            <option value="Accessories">Accessories</option>
            <option value="Stationaries">Stationaries</option>
            <option value="Tutoring">Tutoring</option>
          </select>
        </label>
        <label>Price:<input type="number" name="price" value={form.price} onChange={handleChange} /></label>
        <label>Image:<input type="file" accept="image/*" onChange={handleImageChange} /></label>
        <button type="submit">Upload Product</button>
      </form>
    </div>
  );
}

export default Upload;
