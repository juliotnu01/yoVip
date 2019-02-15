'use strict'

 const 	express = require('express'),
 		api = express.Router();

// controller
// const Productcontrollers = require('../controllers/product')
const webhookController = require('../controllers/webhook')
const messageIncomingController = require('../controllers/message')


// api.post('/product', Productcontrollers.saveProduct)
// api.get('/product/', Productcontrollers.getProducts)
// api.get('/product/:productId', Productcontrollers.getProduct)
// api.delete('/product/:productId', Productcontrollers.deleteProduct)
// api.put('/product/:productId', Productcontrollers.deleteProduct)


api.get('/webhook', webhookController.getWebhook)
api.post('/webhook', webhookController.postedMessage)
api.get('/webhook', webhookController.handleMessage)
api.post('/message', messageIncomingController.saveMessageIncoming)

module.exports = api
	