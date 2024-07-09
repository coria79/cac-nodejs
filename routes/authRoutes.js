// Archivo authRoutes.js
// Este archivo define las rutas relacionadas con la autenticación de usuarios utilizando Express y el controlador authController.

const express = require('express'); // Importa Express para definir las rutas
const authController = require('../controllers/authController'); // Importa el controlador authController que maneja las operaciones de autenticación
const router = express.Router(); // Crea un objeto Router de Express

// Ruta POST para registrar un nuevo usuario (/register)
router.post('/register', authController.register);

// Ruta POST para iniciar sesión (/login)
router.post('/login', authController.login);

module.exports = router; // Exporta el router para que pueda ser utilizado por la aplicación Express
