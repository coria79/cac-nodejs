// Archivo itemController.js
// El controlador itemController.js maneja las funciones CRUD para los ítems.

// Importa el modelo Item para interactuar con la base de datos de ítems
const Item = require('../models/itemModel');

// Función para obtener todos los ítems
exports.getAllItems = (req, res) => {
  // Llama al método findAll del modelo Item para obtener todos los ítems
  Item.findAll((err, result) => {
    if (err) throw err; // Maneja errores durante la consulta a la base de datos
    res.json(result); // Devuelve todos los ítems en formato JSON
  });
};

// Función para crear un nuevo ítem
exports.createItem = (req, res) => {
  const newItem = {
    
    name: req.body.name,
    price: req.body.price,
    amount: req.body.amount,
    is_available: req.body.is_available,
    image: req.body.image,
    category_id: req.body.category_id

  }; // Obtiene los datos del nuevo ítem desde la solicitud
  // Llama al método create del modelo Item para insertar un nuevo ítem en la base de datos
  Item.create(newItem, (err, result) => {
    if (err) throw err; // Maneja errores durante la inserción en la base de datos
    res.json(result); // Devuelve el resultado de la inserción en formato JSON
  });
};

// Función para actualizar un ítem existente
exports.updateItem = (req, res) => {
  const updatedItem = {

    name: req.body.name,
    price: req.body.price,
    amount: req.body.amount,
    is_available: req.body.is_available,
    image: req.body.image,
    category_id: req.body.category_id

  }; // Obtiene los nuevos datos del ítem desde la solicitud
  // Llama al método update del modelo Item para actualizar el ítem con el ID especificado
  Item.update(req.params.id, updatedItem, (err, result) => {
    if (err) throw err; // Maneja errores durante la actualización en la base de datos
    res.json(result); // Devuelve el resultado de la actualización en formato JSON
  });
};

// Función para eliminar un ítem existente
exports.deleteItem = (req, res) => {
  // Llama al método delete del modelo Item para eliminar el ítem con el ID especificado
  Item.delete(req.params.id, (err, result) => {
    if (err) throw err; // Maneja errores durante la eliminación en la base de datos
    res.json(result); // Devuelve el resultado de la eliminación en formato JSON
  });
};

// Función para obtener un ítem por su ID
exports.getItemById = (req, res) => {
  // Llama al método findById del modelo Item para obtener el ítem con el ID especificado
  Item.findById(req.params.id, (err, result) => {
    if (err) throw err; // Maneja errores durante la consulta a la base de datos
    res.json(result); // Devuelve el ítem encontrado en formato JSON
  });
};
