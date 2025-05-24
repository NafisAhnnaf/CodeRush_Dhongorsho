import React, { useState } from 'react';
import './common.css';

const products = [
  {
    id: 1,
    name: "Nike Air Max",
    size: "10",
    price: 120,
    quantity: 1,
    image: "src/assets/shoe.jpg"
  },
  {
    id: 2,
    name: "Adidas Runner",
    size: "9",
    price: 95,
    quantity: 2,
    image: "src/assets/shoe.jpg"
  },
  {
    id: 3,
    name: "Tabib",
    size: "11",
    price: 100,
    quantity: 2,
    image: "src/assets/shoe.jpg"
  }
];

function Cart() {
  const [cartItems, setCartItems] = useState(products);
  const [promo, setPromo] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);

  const updateQuantity = (id, delta) => {
    const updated = cartItems.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    );
    setCartItems(updated);
  };

  const applyPromo = () => {
    if (promo.toLowerCase() === "save10") {
      setDiscount(0.1);
      setPromoApplied(true);
    } else {
      setDiscount(0);
      setPromoApplied(false);
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const vat = subtotal * 0.05;
  const total = subtotal + vat - subtotal * discount;

  return (
    <div className="cart">
      <h1>MY CART 🛒</h1>
      <hr />
      <div className="cart-container">
        <div className="cart-left">
          {cartItems.map(item => (
            <div className="cart-item" key={item.id}>
              <div className="cart-product-image-container">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="cart-details">
                <h3>{item.name}</h3>
                <p>Size: {item.size}</p>
                <p>Price: ${item.price}</p>
                <div className="quantity-control">
                  <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                </div>
                <p>Total: ${item.price * item.quantity}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-right">
          <h2>Order Summary</h2>
          {cartItems.map(item => (
            <p key={item.id}>{item.name} x {item.quantity}: ${item.price * item.quantity}</p>
          ))}
          <hr />
          <p>Subtotal: ${subtotal.toFixed(2)}</p>
          <p>VAT (5%): ${vat.toFixed(2)}</p>
          {discount > 0 && <p className="promo-applied">Promo Applied: -${(subtotal * discount).toFixed(2)}</p>}
          <h3>Total: ${total.toFixed(2)}</h3>

          <div className="promo-section">
            <input
              type="text"
              placeholder="Promo code"
              value={promo}
              onChange={(e) => setPromo(e.target.value)}
              className="promo-input"
            />
            <button className="apply-button" onClick={applyPromo}>Apply</button>
            {promoApplied && <span className="success">Promo applied successfully!</span>}
            {!promoApplied && promo && <span className="error">Invalid promo code</span>}
          </div>

          <button className="checkout-button">Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
