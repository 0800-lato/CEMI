const express = require('express');
const path = require ('path');
const app = express();
const port = 3000;

const indexRouter = require("./routes/index.routes.js");
const entrepreneurshipRouter = require('./routes/entrepreneurship.routes');
const userRouter = require("./routes/user.routes.js");

//configuración de los recursos estáticos
app.use(express.static(path.join(__dirname, "..", "public")));

//configuración del motor de plantillas
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/", indexRouter);
app.use("/entrepreneurships", entrepreneurshipRouter);
app.use("/users", userRouter);










app.listen(port, () => 'Servidor corriendo en http://localhost:' + port);
