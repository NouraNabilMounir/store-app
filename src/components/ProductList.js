import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError("Failed to fetch products. Please try again later.");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center text-blue-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {products.map(product => (
        <div key={product.id} className="border p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-full h-48 object-contain mb-4 rounded-md transform hover:scale-105 transition-transform duration-200"
          />
          <h2 className="font-semibold text-lg text-gray-800 truncate mb-2">{product.title}</h2>
          
          <div className="flex justify-between items-center mb-3">
            <p className="text-green-600 font-semibold text-lg">${product.price}</p>
            <div className="flex items-center text-yellow-400 text-sm">
              {Array.from({ length: Math.round(product.rating?.rate || 0) }, (_, i) => (
                <span key={i}>⭐</span>
              ))}
              <span className="text-gray-500 ml-1">({product.rating?.rate || 'N/A'})</span>
            </div>
          </div>
          
          <div className="text-center">
            <button className="mt-2 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md">
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
