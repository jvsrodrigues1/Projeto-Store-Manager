const connection = require('./database/connection');

const getAll = async () => {
  const [result] = await connection.execute(
    'SELECT a.sale_id AS saleId, b.date, a.product_id AS productId, a.quantity' 
    + ' FROM sales_products a INNER JOIN sales b ON a.sale_id = b.id',
  );
  return result;
};

const getById = async (id) => {
  const [result] = await connection.execute(
    'SELECT b.date, a.product_id AS productId, a.quantity'
    + ' FROM sales_products a INNER JOIN sales b ON a.sale_id = b.id WHERE a.sale_id = (?)',
    [id],
  );
  return result;
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
  getAll,
  getById,
  insertSale,
  updateById,
  remove,
};