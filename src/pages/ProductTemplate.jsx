import React from 'react';


function ProductTemplate() {
  return (
    <div className="product-template-container">
      {/* Left: Product Details */}
      <div className="product-details">
        <img
          src="https://via.placeholder.com/400x400"
          alt="Product"
          className="product-image"
        />
        <div className="product-info">
          <h2>Product Title</h2>
          <p className="product-price">$149.99</p>
          <p className="product-id">ID: 123456789</p>
          <p className="product-rating">⭐⭐⭐⭐☆ (4.0)</p>
          <textarea placeholder="Write a review..." className="review-box" />
          <button className="add-to-cart-btn">Add to Cart</button>
        </div>
      </div>

      {/* Right: Chat Section */}
      <div className="chat-section">
        <h3>Chat with Seller</h3>
        <div className="chat-box">
          {/* Placeholder for chat messages */}
        </div>
      </div>
    </div>
  );
}

export default ProductTemplate;
