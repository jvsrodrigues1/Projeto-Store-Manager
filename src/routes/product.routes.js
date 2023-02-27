const express = require('express');
const productController = require('../controllers/product.controller');
const validateProduct = require('../middlewares/validateProducts');

const productRouter = express.Router();

productRouter.get('/', productController.getProducts);
productRouter.get('/:id', productController.getProductById);
productRouter.post('/', validateProduct.validateName, productController.insertProduct);
productRouter.put('/:id', validateProduct.validateName, productController.updateById);
productRouter.delete('/:id', productController.remove);

module.exports = productRouter;