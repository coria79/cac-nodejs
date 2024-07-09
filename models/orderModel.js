// Archivo models/orderModel.js
// El modelo orderModel.js maneja las consultas SQL específicas para las órdenes en la base de datos.

// Importa la conexión de la base de datos
const db = require('./db');

// Define el modelo Order con métodos para interactuar con la tabla orders en la base de datos
const Order = {
  // Método para crear una nueva orden
  create: (order, callback) => {
    const sql = 'INSERT INTO orders SET ?'; // Consulta SQL para insertar una nueva orden
    db.query(sql, order, callback); // Ejecuta la consulta
  },
  // Método para encontrar una orden por su ID
  findById: (id, callback) => {
    const sql = 'SELECT * FROM orders WHERE id = ?'; // Consulta SQL para seleccionar una orden por ID
    db.query(sql, [id], callback); // Ejecuta la consulta
  },
  // Método para obtener todas las órdenes
  findAll: (callback) => {
    const sql = 'SELECT * FROM orders'; // Consulta SQL para seleccionar todas las órdenes
    db.query(sql, callback); // Ejecuta la consulta
  },
  // Método para actualizar una orden por su ID
  update: (id, order, callback) => {
    const sql = 'UPDATE orders SET name = ?, user_id = ?, created_at = ? WHERE id = ?'; // Consulta SQL para actualizar una orden por ID
    db.query(sql, [order.name, order.user_id, order.created_at, id], callback); // Ejecuta la consulta
  },
  // Método para eliminar una orden por su ID
  delete: (id, callback) => {
    const sql = 'DELETE FROM orders WHERE id = ?'; // Consulta SQL para eliminar una orden por ID
    db.query(sql, [id], callback); // Ejecuta la consulta
  }
};

// Exporta el modelo Order para usarlo en otros módulos
module.exports = Order;
