// Archivo models/orderItemModel.js

// Importa la conexión de la base de datos
const db = require('./db');

// Define el modelo OrderItem con métodos para interactuar con la tabla orders_items en la base de datos
const OrderItem = {
  // Método para crear una nueva relación order_item
  create: (orderItem, callback) => {
    const sql = 'INSERT INTO orders_items SET ?'; // Consulta SQL para insertar una nueva relación order_item
    db.query(sql, orderItem, callback); // Ejecuta la consulta
  },

  // Método para encontrar una relación order_item por su ID
  findById: (id, callback) => {
    const sql = 'SELECT * FROM orders_items WHERE id = ?'; // Consulta SQL para seleccionar una relación order_item por ID
    db.query(sql, [id], callback); // Ejecuta la consulta
  },

  // Método para obtener todas las relaciones order_item
  findAll: (callback) => {
    const sql = 'SELECT * FROM orders_items'; // Consulta SQL para seleccionar todas las relaciones order_item
    db.query(sql, callback); // Ejecuta la consulta
  },

  // Método para actualizar una relación order_item por su ID
  update: (id, orderItem, callback) => {
    const sql = 'UPDATE orders_items SET order_id = ?, item_id = ?, amount = ? WHERE id = ?'; // Consulta SQL para actualizar una relación order_item por ID
    db.query(sql, [orderItem.order_id, orderItem.item_id, orderItem.amount, id], callback); // Ejecuta la consulta
  },

  // Método para eliminar una relación order_item por su ID
  delete: (id, callback) => {
    const sql = 'DELETE FROM orders_items WHERE id = ?'; // Consulta SQL para eliminar una relación order_item por ID
    db.query(sql, [id], callback); // Ejecuta la consulta
  },

  // Método para eliminar todas las relaciones order_item asociadas a una orden específica por su ID de orden
  deleteByOrderId: (orderId, callback) => {
    const sql = 'DELETE FROM orders_items WHERE order_id = ?'; // Consulta SQL para eliminar relaciones order_item por ID de orden
    db.query(sql, [orderId], callback); // Ejecuta la consulta
  }
};

// Exporta el modelo OrderItem para usarlo en otros módulos
module.exports = OrderItem;
