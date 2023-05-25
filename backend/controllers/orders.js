const pool = require("../models/db");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require("twilio")(accountSid, authToken)



const createNewOrder = (req,res) => {
    const requester_user_id = req.token.userId
    const {schedule_date,order_desc,receiver_user_id} = req.body
    const data = [schedule_date || null, order_desc || null, requester_user_id || null,receiver_user_id||null,"1"]
    const query=`INSERT INTO orders (schedule_date, order_desc, requester_user_id,receiver_user_id, state_id) VALUES($1,$2,$3,$4,$5) RETURNING *;`
    pool
    .query(query,data)
    .then((result) => {
        res.status(200).json({
          success: true,
          message: "new order created",
          order: result.rows
        });
      })
      .catch((err) => {
        res.status(409).json({
          success: false,
          message: "server error",
          err:err.message,
        });
      });
}
const updateOrderById = (req,res) => {
    const id = req.params.order_id
    const {schedule_date,order_desc} = req.body
    const data=[schedule_date||null,order_desc||null]
    const query=`UPDATE orders SET schedule_date = COALESCE($1,schedule_date), order_desc = COALESCE($2,order_desc) WHERE id = ${id} RETURNING *;`
    pool
    .query(query,data)
    .then((result) => {
        res.status(200).json({
          success: true,
          message: "order update successfuly",
          order: result.rows
        });
      })
      .catch((err) => {
        res.status(409).json({
          success: false,
          message: "server error",
          err:err.message,
        });
      });
}
const getOrderByReceiverId = (req,res) => {
    const query=`SELECT * FROM orders WHERE receiver_user_id = ${req.params.user_id};`
    pool
    .query(query)
    .then((result) => {
        res.status(200).json({
          success: true,
          message: "order get successfuly",
          order: result.rows
        });
      })
      .catch((err) => {
        res.status(409).json({
          success: false,
          message: "server error",
          err:err.message,
        });
      });
}
const getOrderByRequesterId = (req,res) => {
  const query=`SELECT * FROM orders WHERE requester_user_id = ${req.token.userId};`
  pool
  .query(query)
  .then((result) => {
      res.status(200).json({
        success: true,
        message: "order get successfuly",
        order: result.rows
      });
    })
    .catch((err) => {
      res.status(409).json({
        success: false,
        message: "* server error *",
        err:err.message,
      });
    });
}
const getAllOrder = (req,res) => {
    const query=`SELECT * FROM orders`
    pool
    .query(query)
    .then((result) => {
        res.status(200).json({
          success: true,
          message: "orders get successfuly",
          order: result.rows
        });
      })
      .catch((err) => {
        res.status(409).json({
          success: false,
          message: "server error",
          err:err.message,
        });
      });
}
const getOrderById = (req,res) => {
  const id = req.params.order_id
  const query=`SELECT * FROM orders WHERE id = ${id};`
  pool
  .query(query)
  .then((result) => {
      res.status(200).json({
        success: true,
        message: "order get successfuly",
        order: result.rows
      });
    })
    .catch((err) => {
      res.status(409).json({
        success: false,
        message: "server error",
        err:err.message,
      });
    });
}
const updateStateOrderById = (req,res) => {
  const id = req.params.order_id
  const {state_id} = req.body
  const query=`UPDATE orders SET state_id = COALESCE($1,state_id) WHERE id = ${id} RETURNING *;`
  pool
  .query(query,[state_id])
  .then((result) => {
      res.status(200).json({
        success: true,
        message: "order update successfuly",
        order: result.rows
      });
    })
    .catch((err) => {
      res.status(409).json({
        success: false,
        message: "server error",
        err:err.message,
      });
    });
}


const sendUserOrederBooking = (req, res) =>{
  const{ schedule_date } =  req.body
  client.messages
  .create({
     body: `you have an order booked on day ${schedule_date}`,
     from: '+15403849963',
     to: '+962779582933'
   })
  .then((res)=>{
    res.status(200).json({
      success : true,
      message : "message has been sent successfuly",
      result : res
    })
  })
  .catch((err)=>{
    res.status(500).json({
      success : false,
      message : "message hasn't been sent"
    })
  })
}
module.exports = {
    createNewOrder,
    updateOrderById,
    getOrderByReceiverId,
    getAllOrder,
    getOrderById,
    updateStateOrderById,
    sendUserOrederBooking,
    getOrderByRequesterId
}
