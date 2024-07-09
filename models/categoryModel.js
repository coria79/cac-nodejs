// Archivo models/categoryModel.js

// Importa la conexión de la base de datos
const db = require('./db');

// Define el modelo Category con métodos para interactuar con la tabla categories en la base de datos
const Category = {
  // Método para crear una nueva categoría
  create: (category, callback) => {
    const sql = 'INSERT INTO categories SET ?'; // Consulta SQL para insertar una nueva categoría
    db.query(sql, category, callback); // Ejecuta la consulta
  },
  // Método para encontrar una categoría por su ID
  findById: (id, callback) => {
    const sql = 'SELECT * FROM categories WHERE id = ?'; // Consulta SQL para seleccionar una categoría por ID
    db.query(sql, [id], callback); // Ejecuta la consulta
  },
  // Método para obtener todas las categorías
  findAll: (callback) => {
    const sql = 'SELECT * FROM categories'; // Consulta SQL para seleccionar todas las categorías
    db.query(sql, callback); // Ejecuta la consulta
  },
  // Método para actualizar una categoría por su ID
  update: (id, category, callback) => {
    const sql = 'UPDATE categories SET name = ? WHERE id = ?'; // Consulta SQL para actualizar una categoría por ID
    db.query(sql, [category.name, id], callback); // Ejecuta la consulta
  },
  // Método para eliminar una categoría por su ID
  delete: (id, callback) => {
    const sql = 'DELETE FROM categories WHERE id = ?'; // Consulta SQL para eliminar una categoría por ID
    db.query(sql, [id], callback); // Ejecuta la consulta
  }
};

// Exporta el modelo Category para usarlo en otros módulos
module.exports = Category;
