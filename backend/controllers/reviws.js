const pool = require("../models/db");
const createNewReviews = (req, res) => {
  const requester_user_id = req.token.userId;
  const { rate, receiver_user_id, order_id } = req.body;
  const data = [rate, receiver_user_id, order_id, requester_user_id];
  const query = `INSERT INTO reviews (rate,
                receiver_user_id,
                order_id, requester_user_id) VALUES ($1,$2,$3,$4) RETURNING *`;
  pool
    .query(query, data)
    .then((result) => {
      res.status(200).json({
        success: true,
        mesasge: "review created",
        reviews: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        err: err.message,
      });
    });
};
const updatestateById = (req, res) => {
  const id = req.params.id;

  const { rate } = req.body;

  const data = [rate || null, id];

  const query = `UPDATE reviews SET rate = COALESCE($1,rate) WHERE id =$2 RETURNING *;`;
  pool
    .query(query, data)
    .then((result) => {
      if (!result.rows) {
        res.status(404).json({
          success: false,
          message: "Don't have any reviews",
          err: err.message,
        });
      } else {
        res.status(200).json({
          success: true,
          message: "review updated",
          state: result.rows,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        err: err.message,
      });
    });
};
const getREviewsByOrder = (req, res) => {
  const order_id = req.params.order_id;
  pool
    .query(`SELECT * FROM reviews WHERE order_id = ${order_id}`)
    .then((result) => {
      res.status(200).json({
        success: true,
        mesasge: `get Reviews from order id =${order_id}`,
        Reviews: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        err: err.message,
      });
    });
};
const getREviewsByuser = (req, res) => {
  const userId = req.token.userId;
  pool
    .query(`SELECT * FROM reviews WHERE receiver_user_id = ${userId}`)
    .then((result) => {
      res.status(200).json({
        success: true,
        mesasge: `get Reviews`,
        Reviews: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        err: err.message,
      });
    });
};
const getREviewsByIduser = (req, res) => {
  const userId = req.params.userId;
  pool
    .query(`SELECT * FROM reviews WHERE receiver_user_id = ${userId}`)
    .then((result) => {
      res.status(200).json({
        success: true,
        mesasge: `get Reviews`,
        Reviews: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        err: err.message,
      });
    });
};
module.exports = {
  createNewReviews,
  updatestateById,
  getREviewsByOrder,
  getREviewsByuser,
  getREviewsByIduser
};
