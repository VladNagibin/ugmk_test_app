const { Router } = require('express');
const productsController = require('../controllers/products.controller');

const router = Router();

router.get('/', productsController.getProducts);
router.get('/details', productsController.getDetails);

module.exports = router;
