// Archivo orderRoutes.js
// Este archivo define las rutas relacionadas con las órdenes utilizando Express y el controlador orderController.

const express = require('express'); // Importa Express para definir las rutas
const orderController = require('../controllers/orderController'); // Importa el controlador orderController que maneja las operaciones CRUD de las órdenes
const router = express.Router(); // Crea un objeto Router de Express

// Ruta GET para obtener todas las órdenes (/api/orders/)
router.get('/', orderController.getAllOrders);

// Ruta POST para crear una nueva orden (/api/orders/)
router.post('/', orderController.createOrder);

// Ruta PUT para actualizar una orden existente por su ID (/api/orders/:id)
router.put('/:id', orderController.updateOrder);

// Ruta DELETE para eliminar una orden por su ID (/api/orders/:id)
router.delete('/:id', orderController.deleteOrder);

// Ruta GET para obtener una orden por su ID (/api/orders/:id)
router.get('/:id', orderController.getOrderById);

module.exports = router; // Exporta el router para que pueda ser utilizado por la aplicación Express
