// Archivo authController.js
// El controlador authController.js maneja las funciones relacionadas con la autenticación de usuarios.

// Importa el modelo User para interactuar con la base de datos de usuarios
const User = require('../models/userModel');

// Función para realizar el inicio de sesión de un usuario
exports.login = (req, res) => {
  const { username, password } = req.body; // Obtiene el nombre de usuario y contraseña desde la solicitud

  // Busca un usuario por su nombre de usuario en la base de datos
  User.findByUsername(username, (err, result) => {
    if (err) throw err; // Maneja errores durante la consulta a la base de datos

    if (result.length === 0) return res.status(400).send('User not found'); // Si no se encuentra el usuario, devuelve un mensaje de error

    const user = result[0]; // Obtiene el primer resultado (debería ser único según el nombre de usuario)
    if (user.password !== password) {
      // Compara la contraseña ingresada con la contraseña almacenada en la base de datos
      return res.status(400).send('Invalid password'); // Si las contraseñas no coinciden, devuelve un mensaje de error
    }

    res.status(200).send('Login successful'); // Si las credenciales son correctas, devuelve un mensaje de éxito

  });
};
