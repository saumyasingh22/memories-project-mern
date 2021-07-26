
/* to make posts file less complex  : all func are here and all routes there*/
import PostMessage from "../models/postMessage.js";
import mongoose from 'mongoose';
//displaying diff posts
export const getPosts = async (req, res) => { // callback func when someone visits 5000/
    try {
        const postMessages = await PostMessage.find();// to retrieve all the posts we have in our database 
                                                      ///finding something inside model takes time so add await 
                                                      ///and since it is asynchronous we have to make func async


        res.status(200).json(postMessages); /// error of all messages
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

//adding diff posts
export const createPost = async(req, res)=>{
    const post = req.body; /// post req has access to req.body to send post req from frontend

    const newPost = new PostMessage(post); /// create new post

    try {
        await newPost.save();

        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

//updating existing posts
export const updatePost = async(req, res) => {
    const { id: _id } = req.params; //we set our route to be "/posts/123" so id will be equal to 123, 
                                    //while destructing we can also rename our properties here we names our id as _id
    const post = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No post with that id`);// we have to check if _id is our mongoose id our not, if not valid 404

    //{...post, id} because we have to add id too in the backend with other fields if we are going to work on it
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id}, { new: true });// if id is valid, then we can update our post, we are going to call our model PostMessage 
                                                                                    //and with parameter id and updated post(sent from frontend) new is true so that it is actually updated

    res.json(updatedPost);//send the updated post
}

//delete post
export const deletePost = async(req, res) => {
    const { id } = req.params; 
    const post = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with that id`);

    await PostMessage.findByIdAndRemove(id);

    res.json({message: 'Post deleted successfully'});
}

export const likePost = async(req, res) => {
    const { id } = req.params; 

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with that id`);

    const post = await PostMessage.findById(id);//going to return us a post
    const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount+1 }, { new: true });

    res.json(updatedPost);
}

//now we can move to client/api
