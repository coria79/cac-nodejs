// Archivo models/itemModel.js

// Importa la conexión de la base de datos
const db = require('./db');

// Define el modelo Item con métodos para interactuar con la tabla items en la base de datos
const Item = {
  // Método para crear un nuevo item
  create: (item, callback) => {
    const sql = 'INSERT INTO items SET ?'; // Consulta SQL para insertar un nuevo item
    db.query(sql, item, callback); // Ejecuta la consulta
  },
  // Método para encontrar un item por su ID
  findById: (id, callback) => {
    const sql = 'SELECT * FROM items WHERE id = ?'; // Consulta SQL para seleccionar un item por ID
    db.query(sql, [id], callback); // Ejecuta la consulta
  },
  // Método para obtener todos los items
  findAll: (callback) => {
    const sql = 'SELECT * FROM items'; // Consulta SQL para seleccionar todos los items
    db.query(sql, callback); // Ejecuta la consulta
  },
  // Método para actualizar un item por su ID
  update: (id, item, callback) => {
    const sql = 'UPDATE items SET name = ?, order_id = ?, category_id = ?, is_available = ? WHERE id = ?'; // Consulta SQL para actualizar un item por ID
    db.query(sql, [item.name, item.order_id, item.category_id, item.is_available, id], callback); // Ejecuta la consulta
  },
  // Método para eliminar un item por su ID
  delete: (id, callback) => {
    const sql = 'DELETE FROM items WHERE id = ?'; // Consulta SQL para eliminar un item por ID
    db.query(sql, [id], callback); // Ejecuta la consulta
  }
};

// Exporta el modelo Item para usarlo en otros módulos
module.exports = Item;
