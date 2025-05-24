import React from 'react';
import './MainPage.css';
import { Link } from 'react-router-dom'

function MainPage() {
  return (
    <div className="MainBody">
      <div className="intro-content">
        <div className="intro-text">
          <h2>GEAR UP EVERY SEASON</h2>
          <h2>EVERY WORK</h2>
        </div>
        <div className="explore">
        <Link to="/shop"><button className="shop-btn">Shop NOW</button></Link>
          
        </div>
      </div>
      <div className="chatbot">
        
      </div>
    </div>
  );
}

export default MainPage;
