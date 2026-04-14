import { useState, useEffect } from 'react';
import { fetchProducts } from '../api/products';
import type { Product } from '../types';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import './Home.css';

const categories = ['All', 'Woody', 'Floral', 'Citrus', 'Oriental', 'Fresh'];

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getProducts = async (category: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchProducts(category);
      if (response.success) {
        setProducts(response.data);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('Failed to load products. Please check if the server is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts(activeCategory);
  }, [activeCategory]);

  return (
    <div className="home-page">
      <Hero />
      
      <section id="products" className="container products-section py-large">
        <div className="section-header">
          <span className="subtitle">Signature Collections</span>
          <h2 className="section-title">Our Curated Fragrances</h2>
          
          <div className="category-filters">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-chip ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="loading-grid">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="skeleton-card"></div>
            ))}
          </div>
        ) : error ? (
          <div className="error-container">
            <p>{error}</p>
            <button className="btn-retry" onClick={() => getProducts(activeCategory)}>Retry</button>
          </div>
        ) : (
          <div className="products-grid">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      <section className="newsletter glass py-large">
        <div className="container newsletter-content">
          <h2>Join the Essence Circle</h2>
          <p>Subscribe to receive updates on new arrivals, exclusive events, and fragrance tips.</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Enter your email address" />
            <button className="btn-subscribe">Subscribe</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
