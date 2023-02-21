const { findAllId } = require('../../models/sales.model');

const verifyQuantity = async (sale) => { // array de objetos
  // PromisseAll -> retorna um array com a resolução de todas as promisses
  const promise = await Promise.all(sale
    .map(async ({ productId, _quantity }) => findAllId(productId)));
  // console.log(promise);
  for (let i = 0; i < promise.length; i += 1) {
    if (!promise[i]) {
      return { type: 404, message: 'Product not found' };
    }
  }
  return true; // caso a validação seja verdadeira
};

module.exports = { verifyQuantity };