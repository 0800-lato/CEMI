const express = require('express');
const path = require ('path');
const app = express();
const port = 3000;
const indexRouter = require ('./routes/index.router');
const { log } = require('console');


//configuración de los recursos estáticos
app.use(express.static(path.join(__dirname,'..', 'public')));


//configuración del motor de plantillas
app.set('view engine','ejs');
app.set('views',path.join(__dirname, 'views'));

app.use("/", indexRouter)
app.use("/admin", indexRouter)








app.listen(port, () => 'Servidor corriendo en http://localhost:' + port);
