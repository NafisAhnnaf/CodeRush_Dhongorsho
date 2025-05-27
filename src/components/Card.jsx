import React from "react";
import { useNavigate } from "react-router-dom";

const backend = import.meta.env.VITE_BACKEND;
function Card({ product }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/shop/product/${product._id}');
  };

  return (
    <div className="product-card" onClick={handleClick}>
      <img src={backend+"/"+product.imgid} alt={product.name} className="product-img" />
      <div className="product-info">
        <h3>{product.title}</h3>
        <p>${product.price}</p>
      </div>
    </div>
  );
}

export default Card;