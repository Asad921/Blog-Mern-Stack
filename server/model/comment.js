import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    postId: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: false
    },
    comments: {
        type: String,
        required: true
    },

})

export default mongoose.model('Comment', commentSchema);

