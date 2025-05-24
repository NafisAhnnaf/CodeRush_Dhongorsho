import React, { useEffect, useState } from 'react';
import ProductCarousel from '/src/components/ProductCarousel';
import './shop.css';

import Card from '../components/Card';
import product1 from '../assets/product_images/product_1.webp'; // import local image

const productsData = [
  {
    id: 1,
    name: 'Smartphone',
    category: 'Electronics',
    price: 299,
    image: "",
  },
  {
    id: 2,
    name: 'Headphones',
    category: 'Accessories',
    price: 99,
    image: 'https://via.placeholder.com/150',
  },
  // add more as needed
];


const categories = ['Electronics', 'Accessories', 'Stationaries', 'Tutoring'];

function Shop() {
  const fullText = "WELCOME TO DHONGORSHO SHOP";
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [filter, setFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('default');

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setText((prev) => prev + fullText.charAt(index));
        setIndex(index + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [index, fullText]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const getFilteredProducts = () => {
    let filtered = [...productsData];
    if (filter !== 'All') {
      filtered = filtered.filter((product) => product.category === filter);
    }
    if (sortOrder === 'lowToHigh') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'highToLow') {
      filtered.sort((a, b) => b.price - a.price);
    }
    return filtered;
  };

  const productsByCategory = categories.reduce((acc, category) => {
    acc[category] = getFilteredProducts().filter((product) => product.category === category);
    return acc;
  }, {});

  return (
    <div className="shop-mains">
      <div className="shop-mains-upper">
        <h1 className="typing-heading">{text}</h1>
      </div>
      <div className="filters">
        <label>
          Category:
          <select value={filter} onChange={handleFilterChange}>
            <option value="All">All</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </label>
        <label>
          Sort by Price:
          <select value={sortOrder} onChange={handleSortChange}>
            <option value="default">Default</option>
            <option value="lowToHigh">Low to High</option>
            <option value="highToLow">High to Low</option>
          </select>
        </label>
        <div className="product-grid">
    {productsData
      .filter(p => p.category === 'Electronics')
      .map((product) => (
        <Card key={product.id} product={product} />
      ))}
        </div>
        </div>
        </div>
  );
}

export default Shop;
