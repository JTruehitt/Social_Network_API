import { Schema, Types } from 'mongoose';
import dateFormat from '../utils/date-format.js';

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Types.ObjectId,
      default: () => new ObjectId(),
    },
    reactionBody: {
      type: String,
      required: [true, 'Please enter a reaction'],
      maxlength: 280,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => dateFormat(date),
    },
  },

  {
    toJSON: {
      getters: true,
    },
    timestamps: true,
    id: false,
  }
);

export default reactionSchema;
