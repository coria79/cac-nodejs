// Archivo itemRoutes.js
// Este archivo define las rutas relacionadas con los ítems utilizando Express y el controlador itemController.

const express = require('express'); // Importa Express para definir las rutas
const itemController = require('../controllers/itemController'); // Importa el controlador itemController que maneja las operaciones CRUD de los ítems
const router = express.Router(); // Crea un objeto Router de Express

// Ruta GET para obtener todos los ítems (/api/items/)
router.get('/', itemController.getAllItems);

// Ruta POST para crear un nuevo ítem (/api/items/)
router.post('/', itemController.createItem);

// Ruta PUT para actualizar un ítem existente por su ID (/api/items/:id)
router.put('/:id', itemController.updateItem);

// Ruta DELETE para eliminar un ítem por su ID (/api/items/:id)
router.delete('/:id', itemController.deleteItem);

// Ruta GET para obtener un ítem por su ID (/api/items/:id)
router.get('/:id', itemController.getItemById);

module.exports = router; // Exporta el router para que pueda ser utilizado por la aplicación Express