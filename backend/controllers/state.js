const pool = require("../models/db");

const getstate = (req, res) => {
  const order_id = req.params.id;
  pool
    .query(`SELECT state_id FROM orders WHERE id = ${order_id}`)
    .then((result) => {
      if (result.rows.length > 0) {
        res.status(200).json({
          success: true,
          mesasge: "get state from one user",
          state: result,
        });
      } else {
        res.status(404).json({
          success: false,
          mesasge: "Order Not Fond",
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
const updatestateById = (req, res) => {
  const id = req.params.id;
  const { state_id } = req.body;

  const data = [state_id || null, id];

  const query = `UPDATE orders SET state_id = COALESCE($1,state_id) WHERE id = $2 RETURNING *;`;
  pool
    .query(query, data)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "state updated",
        state: result.rows,
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
  getstate,
  updatestateById,
};
