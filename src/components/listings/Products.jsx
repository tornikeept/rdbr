import React, { useContext, useEffect } from 'react';
import { ProjectContext } from '../../store/ProjectContext.jsx';

const Products = () => {
  const { products, error } = useContext(ProjectContext);

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="products">
      {/* {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <img src={product.image} alt={product.address} />
              <div>{product.address}</div>
              <div>{product.price} USD</div>
              <div>{product.area} m²</div>
              <div>Bedrooms: {product.bedrooms}</div>
            </li>
          ))}
        </ul>
      )} */}
    </div>
  );
};

export default Products;