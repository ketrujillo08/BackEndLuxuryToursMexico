var express = require("express");
var bodyParser = require("body-parser");
var appRoutes = require('./routes/app');
var mailerRoutes = require("./routes/mail");

var app = express();
//CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    next();
});

//Body Parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//Routes
app.use("/mailer", mailerRoutes);

app.use("/", appRoutes);


app.listen(3000, () => {
    console.log("Iniciando en puerto 3000");
});