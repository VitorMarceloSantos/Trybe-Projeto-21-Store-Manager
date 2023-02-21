const productService = require('../services/product.service');
const nameValidation = require('../middlewares/controller/nameValidation');

const listProducts = async (_req, res) => {
  const result = await productService.findAll();
  if (!result) return res.status(404).json({ message: 'Product not found' });
  return res.status(200).json(result.message);
};

const listProductsId = async (req, res) => {
  const { id } = req.params;
  const result = await productService.findAllId(id);
  if (!result) return res.status(404).json({ message: 'Product not found' });
  return res.status(200).json(result.message);
};

const addProducts = async (req, res) => {
  const { name } = req.body;
  // Validação
  const validation = await nameValidation(name);
  if (validation) return res.status(validation.type).json({ message: validation.message });

  // Busca no banco de dados
  const result = await productService.addProducts({ name }); // transformando em objeto
  if (!result) return res.status(500).json({ message: 'Product not created' }); // validando retorno do banco de dados
  return res.status(201).json({ id: result.message, name });
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  // Validação
  const validation = await nameValidation(name);
  if (validation) return res.status(validation.type).json({ message: validation.message });

  // Busca por Id
  const searchId = await productService.findAllId(id);
  if (!searchId) return res.status(404).json({ message: 'Product not found' });

  // Update
  const result = await productService.updateProduct({ name, id });
  if (result) return res.status(200).json({ id, name });
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  // Busca por Id
  const searchId = await productService.findAllId(id);
  if (!searchId) return res.status(404).json({ message: 'Product not found' });

  // Delete
  const result = await productService.deleteProduct(id);
  if (result) return res.status(204).end();
};

const searchProducts = async (req, res) => {
  const { q } = req.query;

  const result = await productService.searchProducts(q);
  return res.status(200).json(result);
};

module.exports = {
  listProducts, listProductsId, addProducts, updateProduct, deleteProduct, searchProducts,
};
// As chaves devem ser utilizadas nas exportações em todos os casos, até quando há apenas um elemento a ser exportado