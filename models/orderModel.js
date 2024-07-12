// Archivo models/orderModel.js
// El modelo orderModel.js maneja las consultas SQL específicas para las órdenes en la base de datos.

// Importa la conexión de la base de datos
const db = require('./db');

// Define el modelo Order con métodos para interactuar con la tabla orders en la base de datos
const Order = {
  // Método para crear una nueva orden con sus ítems asociados
  create: (order, items, callback) => {
    console.log('Items recibidos en create antes del insert:', items); // Verifica los items recibidos aquí
    
    const sql = 'INSERT INTO orders SET ?'; // Consulta SQL para insertar una nueva orden

    db.query(sql, order, (err, result) => {
      if (err) {
        return callback(err);
      }
      
      const orderId = result.insertId;
      
      // Verifica que items sea un arreglo válido
      if (!Array.isArray(items)) {
        return callback(new Error('Los items deben ser un arreglo.'));
      }
      
      // Insertar los items en la tabla intermedia orders_items
      const orderItems = items.map(item => [orderId, item.item_id, item.amount]);
      const sqlItems = 'INSERT INTO orders_items (order_id, item_id, amount) VALUES ?';
      
      db.query(sqlItems, [orderItems], (err, result) => {
        if (err) {
          return callback(err);
        }
        
        callback(null, { orderId, result });
      });
    });
  },

  // Método para encontrar una orden por su ID
  findById: (id, callback) => {
    const sql = 'SELECT * FROM orders WHERE id = ?'; // Consulta SQL para seleccionar una orden por ID
    db.query(sql, [id], (err, orders) => {
      if (err) {
        return callback(err);
      }
      if (orders.length === 0) {
        return callback(null, null); // No se encontró la orden con el ID especificado
      }
      const order = orders[0];
      // Consultar los items de la orden desde la tabla intermedia orders_items
      const sqlItems = 'SELECT * FROM orders_items WHERE order_id = ?';
      db.query(sqlItems, [id], (err, items) => {
        if (err) {
          return callback(err);
        }
        order.items = items;
        callback(null, order);
      });
    });
  },

  // Método para obtener todas las órdenes
  findAll: (callback) => {
    const sql = 'SELECT * FROM orders'; // Consulta SQL para seleccionar todas las órdenes
    db.query(sql, (err, orders) => {
      if (err) {
        return callback(err);
      }
      if (orders.length === 0) {
        return callback(null, []); // No hay órdenes en la base de datos
      }
      // Para cada orden, obtener los items desde la tabla intermedia orders_items
      const ordersWithItems = [];
      let count = 0;
      orders.forEach(order => {
        const sqlItems = 'SELECT * FROM orders_items WHERE order_id = ?';
        db.query(sqlItems, [order.id], (err, items) => {
          if (err) {
            return callback(err);
          }
          order.items = items;
          ordersWithItems.push(order);
          count++;
          if (count === orders.length) {
            callback(null, ordersWithItems);
          }
        });
      });
    });
  },

  // Método para actualizar una orden por su ID
  update: (id, order, callback) => {
    const sql = 'UPDATE orders SET amount = ?, user_id = ?, created_at = ? WHERE id = ?'; // Consulta SQL para actualizar una orden por ID
    db.query(sql, [order.amount, order.user_id, order.created_at, id], callback); // Ejecuta la consulta
  },

  // Método para eliminar una orden por su ID
  delete: (id, callback) => {
    // Antes de eliminar la orden, eliminar todos los items asociados desde la tabla intermedia orders_items
    const sqlDeleteItems = 'DELETE FROM orders_items WHERE order_id = ?';
    db.query(sqlDeleteItems, [id], (err, result) => {
      if (err) {
        return callback(err);
      }
      const sqlDeleteOrder = 'DELETE FROM orders WHERE id = ?'; // Consulta SQL para eliminar una orden por ID
      db.query(sqlDeleteOrder, [id], callback); // Ejecuta la consulta
    });
  }
};

// Exporta el modelo Order para usarlo en otros módulos
module.exports = Order;
