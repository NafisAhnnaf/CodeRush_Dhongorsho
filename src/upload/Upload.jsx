import React, { useState } from 'react';
import './upload.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Upload({ onProductUpload, existingProducts }) {
  const [form, setForm] = useState({
    title: '',
    category: '',
    price: '',
    imageFile: null,
  });

  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({
        ...prev,
        imageFile: file, 
      }));
    }
  };

  const backend = import.meta.env.VITE_BACKEND;
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, category, price, imageFile } = form;

    if (!title || !category || !price || !imageFile) {
      alert("All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("img", imageFile); 

    try {
      const res = await axios.post(`${backend}/product`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Product uploaded!");
      navigate('/shop');
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Upload failed!");
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload a New Product</h2>
      <form className="upload-form" onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="title" value={form.title} onChange={handleChange} />
        </label>
        <label>
          Category:
          <select name="category" value={form.category} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Electronics">Electronics</option>
            <option value="Accessories">Accessories</option>
            <option value="Stationaries">Stationaries</option>
            <option value="Tutoring">Tutoring</option>
          </select>
        </label>
        <label>
          Price:
          <input type="number" name="price" value={form.price} onChange={handleChange} />
        </label>
        <label>
          Image:
          <input type="file" name="img" accept="image/*" onChange={handleImageChange} />
        </label>
        <button type="submit">Upload Product</button>
      </form>
    </div>
  );
}

export default Upload;