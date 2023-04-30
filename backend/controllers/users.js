const pool = require("../models/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const {
    first_name,
    last_name,
    phone_no,
    email,
    password,
    user_image,
    craft_id,
  } = req.body;
  const saltRounds = parseInt(process.env.SALT);

  try {
    const encryptedPassword = await bcrypt.hash(password, saltRounds);
    const query = `INSERT INTO users (first_name, last_name, phone_no, 
       email, password,user_image,role_id,craft_id ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`;
    const VALUES = [
      first_name,
      last_name,
      phone_no,
      email.toLowerCase(),
      encryptedPassword,
      user_image ||
        "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
      2,
      craft_id || null,
    ];

    pool
      .query(query, VALUES)
      .then((result) => {
        res.status(200).json({
          success: true,
          message: "Account created successfully",
        });
      })
      .catch((err) => {
        res.status(409).json({
          success: false,
          message: "server error",
          err: err.message,
        });
      });
  } catch (error) {
    throw Error;
  }
};
const login = (req, res) => {
  const password = req.body.password;
  const email = req.body.email;
  const query = `SELECT * FROM users WHERE email = $1`;
  const data = [email.toLowerCase()];
  pool
    .query(query, data)
    .then((result) => {
      if (result.rows.length) {
        bcrypt.compare(password, result.rows[0].password, (err, response) => {
          if (err) res.json(err);
          if (response) {
            const payload = {
              userId: result.rows[0].id,
              Phone_Number: result.rows[0].phone_no,
              role: result.rows[0].role_id,
              first_name: result.rows[0].first_name,
              last_name: result.rows[0].last_name,
              craft_id: result.rows[0].craft_id,
            };
            const options = { expiresIn: "1d" };
            const secret = process.env.SECRET;
            const token = jwt.sign(payload, secret, options);
            if (token) {
              return res.status(200).json({
                success: true,
                message: `Valid login credentials`,
                token,
                user_image: result.rows[0].user_image,
                userId: result.rows[0].id,
              });
            } else {
              throw Error;
            }
          } else {
            res.status(403).json({
              success: false,
              message: `The email doesn’t exist or the password you’ve entered is incorrect`,
            });
          }
        });
      } else throw Error;
    })
    .catch((err) => {
      res.status(403).json({
        success: false,
        message: "server erro",
        err: err.message,
      });
    });
};
const updateUserById = (req, res) => {
  const id = req.token.userId;
  const { first_name, last_name, phone_no, password, user_image, craft_id } =
    req.body;
  const data = [
    first_name || null,
    last_name || null,
    phone_no || null,
    password || null,
    user_image || null,
    craft_id || null,
  ];
  const query = `UPDATE users SET first_name = COALESCE($1,first_name), last_name = COALESCE($2,last_name), phone_no =COALESCE($3,phone_no), password = COALESCE($4,password),user_image = COALESCE($5,user_image),craft_id = COALESCE($6,craft_id) WHERE id = ${id} RETURNING *;`;
  pool
    .query(query, data)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "user updated",
        user: result.rows,
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
const getInfoUser = (req, res) => {
  const id = req.token.userId;
  const query = `SELECT * FROM users WHERE id = ${id}`;
  pool
    .query(query)
    .then((result) => {
      res.status(200).json({
        success: true,
        mesasge: "get user",
        user: result.rows,
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
const getInfoUserById = (req, res) => {
  const id = req.body.userId;
  const query = `SELECT * FROM users WHERE id = ${id}`;
  pool
    .query(query)
    .then((result) => {
      res.status(200).json({
        success: true,
        mesasge: "get user",
        user: result.rows,
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
  register,
  updateUserById,
  login,
  getInfoUser,
  getInfoUserById,
};
