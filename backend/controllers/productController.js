import Product from '../models/Product.js';
import Review from '../models/Review.js';
import { validationResult } from 'express-validator';

// --- Mock Data Fallback ---
const mockProducts = [
  {
    _id: "mock1",
    name: "Noir Absolu",
    brand: "Maison Luxe",
    category: "woody",
    shortDescription: "A deep, smoky oud with hints of amber and leather.",
    description: "Noir Absolu is an opulent woody fragrance that opens with spicy top notes of bergamot and black pepper, leading into a heart of oud and rose. The base is a rich blend of amber, musk, and sandalwood, creating a mysterious and long-lasting scent.",
    price: 3200,
    currency: "INR",
    images: ["https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800"],
    sizes: ["30ml", "50ml", "100ml"],
    notes: { top: ["Bergamot", "Black Pepper"], heart: ["Oud", "Rose"], base: ["Amber", "Musk", "Sandalwood"] }
  },
  {
    _id: "mock2",
    name: "Rose Éclat",
    brand: "Lumière Fragrances",
    category: "floral",
    shortDescription: "A delicate and radiant rose bouquet with a touch of vanilla.",
    description: "Rose Éclat captures the essence of a blooming garden at dawn. This radiant floral fragrance features Bulgarian rose and jasmine at its core.",
    price: 2800,
    currency: "INR",
    images: ["https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800"],
    sizes: ["50ml", "100ml"],
    notes: { top: ["Lemon", "Pear"], heart: ["Bulgarian Rose"], base: ["Vanilla"] }
  },
  {
    _id: "mock3",
    name: "Citrus Verve",
    brand: "Riviera Essence",
    category: "citrus",
    shortDescription: "An energizing burst of Mediterranean citrus and basil.",
    description: "Citrus Verve is a refreshing and uplifting fragrance inspired by the Mediterranean coast.",
    price: 1800,
    currency: "INR",
    images: ["https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=800"],
    sizes: ["30ml", "50ml"],
    notes: { top: ["Sicilian Lemon"], heart: ["Basil"], base: ["Cedarwood"] }
  },
  {
    _id: "mock4",
    name: "Oud Mystique",
    brand: "Desert Gold",
    category: "oriental",
    shortDescription: "An exotic and alluring blend of oud, saffron, and spices.",
    description: "Oud Mystique is a journey into the heart of the Orient.",
    price: 4500,
    currency: "INR",
    images: ["https://images.unsplash.com/photo-1583445095369-9c651e7e5d30?auto=format&fit=crop&q=80&w=800"],
    sizes: ["100ml"],
    notes: { top: ["Saffron"], heart: ["Cambodian Oud"], base: ["Patchouli"] }
  },
  {
    _id: "mock5",
    name: "Aqua Fresh",
    brand: "Oceanic Air",
    category: "fresh",
    shortDescription: "A crisp and invigorating scent of sea salt and mineral notes.",
    description: "Aqua Fresh captures the essence of a cool sea breeze.",
    price: 2200,
    currency: "INR",
    images: ["https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800"],
    sizes: ["50ml", "100ml"],
    notes: { top: ["Sea Salt"], heart: ["Sage"], base: ["Ambrette Seeds"] }
  }
];

let mockReviews = [
  { _id: "r1", productId: "mock1", reviewerName: "Ravi Kumar", rating: 5, comment: "Absolutely stunning fragrance. Long lasting and unique.", createdAt: new Date().toISOString() },
  { _id: "r2", productId: "mock1", reviewerName: "Sneha Patel", rating: 4, comment: "Beautiful scent, though a bit strong for everyday use.", createdAt: new Date().toISOString() }
];

export const getProducts = async (req, res) => {
  try {
    const { category, limit = 20 } = req.query;
    
    if (!req.isDbConnected) {
      let filtered = mockProducts;
      if (category && category !== 'All') {
        filtered = mockProducts.filter(p => p.category === category.toLowerCase());
      }
      return res.json({ success: true, message: "Fetched from Mock Fallback", data: filtered.slice(0, Number(limit)) });
    }

    const query = {};
    if (category && category !== 'All') {
      query.category = category.toLowerCase();
    }
    const products = await Product.find(query).limit(Number(limit));
    res.json({ success: true, message: "Products fetched successfully", data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, data: null });
  }
};

export const getProductById = async (req, res) => {
  try {
    if (!req.isDbConnected) {
      const product = mockProducts.find(p => p._id === req.params.id);
      if (!product) return res.status(404).json({ success: false, message: "Product not found", data: null });
      return res.json({ success: true, message: "Fetched from Mock Fallback", data: product });
    }
    
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: "Product not found", data: null });
    res.json({ success: true, message: "Product fetched successfully", data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: "Invalid product ID", data: null });
  }
};

export const getProductReviews = async (req, res) => {
  try {
    if (!req.isDbConnected) {
      const reviews = mockReviews.filter(r => r.productId === req.params.id);
      return res.json({ success: true, message: "Fetched from Mock Fallback", data: reviews });
    }
    const reviews = await Review.find({ productId: req.params.id }).sort({ createdAt: -1 });
    res.json({ success: true, message: "Reviews fetched successfully", data: reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, data: null });
  }
};

export const addProductReview = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array().map(err => ({ field: err.path, message: err.msg })),
      data: null
    });
  }

  try {
    const { reviewerName, rating, comment } = req.body;
    const productId = req.params.id;

    if (!req.isDbConnected) {
      const newReview = { _id: "mock-r-" + Date.now(), productId, reviewerName, rating: Number(rating), comment, createdAt: new Date().toISOString() };
      mockReviews.unshift(newReview);
      return res.status(201).json({ success: true, message: "Review added to Mock Store", data: newReview });
    }

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ success: false, message: "Product not found", data: null });

    const newReview = new Review({ productId, reviewerName, rating, comment });
    await newReview.save();
    res.status(201).json({ success: true, message: "Review added successfully", data: newReview });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, data: null });
  }
};
