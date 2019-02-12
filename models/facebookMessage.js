'use strict'

const 	mongoose = require('mongoose'), 
		Schema = mongoose.Schema;

// facebook Menssage Schema
const FsM_Schema = Schema({

	sender: 	{type: String, id: String},
	recipient: 	{type: String, id: String},
	timestamp: 	Number,
	message:{
		type:	String, mid:	String,
		seq:	Number,
		type:	String, text:	String
	}

});


module.exports = mongoose.model('FsMessage', FsM_Schema)