// create user model
import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Please enter a username'],
      unique: true,
      trim: true,
      validate: {
        validator: (username) => {
            return username.length > 0;
        },
        message: 'Please enter a username',
      },
      index: true,
    },
    email: {
      type: String,
      required: [true, 'Please enter an email'],
      unique: true,
      trim: true,
      match: [
        /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
        'Please enter a valid email address',
      ],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
    timestamps: true,
  }
);

// get total count of friends on retrieval
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User = model('User', userSchema);

export default User;
