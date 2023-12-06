import React, { useState } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import LoginForm from './views/LoginForm';
import AddProductForm from './views/AddProductForm';
import ProductList from './views/ProductList';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const navigate = useNavigate();

  const handleLogin = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
    navigate('/products');
  };

  // const handleLogout = () => {
  //   setToken('');
  //   localStorage.removeItem('token');
  //   navigate('/login');
  // };

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginForm setToken={handleLogin} />} />
        <Route path="/add-product" element={token ? <AddProductForm /> : <Navigate to="/login" />} />
        {token && <Route path="/products" element={<ProductList />} />}
        <Route path="/" element={<Navigate to="/login" />} />

      </Routes>
    </div>
  );
}

export default App;
