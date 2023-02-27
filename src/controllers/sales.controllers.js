const salesService = require('../services/sales.services');
const errorMap = require('../utilities/errorMap');

const getSales = async (_req, res) => {
  const { type, message } = await salesService.getSales();

  if (type) return res.status(type).json(message);

  return res.status(200).json(message);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.getSalesById(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(200).json(message);
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
  getSaleById,
  insertSale,
  updateById,
  remove,
};