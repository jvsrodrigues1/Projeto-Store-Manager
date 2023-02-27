const express = require('express');
const salesController = require('../controllers/sales.controllers');

const salesRouter = express.Router();

salesRouter.get('/', salesController.getSales);
salesRouter.get('/:id', salesController.getSaleById);

module.exports = salesRouter;