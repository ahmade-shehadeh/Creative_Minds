const express = require("express");
const { getAllCrafts,updateUserCraft } = require("../controllers/crafts");
const authentication=require('../middleware/authentication')

const craftsRouter = express.Router();
craftsRouter.get("/",  getAllCrafts);
craftsRouter.put("/:userId",authentication,updateUserCraft);



module.exports = craftsRouter;
