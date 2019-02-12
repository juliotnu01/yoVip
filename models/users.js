'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProducSchema = Schema({
	name: String, 
	picture: String, 
	price: {type: Number, default: 0},
	category: {type: String, enum: ['computers', 'phone', 'accesories']},
	description: String


});

module.exports = mongoose.model('Product', ProducSchema)