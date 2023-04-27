const pool = require('../models/db')

const updateRoleByUserId = (req,res) => {
    const id = req.params.id
    const {role_id} = req.body
    const data=[role_id||null,id]
    const query=`UPDATE users SET role_id = COALESCE($1,role_id) WHERE id = $2 RETURNING *;`
    
    pool
    .query(query,data)
    .then((result)=>{
        res.status(200).json({
            success: true,
            mesasge:`role_id updated by user_id ${id}`,
            Role: result.rows[0].role_id
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


module.exports={updateRoleByUserId} 