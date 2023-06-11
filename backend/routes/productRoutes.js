import express from 'express';
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
} from '../controllers/productControllers.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getProducts);
router.post('/', protect, admin, createProduct);
router.get('/:id', getProductById);
router.delete('/:id', protect, admin, deleteProduct);

export default router;
