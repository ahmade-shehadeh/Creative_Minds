const express = require("express");
const {getstate,updatestateById}=require('../controllers/state')
const authentication=require('../middleware/authentication')

const stateRouter=express.Router()

stateRouter.get('/:id',authentication,getstate)

stateRouter.put('/:id',authentication,updatestateById)


module.exports=stateRouter