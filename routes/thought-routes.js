import express from 'express';
const router = express.Router();
import {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} from '../controllers/index.js';

router

  // @ desc     Get all thoughts
  // @ route    GET /api/thoughts
  // @ access   Public
  .get('/', getAllThoughts)

  // @desc    Get thought by id
  // @route   GET /api/thoughts/:id
  // @access  Public
  .get('/:id', getThoughtById)

  // @desc    Create a thought
  // @route   POST /api/thoughts
  // @access  Public
  .post('/', createThought)

  // @desc    Update a thought
  // @route   PUT /api/thoughts/:id
  // @access  Public
  .put('/:id', updateThought)

  // @desc    Delete a thought and the associated reactions and remove the thought from the user's thoughts array
  // @route   DELETE /api/thoughts/:id
  // @access  Public
  .delete('/:id', deleteThought)

  // @desc    Create a reaction
  // @route   POST /api/thoughts/:thoughtId/reactions
  // @access  Public
  .post('/:thoughtId/reactions', createReaction)

  // @desc    Delete a reaction
  // @route   DELETE /api/thoughts/:thoughtId/reactions/:reactionId
  // @access  Public
  .delete('/:thoughtId/reactions/:reactionId', deleteReaction);

export default router;
