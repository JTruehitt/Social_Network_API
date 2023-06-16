import express from 'express';
const router = express.Router();
import { getAllUsers, getUserById, createUser } from '../controllers/index.js';

// @ desc     Get all users
// @ route    GET /api/users
// @ access   Public
router.get('/', getAllUsers)

// @desc    Get a single user by id
// @route   GET /api/users/:id
// @access  Public
.get('/:id', getUserById)

// @desc    Create a new user
// @route   POST /api/users
// @access  Public
.post('/', createUser)

export default router;