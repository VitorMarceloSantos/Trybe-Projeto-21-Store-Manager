const { itemReq, quantMin } = require('./validations/schemas');
const productModel = require('../../models/product.model');

function validateQuant(quantity) {
  let error = null;
  error = (itemReq.validate(quantity)).error;
    if (error) {
      return { type: 400, message: '"quantity" is required' }; // corrigir o nome do retorno
    }
   error = (quantMin.validate(quantity)).error;
    if (error) {
      return { type: 422, message: '"quantity" must be greater than or equal to 1' }; // corrigir o nome do retorno
    }
}

function validateId(id, quantity) {
  let error = null;
  error = (itemReq.validate(id)).error;
    if (error) { 
      return { type: 400, message: '"productId" is required' }; // corrigir o nome do retorno
    } 
  error = validateQuant(quantity);
  return error;
}

const saleValidation = (sales) => { // recebe um array de objetos
  for (let i = 0; i < sales.length; i += 1) {
    const error = validateId(sales[i].productId, sales[i].quantity);
    if (error) {
      return error;
    }
  }
};

const productIdVerification = async (sales) => {
  const result = await Promise.all(sales
    .map(async ({ productId }) => productModel.findAllId(productId)));
  if (result.find((id) => id === false) !== undefined) { // caso seja undefined é porque todos os id estão corretos
    return false;
  }
  return true;
};

module.exports = { saleValidation, productIdVerification };