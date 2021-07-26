import express from 'express';

import { getPosts, createPost, updatePost, deletePost, likePost } from '../controllers/posts.js';

const router = express.Router();

router.get('/', getPosts);// callback func when someone visits localhost:5000/
router.post('/', createPost); // to create post on localhost:5000/
router.patch('/:id', updatePost);//to update existing documents
router.delete('/:id', deletePost);// to delete we will need id to know what post to delete
router.patch('/:id/likePost', likePost);//we are using patch since liking someting is kind of updating

export default router;

// http://localhost:5000/  = posts will not be available here
// http://localhost:5000/posts  = because we added a prefix in index.js
