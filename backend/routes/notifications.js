const express = require("express");
const authentication=require('../middleware/authentication')
const {createNewNotification,getNotificationById,updateStatusNotifivationById} = require("../controllers/notifications");

const notificationsRouter = express.Router();
notificationsRouter.post('/:order_id',createNewNotification)
notificationsRouter.get('/',authentication,getNotificationById)
notificationsRouter.put('/:notification_id',updateStatusNotifivationById)




module.exports = notificationsRouter;
