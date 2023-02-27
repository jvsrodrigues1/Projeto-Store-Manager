const salesModel = require('../models/sales.models');

const getSales = async () => {
  const allSales = await salesModel.getAll();
  return { type: null, message: allSales };
};

const getSalesById = async (saleId) => {
  const sale = await salesModel.getById(saleId);
  if (sale.length !== 0) return { type: null, message: sale };
  return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
};

const insertSale = async () => {
  console.log('insert');
};
const updateById = async () => {
  console.log('update');
};
const remove = async () => {
  console.log('remove');
};

module.exports = {
  getSales,
  getSalesById,
  insertSale,
  updateById,
  remove,
};