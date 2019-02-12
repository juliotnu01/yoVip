'use strict'

const
	express = require('express'), 
	app = express(),
	api = require('./routes'),
	bodyParser = require('body-parser');

// middleware
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// routes
app.use('/api', api)


module.exports = app
