'use strict'
const config = require('../config'),
      FsMessage = require('../models/facebookMessage')  

function getWebhook(req, res) {
  	
  	let mode = req.query['hub.mode'],
		token = req.query['hub.verify_token'],
		challenge = req.query['hub.challenge'];

  // Checks if a token and mode is in the query string of the request
  if (mode && token) {

  // Checks the mode and token sent is correct
      if (mode === 'subscribe' && token === config.VERIFY_TOKEN) {

        // Responds with the challenge token from the request
        console.log('WEBHOOK_VERIFIED');
        res.status(200).send(challenge);

      } else {
      // Responds with '403 Forbidden' if verify tokens do not match
        res.sendStatus(403);      
      }
  }
}


function postWebook(req, res) {

  let body = req.body

  if (body.object === 'page') {
    body.entry.forEach(function (entry) {
      
      let webhook_event = entry.messaging[0]
      console.log(webhook_event)

    

      

    })
  }

}




module.exports = {
  getWebhook,
  postWebook
}