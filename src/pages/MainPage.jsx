import React from 'react';
import './MainPage.css';
import { Link } from 'react-router-dom';

function MainPage() {
  return (
    <div className="MainBody">
      {/* Hero Section */}
      <div className="intro-content">
        <div className="intro-text">
          <h2>GEAR UP EVERY SEASON</h2>
          <h2>EVERY WORK</h2>
        </div>
        <div className="explore">
          <Link to="/shop"><button className="shop-btn">Shop NOW</button></Link>
        </div>
        <img 
          src="https://undraw.co/api/illustrations/gear" 
          alt="gear illustration" 
          className="hero-img" 
        />
      </div>

      {/* Featured Categories */}
      <section className="features-section">
        <h3>Featured Categories</h3>
        <div className="categories">
          <div className="category-card">
            <img src="https://cdn-icons-png.flaticon.com/512/776/776614.png" alt="Workwear" />
            <p>Electronics</p>
          </div>
          <div className="category-card">
            <img src="https://cdn-icons-png.flaticon.com/512/188/188990.png" alt="Accessories" />
            <p>Accessories</p>
          </div>
          <div className="category-card">
            <img src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png" alt="Seasonal Gear" />
            <p>Stationaries</p>
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="trending-section">
        <h3>Trending Now</h3>
        <div className="trending-products">
          <div className="product-card">
            <img src="https://via.placeholder.com/150" alt="Product 1" />
            <p>Premium Jacket</p>
          </div>
          <div className="product-card">
            <img src="https://via.placeholder.com/150" alt="Product 2" />
            <p>Durable Gloves</p>
          </div>
          <div className="product-card">
            <img src="https://via.placeholder.com/150" alt="Product 3" />
            <p>Winter Boots</p>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter">
        <h3>Join our newsletter</h3>
        <p>Stay updated with the latest deals and arrivals!</p>
        <form>
          <input type="email" placeholder="Enter your email" />
          <button type="submit">Subscribe</button>
        </form>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 GearUp Co. All rights reserved.</p>
        <div className="socials">
          <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/145/145802.png" alt="Facebook" /></a>
          <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/145/145812.png" alt="Instagram" /></a>
        </div>
      </footer>
    </div>
  );
}

export default MainPage;
