const connection = require('./db/connection');

const getAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM products',
  );
  return result;
};

const getById = async (id) => {
  const [result] = await connection.execute(
    'SELECT * FROM products WHERE id = (?)',
    [id],
  );
  return result;
};

const insertProduct = async ({ name }) => {
  await connection.execute(
    'INSERT INTO products (name) VALUES (?)',
    [name],
  );
};

const updateById = async (id, { name }) => {
  await connection.execute(
    `UPDATE products SET name = ${`"${name}"`} WHERE id = (?)`,
    [id],
  );
};