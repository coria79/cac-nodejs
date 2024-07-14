// Archivo server.js

/** 
 * Este archivo configura y arranca un servidor Express para una aplicación web.
 * 
 * Utiliza variables de entorno cargadas desde un archivo .env para configurar el puerto del servidor.
 * 
 * Se importa la conexión a la base de datos desde './models/db.js' para interactuar con la base de datos MySQL.
 * 
 * Importa y utiliza diferentes módulos de rutas para gestionar las solicitudes HTTP relacionadas con usuarios, órdenes, ítems, categorías y autenticación.
 * 
 * Además, sirve archivos estáticos desde las carpetas 'public' y configura una ruta para servir un archivo HTML principal.
 * 
 * Escucha en el puerto especificado por la variable de entorno PORT, o por defecto en el puerto 3000.
 * Una vez iniciado, imprime un mensaje en la consola indicando en qué puerto está corriendo el servidor.
 */

// Cargar variables de entorno desde el archivo .env
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Importar la conexión de la base de datos desde db.js
const db = require('./models/db'); // Asegúrate de que la ruta apunte correctamente al archivo db.js

// Importar las rutas de los diferentes módulos
const userRoutes = require('./routes/userRoutes'); // Rutas para usuarios
const orderRoutes = require('./routes/orderRoutes'); // Rutas para órdenes
const itemRoutes = require('./routes/itemRoutes'); // Rutas para ítems
const categoryRoutes = require('./routes/categoryRoutes'); // Rutas para categorías
const authRoutes = require('./routes/authRoutes'); // Rutas para autenticación
const orderItemRoutes = require('./routes/orderItemRoutes'); // Rutas para order_items

const app = express();  // Crear una instancia de Express
app.use(bodyParser.json());  // Usar body-parser para analizar solicitudes JSON

// Rutas para los diferentes módulos
app.use('/api/users', userRoutes); // Rutas para usuarios
app.use('/api/orders', orderRoutes); // Rutas para órdenes
app.use('/api/items', itemRoutes); // Rutas para ítems
app.use('/api/categories', categoryRoutes); // Rutas para categorías
app.use('/api', authRoutes); // Rutas para autenticación
app.use('/api/orders', orderItemRoutes); // Rutas para order_items

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para servir el archivo HTML principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Configurar el puerto del servidor
const PORT = process.env.PORT || 3000;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
