import { User, Thought } from '../models/index.js';
import { ObjectId } from 'mongoose';

// @desc    Get all users
// @route   GET /api/users
// @access  Public
const getAllUsers = async (req, res) => {
  try {
    const userData = await User.find().populate('thoughts').populate('friends');
    if (!userData) {
      res.status(404).json({ message: 'No users found' });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

// @desc    Get a single user by id
// @route   GET /api/users/:id
// @access  Public
const getUserById = async (req, res) => {
  try {
    const userData = await User.findOne({ _id: req.params.id})
      .populate('thoughts')
      .populate('friends');
    if (!userData) {
      res.status(404).json({ message: 'No user found with this id' });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

// @desc    Create a new user
// @route   POST /api/users
// @access  Public
const createUser = async (req, res) => {
    try {
        const userData = await User.create(req.body);
        res.status(200).json(userData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
};



export { getAllUsers, getUserById, createUser }