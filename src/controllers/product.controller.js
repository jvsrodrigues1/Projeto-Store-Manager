const productService = require('../services/product.services');
const errorMap = require('../utilities/errorMap');

const getProducts = async (_req, res) => {
  const { type, message } = await productService.getProducts();

  if (type) return res.status(type).json(message);

  return res.status(200).json(message);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productService.getProductsById(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(200).json(message);
};

const insertProduct = async (req, res) => {
  const product = req.body;
  const { type, message } = await productService.insertProduct([product]);

  if (type) return res.status(type).json({ message });

  res.status(201).json(message[message.length - 1]);
};

const updateById = async (req, res) => {
  const product = req.body;
  const { id } = req.params;
  const { type, message } = await productService.updateById(id, product);

  if (type) return res.status(type).json({ message });

  res.status(200).json({ id, name: product.name });
};

const remove = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productService.remove(id);
  if (type) return res.status(type).json({ message });

  res.status(204).json({ message });
};

const search = async () => {
  console.log('search');
};

module.exports = {
  getProducts,
  getProductById,
  insertProduct,
  updateById,
  remove,
  search,
};