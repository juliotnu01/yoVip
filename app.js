'use strict'

const
	express = require('express'), 
	app = express(),
	api = require('./routes'),
	bodyParser = require('body-parser');

// // middleware
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use('/api', api)

// routes

module.exports = app
