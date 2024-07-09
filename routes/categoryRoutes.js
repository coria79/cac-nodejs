// Archivo routes/categoryRoutes.js
// Este archivo define las rutas relacionadas con las categorías utilizando Express y el controlador categoryController.

const express = require('express'); // Importa Express para definir las rutas
const categoryController = require('../controllers/categoryController'); // Importa el controlador categoryController que maneja las operaciones CRUD de las categorías
const router = express.Router(); // Crea un objeto Router de Express

// Ruta GET para obtener todas las categorías (/api/categories/)
router.get('/', categoryController.getAllCategories);

// Ruta POST para crear una nueva categoría (/api/categories/)
router.post('/', categoryController.createCategory);

// Ruta PUT para actualizar una categoría existente por su ID (/api/categories/:id)
router.put('/:id', categoryController.updateCategory);

// Ruta DELETE para eliminar una categoría por su ID (/api/categories/:id)
router.delete('/:id', categoryController.deleteCategory);

// Ruta GET para obtener una categoría por su ID (/api/categories/:id)
router.get('/:id', categoryController.getCategoryById);

module.exports = router; // Exporta el router para que pueda ser utilizado por la aplicación Express
