const snakeize = require('snakeize');
const camelize = require('camelize');
const connection = require('./connection');

const findAll = async () => {
  // const search = 'SELECT sp.sale_id, sp.product_id, sp.quantity, s.date FROM StoreManager.sales_products AS sp INNER JOIN StoreManager.sales AS s ON sp.sale_id = s.id ORDER BY sp.sale_id ASC, sp.product_id ASC';
  try {
    const [result] = await connection.execute(
      `SELECT sp.sale_id, sp.product_id, sp.quantity, 
      s.date FROM StoreManager.sales_products AS sp INNER JOIN StoreManager.sales
      AS s ON sp.sale_id = s.id ORDER BY sp.sale_id ASC, sp.product_id ASC`,
  );
    if (!result) return false;
    return camelize(result);
  } catch (err) {
    console.log(`Erro - ${err}`);
  }
};

const findAllId = async (id) => {
  // const search = 'SELECT * FROM StoreManager.sales_products WHERE product_id = ?';
  try {
    const [result] = await connection.execute(`SELECT sp.product_id, sp.quantity, s.date
    FROM StoreManager.sales_products AS sp INNER JOIN StoreManager.sales AS s
    ON sp.sale_id = s.id WHERE sp.sale_id = ?
    ORDER BY sp.sale_id ASC, sp.product_id ASC`, [id]);
    if (result.length === 0) return false;
    return camelize(result);
  } catch (err) {
    console.log(`Erro - ${err}`);
  }
};

// Criar uma venda para pegar o ID
const insertSale = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales (id) values (NULL)',
  );
  return insertId;
};

const addSales = async (newObject) => {
  const columns = Object.keys(snakeize(newObject))
    .map((key) => `${key}`)
    .join(', ');

  const placeholders = Object.keys(newObject)
    .map((_key) => '?')
    .join(', ');

  const insert = `INSERT INTO StoreManager.sales_products (${columns}) VALUE (${placeholders})`;
  try { 
    const [{ insertId }] = await connection.execute(insert,
      [...Object.values(newObject)]);
    return insertId;
  } catch (err) {
    console.log(`Erro - ${err}`);
  }
};

const deleteSales = async (id) => {
  await connection.execute(
    'DELETE FROM StoreManager.sales_products WHERE sale_id = ?',
    [id],
  );
  const [result] = await connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = ?',
    [id],
  );
  // console.log('result', result)
  return result;
};

const updateSales = async (id, sale) => {
  const { productId, quantity } = sale;
  const [result] = await connection.execute(
  'UPDATE StoreManager.sales_products SET quantity = (?) WHERE sale_id = (?) AND product_id = (?)',
  [quantity, id, productId],
  );
  return result;
}; 

module.exports = { findAll, findAllId, addSales, insertSale, deleteSales, updateSales };