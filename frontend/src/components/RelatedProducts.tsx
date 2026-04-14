import { useEffect, useState } from 'react';
import type { Product } from '../types';
import { fetchProducts } from '../api/products';
import ProductCard from './ProductCard';
import './RelatedProducts.css';

interface RelatedProductsProps {
  category: string;
  currentProductId: string;
}

const RelatedProducts = ({ category, currentProductId }: RelatedProductsProps) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadRelated = async () => {
      try {
        const response = await fetchProducts(category);
        if (response.success) {
          // Filter out the current product and limit to 4
          const filtered = response.data
            .filter(p => p._id !== currentProductId)
            .slice(0, 4);
          setProducts(filtered);
        }
      } catch (err) {
        console.error('Failed to load related products');
      }
    };
    loadRelated();
  }, [category, currentProductId]);

  if (products.length === 0) return null;

  return (
    <div className="related-products">
      <h3>You May Also Like</h3>
      <div className="related-grid">
        {products.map(p => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
