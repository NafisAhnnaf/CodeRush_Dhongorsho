import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Marketplace from './pages/Marketplace';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Shop from './shop/Shop';
import Chatbot from './components/Chatbot';
import Dashboard from './dashboard/Dashboard';
import Upload from './upload/Upload';
import product1 from './assets/shoe.jpg';
import Profile from './pages/Profile';
import Auth from './components/Auth';

const initialProducts = [
  { id: 1, name: 'Smartphone', category: 'Electronics', price: 299, image: product1 },
  { id: 2, name: 'Headphones', category: 'Accessories', price: 99, image: product1 },
  { id: 3, name: 'Notebook', category: 'Stationaries', price: 5, image: product1 },
  { id: 4, name: 'Pen Set', category: 'Stationaries', price: 10, image: product1 },
  { id: 5, name: 'Math Tutoring', category: 'Tutoring', price: 50, image: product1 },
  { id: 6, name: 'Science Tutoring', category: 'Tutoring', price: 60, image: product1 },
];

const backend = import.meta.env.VITE_BACKEND;

function App() {
  const [products, setProducts] = useState(initialProducts);
  useEffect(()=>{
    const fetchProds = async ()=>{
      const res =await axios.get(`${backend}/products`);
      //console.log(res.data[0].imgid);
      //console.log(res.data[0]._id);
      setProducts(res.data);
    } 
    fetchProds(); 
  },[])
  const handleNewProduct = (newProduct) => {
    setProducts(prev => [...prev, newProduct]);
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route element={<Auth/>}>
          <Route path="/upload" element={
            <Upload existingProducts={products} onProductUpload={handleNewProduct} />
          } />
          <Route path="/" element={<MainPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/dashboard/:id" element={<Dashboard />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/shop" element={<  Shop products={products} />} />
          <Route path="/chatbot" element={<Chatbot />} />
        </Route>
      </Routes>
      
    </Router>
  );
}

export default App;