// Archivo dbConfig.js

/**
* 
* Este archivo configura la conexión a la base de datos MySQL utilizando variables de entorno.
*
* Se utiliza la librería mysql2 para establecer la conexión. Las variables de entorno necesarias son:
*
* DB_HOST: dirección del host de la base de datos.
* DB_USER: nombre de usuario para acceder a la base de datos.
* DB_PASSWORD: contraseña del usuario de la base de datos.
* DB_NAME: nombre de la base de datos a la que se desea conectar.
* DB_PORT: puerto en el cual se encuentra disponible la base de datos.
*
* Si la conexión es exitosa, se imprime un mensaje de éxito en la consola.
* Si hay algún error durante la conexión, se maneja el error y se imprime en la consola.
* La conexión exportada se puede utilizar en otros módulos para interactuar con la base de datos.
*
*/

const mysql = require('mysql2');
require('dotenv').config();

// Crear conexión a la base de datos utilizando las variables de entorno
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// Conectar a la base de datos y manejar errores de conexión
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;  // Salir si hay un error de conexión
  }
  console.log('Connected to the MySQL database');  // Mensaje de éxito
});

// Exportar la conexión de la base de datos para usarla en otros módulos
module.exports = db;
