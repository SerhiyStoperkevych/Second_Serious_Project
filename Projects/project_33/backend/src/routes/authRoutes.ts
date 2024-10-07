import express from 'express';
import {
  register,
  login,
  logout,
  getCurrentUser,
  followUser,
  unfollowUser,
  getAllUsers,
  updateUserProfile,
  getUserById, // Import the new function
} from '../controllers/authController';

const router = express.Router();

// Registration route
router.post('/register', register);

// Login route
router.post('/login', login);

// Logout route
router.post('/logout', logout);

// Check current user
router.get('/me', getCurrentUser);

// Fetch all users
router.get('/users', getAllUsers);

// Fetch user by ID
router.get('/user/:id', getUserById);

// Update user profile
router.put('/user/profile', updateUserProfile);

// Follow and Unfollow routes
router.post('/follow/:id', followUser);
router.post('/unfollow/:id', unfollowUser);

export default router;
