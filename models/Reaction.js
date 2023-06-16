import { Schema, ObjectId } from 'mongoose';
import dateFormat from '../utils/dateFormat';

const reactionSchema = new Schema(
  {
    reactionId: {
      type: ObjectId,
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
      required: [true, 'Please enter a username'],
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
    id: false,
  }
);

export default reactionSchema;
