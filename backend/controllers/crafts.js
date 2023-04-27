const pool = require("../models/db");

const getAllCrafts = (req,res) => {
  const query = `SELECT * FROM crafts `;
  pool
    .query(query)
    .then((result) => {
      res.status(200).json({
        sucsess: true,
        result: result.rows,
        ss:'ss'
      });
    })
    .catch((err) => {
      res.status(200).json({
        sucsess: false,
        err,
      });
    });
};
const updateUserCraft = (req,res) => {
  const id = req.params.userId
  const {craft_id} = req.body

  const data=[craft_id||null]
  
  const query=`UPDATE users SET craft_id = COALESCE($1,craft_id) WHERE id = ${id} RETURNING *;`
  
  pool
  .query(query,data)
  .then((result)=>{
    res.status(200).json({
      success: true,
      message:"craft selected",
      user:result.rows
    })
  })
  .catch((err)=>{
    res.status(500).json({
      success: false,
      message: "Server Error",
      err: err.message
    })
  })
};
module.exports={
    getAllCrafts,
    updateUserCraft
}
