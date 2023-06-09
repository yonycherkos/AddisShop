import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  addOrderItems,
  getOrderById,
} from '../controllers/orderControllers.js';

const router = express.Router();

router.post('/', protect, addOrderItems);
router.get('/', protect, getOrderById);

export default router;
