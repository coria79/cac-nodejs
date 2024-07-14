// routes/orderItemRoutes.js

const express = require('express');
const router = express.Router();
const orderItemController = require('../controllers/orderItemController');

// Rutas para operaciones con order_items

// Obtener un ítem de orden específico
router.get('/api/orders/:orderId/items/:itemId', orderItemController.getOrderItemById);

// Actualizar un ítem de orden específico
router.put('/api/orders/:orderId/items/:itemId', orderItemController.updateOrderItem);

// Otros endpoints CRUD según sea necesario

module.exports = router;
