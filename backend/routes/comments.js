const express = require("express")
const {createNewComment, getCommentsByUser,updateCommentById, deleteCommentById} = require("../controllers/comments")
const authentication = require("../middleware/authentication")

const commentsRouter = express.Router();


commentsRouter.post("/:id", authentication, createNewComment)
commentsRouter.get("/:id", authentication, getCommentsByUser)
commentsRouter.put("/:id", authentication, updateCommentById)
commentsRouter.delete("/:id", authentication, deleteCommentById)

module.exports = commentsRouter