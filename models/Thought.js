import { Schema, model } from 'mongoose';
import dateFormat from '../utils/dateFormat';
import reactionSchema from './Reaction';

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: [true, 'Please enter a thought'],
        minlength: 1,
        maxlength: 280,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (date) => dateFormat(date),
    },
    username: {
        type: String,
        required: [true, 'Please enter a username'],
        trim: true
    },
    reactions: [reactionSchema]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false

});

// get total count of reactions on retrieval
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
}
);

const Thought = model('Thought', thoughtSchema);

export default Thought;

