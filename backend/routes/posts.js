const express = require("express");
const authentication=require('../middleware/authentication')
const authorization=require('../middleware/authorization')
const {
    createNewPost,
    getPostsByuser,
    updatePostById,
    deletePostById,
    getAllPosts,
    getPostsById,
} = require("../controllers/posts");

const postsRouter = express.Router();

postsRouter.post('/',authentication,createNewPost)
postsRouter.get('/user/myposts',authentication,getPostsByuser)
postsRouter.put('/:postId',authentication,updatePostById)
postsRouter.delete("/:id", authentication, deletePostById)
postsRouter.get('/',getAllPosts)
postsRouter.get(`/post/:post_id`,getPostsById)


module.exports = postsRouter;
