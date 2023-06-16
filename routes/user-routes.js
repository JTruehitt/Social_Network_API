import express from 'express';
const router = express.Router();
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} from '../controllers/index.js';

router

  // @ desc     Get all users
  // @ route    GET /api/users
  // @ access   Public
  .get('/', getAllUsers)

  // @desc    Get a single user by id
  // @route   GET /api/users/:id
  // @access  Public
  .get('/:id', getUserById)

  // @desc    Create a new user
  // @route   POST /api/users
  // @access  Public
  .post('/', createUser)

  // @desc    Update a user
  // @route   PUT /api/users/:id
  // @access  Public
  .put('/:id', updateUser)

  // @desc    Delete a user and the user's thoughts
  // @route   DELETE /api/users/:id
  // @access  Public
  .delete('/:id', deleteUser)

  // @desc   Add a friend to a user's friend list
  // @route  POST /api/users/:userId/friends/:friendId
  // @access Public
  .post('/:userId/friends/:friendId', addFriend)

  // @desc    Delete a user and the user's thoughts
  // @route   DELETE /api/users/:id
  // @access  Public
  .delete('/:userId/friends/:friendId', removeFriend);

export default router;
