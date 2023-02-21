// const camelize = require('camelize');
const snakeize = require('snakeize');
const connection = require('./connection');

const findAll = async () => {
  const search = 'SELECT * FROM StoreManager.products';
  try {
    const [result] = await connection.execute(search);
    if (!result) return false;
    return result;
  } catch (err) {
    console.log(`Erro - ${err}`);
  }
};

const findAllId = async (id) => {
  const search = 'SELECT * FROM StoreManager.products WHERE id = ?';
  try {
    const [[result]] = await connection.execute(search, [id]);
    if (!result) return false;
    return result;
  } catch (err) {
    console.log(`Erro - ${err}`);
  }
};

const addProducts = async (name) => {
  const columns = Object.keys(snakeize(name))
    .map((key) => `${key}`)
    .join(', ');

  const placeholders = Object.keys(name)
    .map((_key) => '?')
    .join(', ');

  const insert = `INSERT INTO StoreManager.products (${columns}) VALUE (${placeholders})`;
  try { 
    const [{ insertId }] = await connection.execute(insert,
      [...Object.values(name)]);
    return insertId;
  } catch (err) {
    console.log(`Erro - ${err}`);
  }
};

const updateProduct = async ({ name, id }) => {
  const [result] = await connection.execute(
    'UPDATE products SET name = ? WHERE id = ?',
    [name, id],
  );
  return result;
};

const deleteProduct = async (id) => {
  const [result] = await connection.execute(
    'DELETE FROM products WHERE id = ?',
    [id],
  );
  return result;
};

const searchProducts = async (q) => {
  const [result] = await connection.execute(
    `SELECT * FROM products WHERE name LIKE "%${q}%"`,
  );
  return result;
};

module.exports = { findAll, findAllId, addProducts, updateProduct, deleteProduct, searchProducts };