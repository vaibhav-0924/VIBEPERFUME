import express from 'express';
import { body } from 'express-validator';
import { 
  getProducts, 
  getProductById, 
  getProductReviews, 
  addProductReview 
} from '../controllers/productController.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.get('/:id/reviews', getProductReviews);

router.post('/:id/reviews', [
  body('reviewerName').isString().isLength({ min: 2, max: 80 }).withMessage('Name must be 2-80 characters'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comment').isString().isLength({ min: 10, max: 1000 }).withMessage('Comment must be 10-1000 characters'),
], addProductReview);

export default router;
