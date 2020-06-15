const express = require('express');
const cors = require('cors');
const app = express();

// settings
app.set('port', process.env.PORT || 4000);
app.set('dbport', process.env.DBPORT || 27017);

// middlewares
app.use(cors()); // permite enviar y recibir datos
app.use(express.json()); //activa uso de formato json en la app

// routes
app.use('/api/users', require('./routes/users'))
app.use('/api/notes', require('./routes/notes'))
//metodo use hace el llamado a un archivo

module.exports = app;
