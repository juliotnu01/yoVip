'use strict';

const 	mongoose = require('mongoose'),
		app = require('../app'),
		config = require('../config');
// server db
// mongoose.connect(config.db, { useNewUrlParser: true }, (err, res) => {
// 	if (err){
// 		console.log(`error al conectarse a la base de datos: ${err}`)
// 	}
// 	console.log('conexion a la bas ede datos establecida ')


// })
app.listen(config.port, () => {
    console.log(`Listen in the port: ${config.port}`);
});
