// userModel.js

// Importa la conexión de la base de datos
const db = require('./db');

// Define el modelo User con métodos para interactuar con la tabla users en la base de datos
const User = {
  // Método para crear un nuevo usuario
  create: (user, callback) => {
    const sql = 'INSERT INTO users SET ?'; // Consulta SQL para insertar un nuevo usuario
    db.query(sql, user, callback); // Ejecuta la consulta
  },

  // Método para actualizar un usuario por su ID
  update: (userId, user, callback) => {
    const sql = 'UPDATE users SET username = ?, password = ? WHERE id = ?'; // Consulta SQL para actualizar un usuario por ID
    db.query(sql, [user.username, user.password, userId], callback); // Ejecuta la consulta
  },

  // Método para eliminar un usuario por su ID
  delete: (userId, callback) => {
    const sql = 'DELETE FROM users WHERE id = ?'; // Consulta SQL para eliminar un usuario por ID
    db.query(sql, [userId], callback); // Ejecuta la consulta
  },

  // Método para encontrar un usuario por su ID
  findById: (userId, callback) => {
    const sql = 'SELECT * FROM users WHERE id = ?'; // Consulta SQL para seleccionar un usuario por ID
    db.query(sql, [userId], (err, result) => {
      if (err) {
        callback(err, null);
        return;
      }
      if (result.length) {
        callback(null, result[0]);
      } else {
        callback({ message: 'User not found' }, null);
      }
    });
  },

  // Método para obtener todos los usuarios
  findAll: (callback) => {
    const sql = 'SELECT * FROM users'; // Consulta SQL para seleccionar todos los usuarios
    db.query(sql, callback); // Ejecuta la consulta
  }
};

// Exporta el modelo User para usarlo en otros módulos
module.exports = User;
