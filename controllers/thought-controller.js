import { User, Thought } from '../models/index.js';
import { Types } from 'mongoose';

// @desc    Get all thoughts
// @route   GET /api/thoughts
// @access  Public
const getAllThoughts = async (req, res) => {
  try {
    const dbThoughtData = await Thought.find({}).populate('reactions');
    if (!dbThoughtData) {
      res.status(404).json({ message: 'No thoughts found!' });
      return;
    }
    res.status(200).json(dbThoughtData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

// @desc    Get thought by id
// @route   GET /api/thoughts/:id
// @access  Public
const getThoughtById = async (req, res) => {
  try {
    const dbThoughtData = await Thought.findById(req.params.id).populate(
      'reactions'
    );
    if (!dbThoughtData) {
      res.status(404).json({ message: 'No thought found with this id!' });
      return;
    }
    res.status(200).json(dbThoughtData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

// @desc    Create a thought
// @route   POST /api/thoughts
// @access  Public
const createThought = async (req, res) => {
  try {
    const dbThoughtData = await Thought.create(req.body);
    const dbUserData = await User.findByIdAndUpdate(
      req.body.userId,
      { $push: { thoughts: dbThoughtData._id } },
      { new: true }
    );
    if (!dbUserData) {
      res.status(404).json({ message: 'No user found with this id!' });
      return;
    }
    res.status(200).json(dbThoughtData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

// @desc    Update a thought
// @route   PUT /api/thoughts/:id
// @access  Public
const updateThought = async (req, res) => {
  try {
    const thoughtData = await Thought.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!thoughtData) {
      res.status(404).json({ message: 'No thought found with this id!' });
      return;
    }
    res.status(200).json(thoughtData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

// @desc    Delete a thought
// @route   DELETE /api/thoughts/:id
// @access  Public
const deleteThought = async (req, res) => {
  try {
    const dbThoughtData = await Thought.findByIdAndDelete(req.params.id);
    if (!dbThoughtData) {
      res.status(404).json({ message: 'No thought found with this id!' });
      return;
    }
    const dbUserData = await User.findOneAndUpdate(
      { username: dbThoughtData.username },
      { $pull: { thoughts: { _id: dbThoughtData._id } } },
      { new: true }
    );
    if (!dbUserData) {
      res.status(404).json({ message: 'No user found with this id!' });
      return;
    }

    res.status(200).json({ message: 'Thought deleted!' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

// @desc    Create a reaction
// @route   POST /api/thoughts/:thoughtId/reactions
// @access  Public
const createReaction = async (req, res) => {
  try {
    const dbThoughtData = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $push: { reactions: req.body } },
      { new: true }
    );
    if (!dbThoughtData) {
      res.status(404).json({ message: 'No thought found with this id!' });
      return;
    }
    res.status(200).json(dbThoughtData.reactions);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

// @desc    Delete a reaction from the thought.reaction array
// @route   DELETE /api/thoughts/:thoughtId/reactions/:reactionId
// @access  Public
const deleteReaction = async (req, res) => {
  try {
    const dbThoughtData = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $pull: { reactions: { _id: req.params.reactionId } } },
      { new: true }
    );
    if (!dbThoughtData) {
      res.status(404).json({ message: 'No thought found with this id!' });
      return;
    }
    res.status(200).json({ message: 'Reaction deleted!' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
};
