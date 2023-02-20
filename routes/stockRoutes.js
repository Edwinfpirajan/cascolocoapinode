const { Router } = require('express');
const { getStock, getStockSchema } = require('../controllers/stockController');
const router = Router();

  
router.get('/', getStock);
router.get('/schema', getStockSchema);

module.exports = router;