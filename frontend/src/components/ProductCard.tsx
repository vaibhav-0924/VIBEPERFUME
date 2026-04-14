import { Link } from 'react-router-dom';
import type { Product } from '../types';
import { Heart, Eye } from 'lucide-react';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="product-card">
      <div className="card-img-container">
        <img src={product.images[0]} alt={product.name} loading="lazy" />
        <div className="card-overlay">
          <Link to={`/products/${product._id}`} className="btn-view">
            <Eye size={20} /> View Details
          </Link>
          <button className="btn-wishlist">
            <Heart size={20} />
          </button>
        </div>
      </div>
      <Link to={`/products/${product._id}`} className="card-info">
        <span className="card-brand">{product.brand}</span>
        <h3 className="card-name">{product.name}</h3>
        <p className="card-desc">{product.shortDescription}</p>
        <div className="card-footer">
          <span className="card-price">Rs. {product.price.toLocaleString()}</span>
          <span className="card-category">{product.category}</span>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
