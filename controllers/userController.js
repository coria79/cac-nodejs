// userController.js

// Importa el modelo User para interactuar con la base de datos de usuarios
const User = require('../models/userModel');

// Función para obtener todos los usuarios
exports.getAllUsers = (req, res) => {
  User.findAll((err, users) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(users);
  });
};

// Función para crear un nuevo usuario
exports.createUser = (req, res) => {
  const newUser = { username: req.body.username, password: req.body.password }; // Obtiene los datos del nuevo usuario desde la solicitud
  User.create(newUser, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(result);
  });
};

// Función para actualizar un usuario existente
exports.updateUser = (req, res) => {
  const updatedUser = { username: req.body.username, password: req.body.password }; // Obtiene los datos actualizados del usuario desde la solicitud
  User.update(req.params.id, updatedUser, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(result);
  });
};

// Función para eliminar un usuario existente
exports.deleteUser = (req, res) => {
  User.delete(req.params.id, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(result);
  });
};

// Función para obtener un usuario por su ID
exports.getUserById = (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.json(user);
  });
};
