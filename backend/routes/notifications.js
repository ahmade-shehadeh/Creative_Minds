const express = require("express");
const authentication=require('../middleware/authentication')
const {createNewNotification,getNotificationById,
    updateStatusNotifivationById,
    deleteNotificationById} = require("../controllers/notifications");

const notificationsRouter = express.Router();
notificationsRouter.post('/:order_id',createNewNotification)
notificationsRouter.get('/',authentication,getNotificationById)
notificationsRouter.put('/:notification_id',updateStatusNotifivationById)
notificationsRouter.delete('/:id',deleteNotificationById)




module.exports = notificationsRouter;
