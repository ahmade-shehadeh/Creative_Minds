const express=require('express')
const authentication=require('../middleware/authentication')

const {updateRoleByUserId}=require('../controllers/role')

const roleRouter=express.Router()

roleRouter.put('/:id',authentication,updateRoleByUserId)

module.exports=roleRouter