// Archivo orderController.js
// El controlador orderController.js maneja las solicitudes HTTP relacionadas con las órdenes, utilizando el modelo Order para interactuar con la base de datos.

// Importa el modelo Order para interactuar con la base de datos de órdenes
const Order = require('../models/orderModel');

// Función para obtener todas las órdenes
exports.getAllOrders = (req, res) => {
  // Llama al método findAll del modelo Order para obtener todas las órdenes
  Order.findAll((err, result) => {
    if (err) throw err; // Maneja errores durante la consulta a la base de datos
    res.json(result); // Devuelve todas las órdenes en formato JSON
  });
};

// Función para obtener órdenes por ID de usuario
exports.getOrdersByUserId = (req, res) => {
  const userId = req.params.userId;
  // Llama al método getOrdersByUserId del modelo Order para obtener órdenes específicas de un usuario
  Order.getOrdersByUserId(userId, (err, orders) => {
    if (err) {
      console.log(err); // Registra errores en la consola
      res.status(500).json({ error: 'Internal Server Error' }); // Devuelve un error de servidor en caso de error
      return;
    }
    res.json(orders); // Devuelve las órdenes del usuario en formato JSON
  });
};

// Función para crear una nueva orden
exports.createOrder = (req, res) => {
  const newOrder = {
    name: req.body.name,
    user_id: req.body.user_id,
    created_at: req.body.created_at
  }; // Obtiene los datos de la nueva orden desde la solicitud
  // Llama al método create del modelo Order para insertar una nueva orden en la base de datos
  Order.create(newOrder, (err, result) => {
    if (err) throw err; // Maneja errores durante la inserción en la base de datos
    res.json(result); // Devuelve el resultado de la inserción en formato JSON
  });
};

// Función para actualizar una orden existente
exports.updateOrder = (req, res) => {
  const updatedOrder = {
    name: req.body.name,
    user_id: req.body.user_id,
    created_at: req.body.created_at
  }; // Obtiene los nuevos datos de la orden desde la solicitud
  // Llama al método update del modelo Order para actualizar la orden con el ID especificado
  Order.update(req.params.id, updatedOrder, (err, result) => {
    if (err) throw err; // Maneja errores durante la actualización en la base de datos
    res.json(result); // Devuelve el resultado de la actualización en formato JSON
  });
};

// Función para eliminar una orden existente
exports.deleteOrder = (req, res) => {
  // Llama al método delete del modelo Order para eliminar la orden con el ID especificado
  Order.delete(req.params.id, (err, result) => {
    if (err) throw err; // Maneja errores durante la eliminación en la base de datos
    res.json(result); // Devuelve el resultado de la eliminación en formato JSON
  });
};

// Función para obtener una orden por su ID
exports.getOrderById = (req, res) => {
  // Llama al método findById del modelo Order para obtener la orden con el ID especificado
  Order.findById(req.params.id, (err, result) => {
    if (err) throw err; // Maneja errores durante la consulta a la base de datos
    res.json(result); // Devuelve la orden encontrada en formato JSON
  });
};
