/*EXPRESS/PATH/EJS*/
const express = require("express");
const app = express();
const path = require("path");

//SESSION de USUARIO
const session = require('express-session')
app.use(session({
    secret: 'Mi_secreto',
    //POR LO VISTO ESTAN DEPRECADOS
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000 * 60, // 1 minuto * 60
        secure: true, // true si estás usando HTTPS
        httpOnly: true // La cookie solo se puede acceder a través de HTTP(S)
    }
}));

//COOKIES
// const cookies = require('cookie-parser')
// app.use(cookies())

//VERIFICACION DE CONECCION SEQUELIZE
const checkConnection = require(path.resolve(__dirname, './database/config/checkConnection'));
checkConnection();

/*LLAMADO AL EJS*/
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));

/*STATICS*/
const carpetaPublic = path.resolve(__dirname, "../public");
app.use(express.static(path.join(carpetaPublic)));

/*CAPTURADOR DE INFORMACION*/
/*Capturamos datos de un formulario en forma de objeto*/
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/*MEJORA A LOS VERBOS HTTP: PUT - DELETE*/
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

/*PUERTO*/
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`
    Nuestra app funciona en
    http://localhost:${port}`);
});

//MIDDLEWARES
// const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware')
// app.use(userLoggedMiddleware)

/*ROUTES*/
const rutasAdmin = require(path.resolve(__dirname, "./routes/admin.routes"));
const rutasPreceptor = require(path.resolve(__dirname, "./routes/preceptor.routes"));
const rutasDocente = require(path.resolve(__dirname, "./routes/docente.routes"));
const rutasDirectivo = require(path.resolve(__dirname, "./routes/directivo.routes"));
const rutasIndex = require(path.resolve(__dirname, "./routes/main.routes"));

/*ENTRY POINTS*/
app.use("/admin", rutasAdmin);
app.use("/preceptor", rutasPreceptor);
app.use("/docente", rutasDocente);
app.use("/directivo", rutasDirectivo);
app.use("/", rutasIndex);


/*RESPUESTA AL ERROR 404*/
app.use((req, res, next) => {
    res.status(404).render("404");
});
