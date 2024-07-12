// Archivo orderController.js
// El controlador orderController.js maneja las solicitudes HTTP relacionadas con las órdenes, utilizando los modelos Order y OrderItem para interactuar con la base de datos.

// Importa los modelos Order y OrderItem para interactuar con la base de datos
const Order = require('../models/orderModel');
const OrderItem = require('../models/orderItemModel');

// Función para obtener todas las órdenes
exports.getAllOrders = (req, res) => {
  // Llama al método findAll del modelo Order para obtener todas las órdenes
  Order.findAll((err, orders) => {
    if (err) {
      console.error('Error al obtener todas las órdenes:', err); // Registra errores en la consola
      return res.status(500).json({ error: 'Internal Server Error' }); // Devuelve un error de servidor en caso de error
    }
    res.json(orders); // Devuelve todas las órdenes en formato JSON
  });
};

// Función para obtener órdenes por ID de usuario
exports.getOrdersByUserId = (req, res) => {
  const userId = req.params.userId;
  // Llama al método getOrdersByUserId del modelo Order para obtener órdenes específicas de un usuario
  Order.getOrdersByUserId(userId, (err, orders) => {
    if (err) {
      console.error(`Error al obtener órdenes del usuario ${userId}:`, err); // Registra errores en la consola
      return res.status(500).json({ error: 'Internal Server Error' }); // Devuelve un error de servidor en caso de error
    }
    res.json(orders); // Devuelve las órdenes del usuario en formato JSON
  });
};

// Función para crear una nueva orden
exports.createOrder = (req, res) => {
  const newOrder = {
    amount: req.body.amount,
    user_id: req.body.user_id,
    created_at: req.body.created_at
  }; // Obtiene los datos de la nueva orden desde la solicitud

  // Verifica que req.body.items sea un arreglo
  if (!Array.isArray(req.body.items)) {
    console.error('Error: los items deben ser un arreglo.'); // Registra errores en la consola
    return res.status(400).json({ error: 'Los items deben ser un arreglo' });
  }

  // Llama al método create del modelo Order para insertar una nueva orden en la base de datos
  Order.create(newOrder, req.body.items, (err, result) => {
    if (err) {
      console.error('Error al crear la orden:', err); // Registra errores en la consola
      return res.status(500).json({ error: 'Internal Server Error' }); // Devuelve un error de servidor en caso de error
    }

    const orderId = result.orderId; // Obtiene el ID de la nueva orden creada

    // Envía una respuesta exitosa con el ID de la orden creada
    res.json({ message: 'Orden creada exitosamente', order_id: orderId });
  });
};

// Función para actualizar una orden existente
exports.updateOrder = (req, res) => {
  const updatedOrder = {
    amount: req.body.amount,
    user_id: req.body.user_id,
    created_at: req.body.created_at
  }; // Obtiene los nuevos datos de la orden desde la solicitud

  // Llama al método update del modelo Order para actualizar la orden con el ID especificado
  Order.update(req.params.id, updatedOrder, (err, result) => {
    if (err) {
      console.error(`Error al actualizar la orden ${req.params.id}:`, err); // Registra errores en la consola
      return res.status(500).json({ error: 'Internal Server Error' }); // Devuelve un error de servidor en caso de error
    }

    res.json({ message: 'Orden actualizada exitosamente' }); // Devuelve el resultado de la actualización en formato JSON
  });
};

// Función para eliminar una orden existente
exports.deleteOrder = (req, res) => {
  // Llama al método delete del modelo Order para eliminar la orden con el ID especificado
  Order.delete(req.params.id, (err, result) => {
    if (err) {
      console.error(`Error al eliminar la orden ${req.params.id}:`, err); // Registra errores en la consola
      return res.status(500).json({ error: 'Internal Server Error' }); // Devuelve un error de servidor en caso de error
    }

    // Además, eliminamos todos los items asociados a esta orden en la tabla intermedia orders_items
    OrderItem.deleteByOrderId(req.params.id, (err, result) => {
      if (err) {
        console.error(`Error al eliminar los items de la orden ${req.params.id}:`, err); // Registra errores en la consola
        return res.status(500).json({ error: 'Internal Server Error' }); // Devuelve un error de servidor en caso de error
      }

      res.json({ message: 'Orden eliminada exitosamente' }); // Devuelve el resultado de la eliminación en formato JSON
    });
  });
};

// Función para obtener una orden por su ID
exports.getOrderById = (req, res) => {
  // Llama al método findById del modelo Order para obtener la orden con el ID especificado
  Order.findById(req.params.id, (err, result) => {
    if (err) {
      console.error(`Error al obtener la orden ${req.params.id}:`, err); // Registra errores en la consola
      return res.status(500).json({ error: 'Internal Server Error' }); // Devuelve un error de servidor en caso de error
    }
    res.json(result); // Devuelve la orden encontrada en formato JSON
  });
};
