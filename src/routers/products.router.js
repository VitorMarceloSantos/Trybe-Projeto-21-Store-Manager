const express = require('express');
const productController = require('../controllers/product.controller');

const router = express.Router();

// Rotas de Products

router.get('/products/search', productController.searchProducts);
router.get('/products', productController.listProducts);
router.get('/products/:id', productController.listProductsId);

router.post('/products', productController.addProducts);

router.put('/products/:id', productController.updateProduct);

router.delete('/products/:id', productController.deleteProduct);

module.exports = router;