// Archivo models/db.js

// Este archivo configura y establece una conexión a la base de datos MySQL 
// utilizando las variables de entorno definidas en el archivo .env.
// Proporciona una conexión de base de datos que puede ser utilizada por otros módulos en la aplicación.

require('dotenv').config(); // Carga las variables de entorno del archivo .env
const mysql = require('mysql2'); // Importa el módulo mysql2 para manejar la conexión a la base de datos

// Crea la conexión a la base de datos utilizando las variables de entorno
const db = mysql.createConnection({
  host: process.env.DB_HOST,     // Dirección del host de la base de datos
  user: process.env.DB_USER,     // Nombre de usuario de la base de datos
  password: process.env.DB_PASSWORD, // Contraseña del usuario de la base de datos
  database: process.env.DB_NAME  // Nombre de la base de datos
});

// Conecta a la base de datos y maneja errores de conexión
db.connect(err => {
  if (err) throw err; // Lanza un error si no se puede conectar a la base de datos
  console.log('Database connected!'); // Imprime un mensaje si la conexión es exitosa
});

module.exports = db; // Exporta la conexión de la base de datos para usarla en otros módulos
