const express = require('express');
const path = require ('path');
const app = express();
const port = 3000;



app.set('view engine','ejs');
app.set('views',path.join(__dirname, 'views'));









app.listen(port, () => `Servidor corriendo en http://localhost:${port}`);