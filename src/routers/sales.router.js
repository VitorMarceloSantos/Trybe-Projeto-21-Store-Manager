const express = require('express');
const salesController = require('../controllers/sales.controller');

const router = express.Router();

// Rotas de Sales

// caso queira utilizar algum midleware utiiza-se antes de chamar o controller.

router.get('/sales', salesController.listSales);
router.get('/sales/:id', salesController.listSalesId);

router.post('/sales', salesController.addSales);

router.put('/sales/:id', salesController.updateSales);

router.delete('/sales/:id', salesController.deleteSales);

module.exports = router;