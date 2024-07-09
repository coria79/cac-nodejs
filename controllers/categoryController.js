// Archivo categoryController.js
// El controlador categoryController.js maneja las funciones CRUD para las categorías.

// Importa el modelo Category para interactuar con la base de datos de categorías
const Category = require('../models/categoryModel');

// Función para obtener todas las categorías
exports.getAllCategories = (req, res) => {
  // Llama al método findAll del modelo Category para obtener todas las categorías
  Category.findAll((err, result) => {
    if (err) throw err; // Maneja errores durante la consulta a la base de datos
    res.json(result); // Devuelve todas las categorías en formato JSON
  });
};

// Función para crear una nueva categoría
exports.createCategory = (req, res) => {
  const newCategory = { name: req.body.name }; // Obtiene el nombre de la categoría desde la solicitud
  // Llama al método create del modelo Category para insertar una nueva categoría en la base de datos
  Category.create(newCategory, (err, result) => {
    if (err) throw err; // Maneja errores durante la inserción en la base de datos
    res.json(result); // Devuelve el resultado de la inserción en formato JSON
  });
};

// Función para actualizar una categoría existente
exports.updateCategory = (req, res) => {
  const updatedCategory = { name: req.body.name }; // Obtiene el nuevo nombre de la categoría desde la solicitud
  // Llama al método update del modelo Category para actualizar la categoría con el ID especificado
  Category.update(req.params.id, updatedCategory, (err, result) => {
    if (err) throw err; // Maneja errores durante la actualización en la base de datos
    res.json(result); // Devuelve el resultado de la actualización en formato JSON
  });
};

// Función para eliminar una categoría existente
exports.deleteCategory = (req, res) => {
  // Llama al método delete del modelo Category para eliminar la categoría con el ID especificado
  Category.delete(req.params.id, (err, result) => {
    if (err) throw err; // Maneja errores durante la eliminación en la base de datos
    res.json(result); // Devuelve el resultado de la eliminación en formato JSON
  });
};

// Función para obtener una categoría por su ID
exports.getCategoryById = (req, res) => {
  // Llama al método findById del modelo Category para obtener la categoría con el ID especificado
  Category.findById(req.params.id, (err, result) => {
    if (err) throw err; // Maneja errores durante la consulta a la base de datos
    res.json(result); // Devuelve la categoría encontrada en formato JSON
  });
};
