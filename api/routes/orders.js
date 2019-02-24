const express = require('express');
const router = express.Router();

const ordersController = require('../controllers/ordersController');
const checkAuth = require('../middleware/check-auth');

router.get('/', checkAuth, ordersController.getAllOrders);
router.post('/', checkAuth, ordersController.createOrder);
router.get('/:orderID', checkAuth, ordersController.getOrder);
router.delete('/:orderID', checkAuth, ordersController.deleteOrder);

module.exports = router;