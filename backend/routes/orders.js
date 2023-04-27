const express = require("express");
const authentication=require('../middleware/authentication')

const {createNewOrder,updateOrderById,getOrderByReceiverId,getAllOrder,getOrderById,updateStateOrderById} = require("../controllers/orders");

const orderRouter = express.Router();

orderRouter.post('/',authentication,createNewOrder)
orderRouter.put('/:order_id',authentication,updateOrderById)
orderRouter.put('/state/:order_id',authentication,updateStateOrderById)
orderRouter.get('/:user_id',authentication,getOrderByReceiverId)
orderRouter.get('/order_id/:order_id',getOrderById)
// orderRouter.get('/',authentication,getAllOrder)

module.exports = orderRouter;