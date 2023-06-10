import express from 'express';
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
} from '../controllers/userControllers.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', authUser);
router.post('/register', registerUser);
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.get('/', protect, admin, getUsers);

export default router;
