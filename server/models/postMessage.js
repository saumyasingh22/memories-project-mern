import mongoose from 'mongoose'; // backend

//mongoose schema = mongoose allows us to give some uniformity to the documents like title, date, etc.
const postSchema = mongoose.Schema({ //object
    title: String,
    message: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likeCount: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

//now we have to turn schema into model
const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage; // we are exporting mongoose model from postMessageFile so that 
// we can be able to run different commands like find, create, update, delete
