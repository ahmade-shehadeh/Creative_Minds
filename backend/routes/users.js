const express = require("express");
const{register,login,updateUserById,getInfoUser,getInfoUserById}=require('../controllers/users')
const usersRouter=express.Router()
const authentication=require('../middleware/authentication')

usersRouter.post('/register',register)
usersRouter.post('/login',login)
usersRouter.put('/updateUser',authentication,updateUserById)
usersRouter.get('/',authentication,getInfoUser)
usersRouter.get('/comments/:userId',getInfoUserById)

module.exports=usersRouter