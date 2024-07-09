// Archivo server.js

// Cargar variables de entorno desde el archivo .env
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql2');

// Crear conexión a la base de datos utilizando las variables de entorno
const db = mysql.createConnection({
  host: process.env.DB_HOST,        // Host de la base de datos
  user: process.env.DB_USER,        // Usuario de la base de datos
  password: process.env.DB_PASSWORD, // Contraseña del usuario de la base de datos
  database: process.env.DB_NAME,    // Nombre de la base de datos
  port: process.env.DB_PORT,        // Puerto de la base de datos
});

// Conectar a la base de datos y manejar errores de conexión
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;  // Salir si hay un error de conexión
  }
  console.log('Connected to the MySQL database');  // Mensaje de éxito
});

// Importar las rutas de los diferentes módulos
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const itemRoutes = require('./routes/itemRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

const app = express();  // Crear una instancia de Express
app.use(bodyParser.json());  // Usar body-parser para analizar solicitudes JSON

// Configurar las rutas para los diferentes módulos
app.use('/api/users', userRoutes);        // Rutas para usuarios
app.use('/api/orders', orderRoutes);      // Rutas para órdenes
app.use('/api/items', itemRoutes);        // Rutas para ítems
app.use('/api/categories', categoryRoutes); // Rutas para categorías

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para servir el archivo HTML principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Configurar directorio de vistas estáticas
app.use(express.static(path.join(__dirname, 'views')));

// Configurar el puerto del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);  // Mensaje de éxito cuando el servidor está en funcionamiento
});

// Exportar la conexión de la base de datos para usarla en otros módulos
module.exports = db;