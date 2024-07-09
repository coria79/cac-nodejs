// Archivo userRoutes.js
// Este archivo define las rutas relacionadas con los usuarios utilizando Express y el controlador userController.

const express = require('express'); // Importa Express para definir las rutas
const userController = require('../controllers/userController'); // Importa el controlador userController que maneja las operaciones CRUD de los usuarios
const router = express.Router(); // Crea un objeto Router de Express

// Ruta GET para obtener todos los usuarios (/api/users/)
router.get('/', userController.getAllUsers);

// Ruta POST para crear un nuevo usuario (/api/users/)
router.post('/', userController.createUser);

// Ruta PUT para actualizar un usuario existente por su ID (/api/users/:id)
router.put('/:id', userController.updateUser);

// Ruta DELETE para eliminar un usuario por su ID (/api/users/:id)
router.delete('/:id', userController.deleteUser);

// Ruta GET para obtener un usuario por su ID (/api/users/:id)
router.get('/:id', userController.getUserById);

module.exports = router; // Exporta el router para que pueda ser utilizado por la aplicación Express
