const salesService = require('../services/sales.service');
const {
  saleValidation, productIdVerification,
} = require('../middlewares/controller/saleValidation');

const listSales = async (_req, res) => {
  const result = await salesService.findAll();
  if (!result) return res.status(404).json({ message: 'Sale not found' });
  return res.status(200).json(result.message);
};

const listSalesId = async (req, res) => {
  const { id } = req.params;
  const result = await salesService.findAllId(id);
  if (!result) return res.status(404).json({ message: 'Sale not found' });
  return res.status(200).json(result.message);
};

const addSales = async (req, res) => {
  const sale = req.body;

  const validation = saleValidation(sale);
  if (validation) return res.status(validation.type).json({ message: validation.message });

  const result = await salesService.addSales(sale); // passando um array de objetos
  if (result.type === 201) return res.status(result.type).json(result.message);

  return res.status(result.type).json({ message: result.message }); // caso retorne algum erro na validação
};

const deleteSales = async (req, res) => {
  const { id } = req.params;

  const searchId = await salesService.findAllId(id);
  if (!searchId) return res.status(404).json({ message: 'Sale not found' });

  const result = await salesService.deleteSales(id);
  if (result.affectedRows !== 0) return res.status(204).end();
};

const updateSales = async (req, res) => {
  const sale = req.body; // vai receber um array de objetos { quantity, productId }
  const { id } = req.params;

  // Buscando por Id
  const searchId = await salesService.findAllId(id);
  if (!searchId) return res.status(404).json({ message: 'Sale not found' });

  // Validando informações
  const validation = saleValidation(sale);
  if (validation) return res.status(validation.type).json({ message: validation.message });

  // Validando productId
  const productIdValidate = await productIdVerification(sale);
   if (!productIdValidate) return res.status(404).json({ message: 'Product not found' });

  const result = await salesService.updateSales(id, sale); // passando um array de objetos
  if (result) return res.status(200).json(result.message);
};

module.exports = { listSales, addSales, listSalesId, deleteSales, updateSales };