import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5024/api/Auth/login', {
        email: email,
        password: password
      });

      const authToken = response.data.token;
      setToken(authToken);

      // Token'i local storage veya başka bir güvenli şekilde saklayabilirsiniz
      localStorage.setItem('token', authToken);
    } catch (error) {
      console.error('Login failed. Error:', error);
      // Hata durumunda kullanıcıya uygun bir geri bildirim göstermek için state değişkenleri kullanabilirsiniz
    }
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
