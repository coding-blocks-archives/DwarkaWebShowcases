

const mongoose = require('mongoose');
 
const PostSchema = new mongoose.Schema({
    mids:String,
    title: String,
    description: String,
    content: String,
    username: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
});
 
const Post = mongoose.model('Post', PostSchema);
module.exports = Post;
