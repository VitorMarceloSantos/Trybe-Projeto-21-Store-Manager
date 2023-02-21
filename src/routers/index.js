const express = require('express');

const router = express.Router();

const productsRouter = require('./products.router');
const salesRouter = require('./sales.router');

// Exportanto as rotas
router.use(productsRouter);
router.use(salesRouter);

module.exports = router;