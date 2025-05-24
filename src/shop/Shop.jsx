import React, { useEffect, useState } from 'react';
import './shop.css';
import Card from '../components/Card';

const categories = ['Electronics', 'Accessories', 'Stationaries', 'Tutoring'];

function Shop({ products }) {
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

  const getFilteredProducts = () => {
    let filtered = [...products];
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

  return (
    <div className="shop-container">
      <div className="shop-header">
        <h1 className="typing-heading">{text}</h1>
      </div>
      <div className="filters">
        <label>
          Category:
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="All">All</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </label>
        <label>
          Sort by Price:
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="default">Default</option>
            <option value="lowToHigh">Low to High</option>
            <option value="highToLow">High to Low</option>
          </select>
        </label>
      </div>
      {categories.map((category) => {
        const categoryProducts = getFilteredProducts().filter((product) => product.category === category);
        if (categoryProducts.length === 0) return null;
        return (
          <div key={category} className="category-section">
            <h2>{category}</h2>
            <div className="product-row">
              {categoryProducts.map((product) => (
                <Card key={product.id} product={product} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Shop;
