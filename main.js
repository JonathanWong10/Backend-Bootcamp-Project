//import
var express = require('express');
var ejs = require('ejs');
var express_session = require('express-session');

const about_routes = require('./routes/about');
const product_routes = require('./routes/product');
const admin_routes = require('./routes/admin');
const authentication_routes = require('./routes/authentication');
const order_routes = require('./routes/order');

const bodyParser = require('body-parser');

var db = require('./db')

//create server
var app = express();

app.use(bodyParser.urlencoded({extended: true}));

//setup static files
static_path = __dirname + '/static';
app.use(express.static(static_path));

//setup template directory
template_path = __dirname + '/templates';
app.set('view engine', 'ejs');
app.set('views', template_path);

//middleware definition
var logger = function(req, res, next){
    console.log(`Received ${req.url} at ${new Date()}`);
    next();
};

//express-session middleware
app.use(express_session({
    secret: '932rche9r@#%*uh2feJBFI)#nlnSN',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 3600000 //seconds
    }
}));

//use middleware
app.use(logger);

//routes
app.use('/', about_routes);
app.use('/product', product_routes);
app.use('/order', order_routes);
app.use('/authentication', authentication_routes);

app.get('', function(req, res){
    res.redirect('/product')
});

//Error Handling
// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).send('Something went wrong!');
//     //enter different error codes
//   });

//start server
var port = 3000;
app.listen(port, '0.0.0.0', function(){
    console.log(`Server is listening on port ${port}`);
});
