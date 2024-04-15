const express = require('express');
const notificationsCtrl = require('./notification.controller');
const ValidateRequest = require('../../middlewares/validate-request.middleware');
const { createNotificationSchema } = require('./notification.validator');
const checkLogin = require('../../middlewares/auth.middleware');
const notificationsRouter = express.Router();

// notificationsRouter.post('/', checkLogin, ValidateRequest(createNotificationSchema), notificationsCtrl.createNotification);
notificationsRouter.get('/', checkLogin, notificationsCtrl.getNotifications);
notificationsRouter.patch('/mark-as-readunread/:id', checkLogin, notificationsCtrl.markNotificationAsReadUnread);
notificationsRouter.patch('/mark-as-read/:id', checkLogin, notificationsCtrl.markNotificationAsRead);
notificationsRouter.delete('/:id', checkLogin, notificationsCtrl.deleteNotification);

module.exports = notificationsRouter;
