// controllers/orderItemController.js


// Controlador para manejar operaciones con order_items

// Obtener un ítem de orden específico

const OrderItem = require('../models/orderItemModel');

// Obtener un ítem de orden específico
exports.getOrderItemById = async (req, res, next) => {
  const { orderId, itemId } = req.params;

  try {
    const orderItem = await OrderItem.findById(itemId); // Usa `findById` del modelo `OrderItem` para buscar por itemId
    
    if (!orderItem || orderItem.order_id !== parseInt(orderId)) { // Verifica que el order_id del orderItem coincida con orderId
          
  //  if (!orderItem) {
      return res.status(404).json({ error: `No se encontró el ítem de orden con el id ${itemId}` });
    }
    res.status(200).json(orderItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};






// Actualizar un ítem de orden específico
exports.updateOrderItem = async (req, res, next) => {
  const { orderId, itemId } = req.params;
  const { amount } = req.body;
  console.log("en order item controller");

  try {
    await OrderItem.update(itemId, { order_id: orderId, item_id: itemId, amount });
    res.status(200).json({ message: 'Order item updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Otros métodos CRUD (crear, eliminar, etc.)
