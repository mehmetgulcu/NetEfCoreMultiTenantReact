import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddProductForm = () => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Kategorileri API'den al
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5024/api/Category/get-all-categories', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []); // Boş bağımlılık dizisi sayesinde bu effect sadece bir kere çalışır

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5024/api/Product/add-product',
        {
          name: productName,
          price: parseFloat(productPrice),
          categoryId: parseInt(categoryId),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProductName('');
      setProductPrice('');
      setCategoryId('');
      setError('');
      console.log('Product added successfully:', response.data);
    } catch (error) {
      console.error('Product addition failed. Error:', error);
      setError('Product addition failed. Please try again.');
    }
  };

  return (
    <div className="add-product-form">
      <h2>Add Product</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product Name:</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Product Price:</label>
          <input
            type="number"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Category:</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          >
            <option value="" disabled>Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProductForm;
