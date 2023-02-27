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
