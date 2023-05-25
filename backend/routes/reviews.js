const express=require('express')
const {createNewReviews,updatestateById,getREviewsByOrder,getREviewsByuser,getREviewsByIduser}=require('../controllers/reviws')
const authentication=require('../middleware/authentication')

const reviewRouter=express.Router()

reviewRouter.post('/', authentication,createNewReviews)
reviewRouter.put('/:id', authentication,updatestateById)
reviewRouter.get('/:order_id',getREviewsByOrder)
reviewRouter.get('/',authentication,getREviewsByuser)
reviewRouter.get('/post/:userId',getREviewsByIduser)


module.exports=reviewRouter