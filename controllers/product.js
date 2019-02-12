'use strict'
const Product = require('../models/users')

function getProduct(req, res) {
	let productId = req.params.productId

	Product.findById(productId, (err, product) => {
		if(err) return res.status(500).send({menssage:`Error al realizar la peticion: ${err}`})
		if(!product) return res.status(404).send({menssage: `el producto no exite`})
		res.status(200).send({product})		
	})
}

function getProducts(req, res) {
	let productId = req.params.productId

	Product.find({}, (err, product) => {
		if(err) return res.status(500).send({menssage:`Error al realizar la peticion: ${err}`})

		if(!product) return res.status(404).send({menssage: `el producto no exite`})

		res.status(200).send({product})		
	})
}

function saveProduct(req, res) {

	let product = new Product()
	product.name = req.body.name
	product.picture = req.body.picture
	product.price = req.body.price
	product.category = req.body.category
	product.description = req.body.description

	product.save((err, ProductStore) => {
		if (err) res.status(500).send({menssage: `error al almacenar en la base de datos: ${err}`})

		res.status(200).send({product: ProductStore})

	})
}

function updateProduct(req, res) {
	let productId = req.params.productId
	let update = req.body

	Product.findByIdAndUpdate(productId, update, (err, productUpdated) => {
		if (err) return res.status(500).send({menssage: `error al actualizar el producto. ${err}`})
		res.status(200).send({productUpdated})
	})
}

function deleteProduct(req, res) {
	let productId = req.params.productId

	Product.findById(productId, (err, product) => {
		if(err) return res.status(500).send({menssage:`Error al borrar el producto: ${err}`})
		if(!product) return res.status(404).send({menssage: `el producto no exite`})
		Product.remove(err => {
			if(err) return res.status(500).send({menssage:`Error al borrar el producto: ${err}`})
			res.status(200).send({menssage: `el producto ha sido eliminado`})	
		})
	})
}
module.exports = {
	getProduct,
	getProducts,
	saveProduct,
	updateProduct,
	deleteProduct
}