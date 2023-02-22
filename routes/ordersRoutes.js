const { Router } = require('express');
const { getOrders, getOrdersSchema } = require('../controllers/ordersController');
const router = Router();

router.get('/', getOrders);
router.get('/schema', getOrdersSchema);

module.exports = router;