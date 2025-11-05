import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider, AuthContext } from "./AuthContext";
import { useContext } from "react";

// Pages
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Profile from "./Pages/Profile";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Cart from "./Pages/Cart";
import ProductDetail from "./Pages/ProductDetail";
import NavigationBar from "./Pages/Navbar";

const ProtectedRoute = ({ children }) => {
  const { user, accessToken, isLoading } = useContext(AuthContext);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return accessToken && user ? children : <Navigate to="/login" />;
};

const App = () => {
  const [cart, setCart] = useState([]);

const addToCart = (product) => {
  const existingProduct = cart.find((item) => item.id === product.id);
  if (existingProduct) {
    // If product exists, do not add it again or change quantity
    return;
  } else {
    // Add new product with quantity 1
    setCart([...cart, { ...product, quantity: 1 }]);
  }
};

const cartCount = cart.length; // Counts unique items instead of total quantity
  return (
    <AuthProvider>
      <Router>
        <NavigationBar cartCount={cartCount} />
        <div className="pt-5">
          <Routes>
            <Route path="/" element={<Home addToCart={addToCart} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart cart={cart} />} />
            <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;