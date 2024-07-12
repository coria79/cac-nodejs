/** 
 * 
 * Este archivo define las rutas relacionadas con la autenticación de usuarios en la aplicación.
 * utilizando Express y el controlador authController.
 * 
 * Utiliza Express para manejar las solicitudes HTTP POST para iniciar sesión y registrar usuarios.
 * 
 * Importa la conexión de la base de datos desde '../dbConfig.js' para interactuar con la base de datos MySQL.
 * 
 * La ruta POST '/auth/login' permite a los usuarios iniciar sesión verificando las credenciales en la base de datos.
 * - Se espera recibir un objeto JSON con 'username' y 'password'.
 * - Se realiza una consulta a la base de datos para verificar la existencia del usuario y la validez de la contraseña.
 * - Retorna un mensaje JSON indicando el éxito o fallo del inicio de sesión.
 * 
 * La ruta POST '/register' permite registrar nuevos usuarios.
 * - Se espera recibir un objeto JSON con 'username' y 'password'.
 * - Verifica si el usuario ya existe en la base de datos antes de realizar el registro.
 * - Inserta un nuevo usuario en la base de datos y retorna un mensaje JSON indicando el éxito o fallo del registro.
 * 
 * Todas las respuestas se devuelven en formato JSON con el código de estado correspondiente.
 * 
 * Exporta el enrutador para ser utilizado por el servidor principal de la aplicación.
 * 
 */

const express = require('express');
const router = express.Router();
require('dotenv').config();

// Importar la conexión de la base de datos desde dbConfig.js
const db = require('../dbConfig');

// Ruta para manejar el inicio de sesión de usuarios
router.post('/auth/login', (req, res) => {
  const { username, password } = req.body;

  // Consulta SQL para buscar el usuario por nombre de usuario
  const query = 'SELECT * FROM users WHERE username = ?';
  db.query(query, [username], (err, results) => {
    if (err) {
      // Manejar error en caso de falla de la consulta
      return res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
    
    // Verificar si no se encontraron resultados (usuario no existe)
    if (results.length === 0) {
      return res.status(401).json({ success: false, message: 'Username o contraseña incorrectos' });
    }

    // Comparar la contraseña ingresada con la contraseña almacenada en la base de datos
    const user = results[0];
    if (password !== user.password) {
      return res.status(401).json({ success: false, message: 'Username o contraseña incorrectos' });
    }

    // Respuesta exitosa si las credenciales son correctas
    
    res.json({ success: true, message: 'Inicio de sesión exitoso', id: user.id });
  });
});

// Ruta para registrar un nuevo usuario
router.post('/register', (req, res) => {
  const { username, password } = req.body;

  // Consulta SQL para verificar si el usuario ya existe
  const checkUserQuery = 'SELECT * FROM users WHERE username = ?';
  db.query(checkUserQuery, [username], (err, results) => {
    if (err) {
      // Manejar error en caso de falla de la consulta
      return res.status(500).json({ success: false, message: 'Error en el servidor' });
    }

    // Verificar si ya existe un usuario con el mismo nombre de usuario
    if (results.length > 0) {
      return res.status(400).json({ success: false, message: 'El usuario ya existe' });
    }

    // Insertar nuevo usuario en la base de datos
    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.query(query, [username, password], (err, results) => {
      if (err) {
        // Manejar error en caso de falla al insertar el nuevo usuario
        return res.status(500).json({ success: false, message: 'Error en el servidor' });
      }
      // Respuesta exitosa al registrar un nuevo usuario
      res.status(201).json({ success: true, message: 'Usuario registrado con éxito' });
    });
  });
});

// Exporta el módulo para que pueda ser utilizado por ejemplo por server.js
// Exporta el router para que pueda ser utilizado por la aplicación Express
module.exports = router;
