import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Tokenı local storage'dan al
        const token = localStorage.getItem('token');

        // Kullanıcının ürünlerini getir
        const response = await axios.get('http://localhost:5024/api/Product/get-all-products', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // API'den gelen verileri state'e kaydet
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    // Ürünleri getirme işlemi
    fetchProducts();
  }, []); // Boş bağımlılık dizisi, component ilk kez render edildiğinde çalışmasını sağlar

  // products state'i boşsa, kullanıcıya bir yükleme mesajı gösterilebilir
  if (products.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-list">
      <h2>Your Products</h2>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Product Price</th>
            <th>Category Name</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.categoryName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
