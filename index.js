
let express = require('express');
let config = require('./config/config.json');
let app = express();

let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//################################ DB CONNECTION #############################################
let mongoose = require('mongoose');
mongoose.connect(config.mongoUrl+'crybilla', { useNewUrlParser: true});
var db = mongoose.connection;
if(!db)
    console.log("Error connecting db");
else
    console.log("Db connected successfully");

//############################## TEST API #####################################################
app.get('/', (req, res, next) => {
    res.send('Hello World with Express')
});
//################################ ROUTES #####################################################

let cartRoutes= require("./router/cart");
let productRoutes= require("./router/product");
let rulesRoutes= require("./router/rules");


app.use('/cart', cartRoutes);
app.use('/product', productRoutes);
app.use('/rules', rulesRoutes);

//################################ SERVER LISTINING ON PORT ####################################

var port = process.env.PORT || config.port;
app.listen(port, function () {
    console.log("server running on port " + port);
});