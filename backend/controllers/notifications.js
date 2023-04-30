const pool = require("../models/db");

const createNewNotification = (req,res) => {
    const {description,status,receiver_user_id} = req.body
    const order_id  = req.params.order_id

    const data = [description || null, status || null, receiver_user_id || null,order_id||null]
    const query=`INSERT INTO notifications (description, status, receiver_user_id,order_id) VALUES($1,$2,$3,$4) RETURNING *;`
    pool
    .query(query,data)
    .then((result) => {
        res.status(200).json({
          success: true,
          message: "new notifications created",
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

const getNotificationById = (req,res) => {
    const user_id  = req.token.userId
    const query=`SELECT * FROM notifications WHERE receiver_user_id = ${user_id };`
    pool
    .query(query)
    .then((result) => {
        res.status(200).json({
          success: true,
          message: "notification get successfuly",
          notification: result.rows
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
const updateStatusNotifivationById = (req,res) => {
  const id = req.params.notification_id
  const {status} = req.body
  const data=[status||null]
  const query=`UPDATE notifications SET status = COALESCE($1,status) WHERE id = ${id} RETURNING *;`
  pool
  .query(query,data)
  .then((result)=>{
    res.status(200).json({
      success: true,
      message:"notification updated",
      notification:result.rows
    })
  })
  .catch((err)=>{
    res.status(500).json({
      success: false,
      message: "Server Error",
      err: err.message
    })
  })
}
const deleteNotificationById = (req, res) =>{
  const id =  req.params.id 
  const queryString = `DELETE FROM notifications where id = ${id};`
  pool
    .query(queryString)
    .then((result)=>{   
      res.status(202).json({
          success: true,
          massage: `notification with id: ${id} deleted successfully`,
          result:result.rows[0]
      })
  })
  .catch((err)=>{
      res.status(500).json({
          success: false,
          message: "Server error",
          error : err
      })              
  })  
} 
module.exports={
    createNewNotification,
    getNotificationById,
    updateStatusNotifivationById,
    deleteNotificationById
}