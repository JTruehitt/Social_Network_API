import { User, Thought } from '../models/index.js';

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
    const userData = await User.findOne({ _id: req.params.id })
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
  }
};

// @desc    Update a user
// @route   PUT /api/users/:id
// @access  Public
const updateUser = async (req, res) => {
  try {
    const userData = await User.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
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

// @desc    Delete a user and the user's thoughts
// @route   DELETE /api/users/:id
// @access  Public
const deleteUser = async (req, res) => {
  try {
    const userData = await User.findOneAndDelete({ _id: req.params.id });
    if (!userData) {
      res.status(404).json({ message: 'No user found with this id' });
      return;
    }
    // if user founds, delete associated thoughts
    await Thought.deleteMany({ username: userData.username });
    res.status(200).json({
      message: `User ${userData.username} and associated thoughts deleted`,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

// @desc   Add a friend to a user's friend list
// @route  POST /api/users/:userId/friends/:friendId
// @access Public
const addFriend = async (req, res) => {
  try {
    const userData = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    );
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

// @desc   Remove a friend from a user's friend list
// @route  DELETE /api/users/:userId/friends/:friendId
// @access Public
const removeFriend = async (req, res) => {
  try {
    const userData = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    );
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

export {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend
};
