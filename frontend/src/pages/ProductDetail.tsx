import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Share2, Heart, Star, ChevronRight } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { fetchProductById, fetchProductReviews } from '../api/products';
import type { Product, Review } from '../types';
import ImageGallery from '../components/ImageGallery';
import ReviewSection from '../components/ReviewSection';
import ReviewForm from '../components/ReviewForm';
import RelatedProducts from '../components/RelatedProducts';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');

  const loadData = async () => {
    if (!id) return;
    try {
      setLoading(true);
      const [prodRes, revRes] = await Promise.all([
        fetchProductById(id),
        fetchProductReviews(id)
      ]);
      
      if (prodRes.success) {
        setProduct(prodRes.data);
        setSelectedSize(prodRes.data.sizes[0]);
      } else {
        setError(true);
      }
      
      if (revRes.success) {
        setReviews(revRes.data);
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    window.scrollTo(0, 0);
  }, [id]);

  const handleShare = async () => {
    if (!product) return;
    const shareData = {
      title: product.name,
      text: product.shortDescription,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied to clipboard!', { duration: 3000 });
      } catch (err) {
        toast.error('Failed to copy link');
      }
    }
  };

  const calculateAvgRating = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, rev) => acc + rev.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  if (loading) return (
    <div className="container py-large">
      <div className="product-skeleton">
        <div className="skeleton-image"></div>
        <div className="skeleton-info">
          <div className="skeleton-line title"></div>
          <div className="skeleton-line"></div>
          <div className="skeleton-line large"></div>
        </div>
      </div>
    </div>
  );

  if (error || !product) return (
    <div className="container py-large text-center">
      <h2>Product not found</h2>
      <p>The fragrance you are looking for might have been moved or removed.</p>
      <Link to="/" className="btn-back">Back to Collections</Link>
    </div>
  );

  return (
    <div className="product-page">
      <div className="container">
        {/* Breadcrumbs */}
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <ChevronRight size={14} />
          <Link to="/">Collections</Link>
          <ChevronRight size={14} />
          <span className="current">{product.name}</span>
        </nav>

        <div className="product-main">
          {/* Gallery */}
          <div className="product-gallery-section">
            <ImageGallery images={product.images} />
          </div>

          {/* Info */}
          <div className="product-info-section">
            <div className="product-header">
              <div className="header-top">
                <span className="brand-name">{product.brand}</span>
                <div className="action-btns">
                  <button className="btn-share" onClick={handleShare} title="Share">
                    <Share2 size={20} />
                  </button>
                  <button className="btn-wishlist-detail" title="Add to Wishlist">
                    <Heart size={20} />
                  </button>
                </div>
              </div>
              <h1>{product.name}</h1>
              <div className="rating-summary">
                <div className="stars">
                  <Star size={18} fill="var(--accent-color)" color="var(--accent-color)" />
                  <span className="avg-rating">{calculateAvgRating()}</span>
                </div>
                <span className="review-count">({reviews.length} reviews)</span>
              </div>
              <p className="product-price">Rs. {product.price.toLocaleString()}</p>
            </div>

            <div className="product-description">
              <p>{product.description}</p>
            </div>

            <div className="product-options">
              <h3>Available Sizes</h3>
              <div className="size-chips">
                {product.sizes.map((size) => (
                  <button 
                    key={size} 
                    className={`size-chip ${selectedSize === size ? 'active' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {product.notes && (
              <div className="fragrance-notes">
                <h3>Fragrance Notes</h3>
                <div className="notes-grid">
                  <div className="note-group">
                    <span className="note-label">Top</span>
                    <div className="note-tags">
                      {product.notes.top.map(n => <span key={n} className="note-tag">{n}</span>)}
                    </div>
                  </div>
                  <div className="note-group">
                    <span className="note-label">Heart</span>
                    <div className="note-tags">
                      {product.notes.heart.map(n => <span key={n} className="note-tag">{n}</span>)}
                    </div>
                  </div>
                  <div className="note-group">
                    <span className="note-label">Base</span>
                    <div className="note-tags">
                      {product.notes.base.map(n => <span key={n} className="note-tag">{n}</span>)}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <button className="btn-add-to-cart">Add to Bag — Rs. {product.price.toLocaleString()}</button>
          </div>
        </div>

        {/* Reviews Section */}
        <section className="product-reviews-section">
          <div className="reviews-grid">
            <div className="reviews-left">
              <ReviewSection reviews={reviews} />
            </div>
            <div className="reviews-right">
              <ReviewForm productId={product._id} onSuccess={loadData} />
            </div>
          </div>
        </section>

        <RelatedProducts category={product.category} currentProductId={product._id} />
      </div>
    </div>
  );
};

export default ProductDetail;
