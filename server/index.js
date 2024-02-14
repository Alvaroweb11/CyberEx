const express = require('express');
const authRouter = require('./routes/auth');

const { dbConnection } = require('./database/config');
require('dotenv').config();
const cors = require('cors');

// Limpiar consola
console.clear();

// Crear el servidor de express
const app = express();

// Base de datos
dbConnection();

// CORS
app.use(cors({ origin: true }))

// Directorio Público
app.use( express.static('public') );

// Lectura y parseo del body
app.use( express.json() );

// Rutas
app.use('/auth', authRouter);

// Escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
});