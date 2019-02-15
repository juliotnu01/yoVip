'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const IncomingMessageSchema = Schema({
	mid: String,
	seq: Number,
	text: String
})

module.exports = mongoose.model('MessageIncoming', IncomingMessageSchema)