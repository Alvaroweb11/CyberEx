const express = require('express');
const authRouter = require('./routes/auth');

const { dbConnection } = require('./database/config');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const fileupload = require('express-fileupload');
const { uploadFiles, getFiles, getOwnFiles, deleteFiles, downloadFiles, getAdminFiles, deleteAdminFiles, downloadAdminFiles, approveAdminFiles, uploadAvatars, getAvatars } = require('./upload/config');

// Limpiar consola
console.clear();

// Crear el servidor de express
const app = express();

// CORS
app.use(cors({ origin: true }))

// Base de datos
dbConnection();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Carga de archivos
app.use(fileupload({ createParentPath: true }));
app.post('/uploadFiles', uploadFiles);
app.get('/getFiles', getFiles);
app.post('/getOwnFiles', getOwnFiles);
app.post('/deleteFiles', deleteFiles);
app.post('/downloadFiles', downloadFiles);
app.get('/getAdminFiles', getAdminFiles);
app.post('/deleteAdminFiles', deleteAdminFiles);
app.post('/downloadAdminFiles', downloadAdminFiles);
app.post('/approveAdminFiles', approveAdminFiles);
app.post('/uploadAvatars', uploadAvatars);
app.post('/getAvatars', getAvatars);

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