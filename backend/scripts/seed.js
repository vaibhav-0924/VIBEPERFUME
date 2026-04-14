import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';
import Review from '../models/Review.js';

dotenv.config();

const products = [
  {
    name: "Noir Absolu",
    brand: "Maison Luxe",
    category: "woody",
    shortDescription: "A deep, smoky oud with hints of amber and leather.",
    description: "Noir Absolu is an opulent woody fragrance that opens with spicy top notes of bergamot and black pepper, leading into a heart of oud and rose. The base is a rich blend of amber, musk, and sandalwood, creating a mysterious and long-lasting scent.",
    price: 3200,
    currency: "INR",
    images: [
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800"
    ],
    sizes: ["30ml", "50ml", "100ml"],
    notes: {
      top: ["Bergamot", "Black Pepper"],
      heart: ["Oud", "Rose"],
      base: ["Amber", "Musk", "Sandalwood"]
    }
  },
  {
    name: "Rose Éclat",
    brand: "Lumière Fragrances",
    category: "floral",
    shortDescription: "A delicate and radiant rose bouquet with a touch of vanilla.",
    description: "Rose Éclat captures the essence of a blooming garden at dawn. This radiant floral fragrance features Bulgarian rose and jasmine at its core, balanced by fresh citrus top notes and a warm, velvety vanilla base.",
    price: 2800,
    currency: "INR",
    images: [
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=800"
    ],
    sizes: ["50ml", "100ml"],
    notes: {
      top: ["Lemon", "Pear"],
      heart: ["Bulgarian Rose", "Jasmine"],
      base: ["Vanilla", "White Musk"]
    }
  },
  {
    name: "Citrus Verve",
    brand: "Riviera Essence",
    category: "citrus",
    shortDescription: "An energizing burst of Mediterranean citrus and basil.",
    description: "Citrus Verve is a refreshing and uplifting fragrance inspired by the Mediterranean coast. It opens with a vibrant mix of Sicilian lemon and zesty grapefruit, complemented by a heart of aromatic basil and a clean cedarwood base.",
    price: 1800,
    currency: "INR",
    images: [
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800"
    ],
    sizes: ["30ml", "50ml", "100ml"],
    notes: {
      top: ["Sicilian Lemon", "Grapefruit"],
      heart: ["Basil", "Verbena"],
      base: ["Cedarwood", "Vetiver"]
    }
  },
  {
    name: "Oud Mystique",
    brand: "Desert Gold",
    category: "oriental",
    shortDescription: "An exotic and alluring blend of oud, saffron, and spices.",
    description: "Oud Mystique is a journey into the heart of the Orient. This complex fragrance centers around rare Cambodian oud, enriched with precious saffron and a warm spice blend of cardamom and cinnamon.",
    price: 4500,
    currency: "INR",
    images: [
      "https://images.unsplash.com/photo-1583445095369-9c651e7e5d30?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800"
    ],
    sizes: ["100ml"],
    notes: {
      top: ["Saffron", "Cardamom"],
      heart: ["Cambodian Oud", "Cinnamon"],
      base: ["Patchouli", "Ambergris"]
    }
  },
  {
    name: "Aqua Fresh",
    brand: "Oceanic Air",
    category: "fresh",
    shortDescription: "A crisp and invigorating scent of sea salt and mineral notes.",
    description: "Aqua Fresh captures the essence of a cool sea breeze. Crisp sea salt and mineral notes are balanced by a touch of sage and a base of sun-drenched ambrette seeds, creating a clean and invigorating unisex scent.",
    price: 2200,
    currency: "INR",
    images: [
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800"
    ],
    sizes: ["50ml", "100ml"],
    notes: {
      top: ["Sea Salt", "Bergamot"],
      heart: ["Sage", "Seaweed"],
      base: ["Ambrette Seeds", "Driftwood"]
    }
  }
];

const reviewsData = [
  { reviewerName: "Arjun Sharma", rating: 5, comment: "One of the best oud fragrances I have worn. Gets compliments every day." },
  { reviewerName: "Meera Nair", rating: 4, comment: "Rich and long lasting. A bit heavy for summer but perfect for winter evenings." },
  { reviewerName: "Priya Kapoor", rating: 5, comment: "Smells exactly like fresh rose petals. Absolutely beautiful." },
  { reviewerName: "Ravi Verma", rating: 4, comment: "Bought this for my wife and she loves it. Great longevity." },
  { reviewerName: "Kiran Desai", rating: 4, comment: "Perfect summer fragrance. Very uplifting and fresh." },
  { reviewerName: "Sunita Rao", rating: 3, comment: "Nice scent but fades after two hours. Good for the price though." },
  { reviewerName: "Hamid Sheikh", rating: 5, comment: "This is what luxury smells like. Worth every rupee." },
  { reviewerName: "Fatima Ali", rating: 5, comment: "Incredible depth and complexity. The saffron note is divine." },
  { reviewerName: "Vikram Malhotra", rating: 4, comment: "Clean and office appropriate. Great for daily wear." },
  { reviewerName: "Deepa Iyer", rating: 3, comment: "Pleasant but a little generic. Good starter fragrance." }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for seeding...');

    await Product.deleteMany({});
    await Review.deleteMany({});
    console.log('Cleared existing data.');

    const createdProducts = await Product.insertMany(products);
    console.log(`Seeded ${createdProducts.length} products.`);

    const reviews = [];
    createdProducts.forEach((product, index) => {
      // Assign 2 reviews to each product
      const review1 = { ...reviewsData[index * 2], productId: product._id };
      const review2 = { ...reviewsData[index * 2 + 1], productId: product._id };
      reviews.push(review1, review2);
    });

    await Review.insertMany(reviews);
    console.log(`Seeded ${reviews.length} reviews.`);

    console.log('Seeding complete!');
    process.exit();
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDB();
