const ValidateRequest = require('../../middlewares/validate-request.middleware')
const messageCtrl = require('./message.controller')
const { addMessageSchema } = require('./message.validator')

const messageRouter = require('express').Router()


messageRouter.post("/addmsg",ValidateRequest(addMessageSchema),messageCtrl.addMessage)
messageRouter.post("/getmsg",messageCtrl.getAllMessage)

module.exports = messageRouter      