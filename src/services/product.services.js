const productModel = require('../models/product.models');

const getProducts = async () => {
  const allProducts = await productModel.getAll();
  return { type: null, message: allProducts };
};

const getProductsById = async (productId) => {
  const [product] = await productModel.getById(productId);
  if (product) return { type: null, message: product };
  return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
};

const insertProduct = async (products) => {
  await Promise.all(products.map(async (product) => productModel.insertProduct(product)));
  return getProducts();
};

const updateById = async (id, product) => {
  const hasProduct = await productModel.getById(id);
  if (!hasProduct.length) return { type: 404, message: 'Product not found' };

  await productModel.updateById(id, product);
  return { type: null, message: id };
};

const remove = async (id) => {
  const hasProduct = await productModel.getById(id);
  if (!hasProduct.length) return { type: 404, message: 'Product not found' };

  await productModel.remove(id);

  return { type: null, message: 'Operação realizada com sucesso!' };
};
const search = async () => {
  console.log('search');
};

module.exports = {
  getProducts,
  getProductsById,
  insertProduct,
  updateById,
  remove,
  search,
};