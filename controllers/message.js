'use strict'
const MessageIncoming = require('../models/message')

function saveMessageIncoming(req, res) {
	
	// console.log(req.body);

	let Message = new MessageIncoming()

	Message.mid = req.body.mid
	Message.seq = req.body.seq 
	Message.text = req.body.text

	Message.save((err, MessageStore) => {
		if (err) res.status(500).send({message: `error al almacenar el mensaje ${err}`})
		res.status(200).send({message: MessageStore})

	})
}

module.exports = {
	saveMessageIncoming
}