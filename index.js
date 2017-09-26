const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('express-flash');


const model = require("./models");
const models = model(process.env.MONGO_DB_URL ||"mongodb://localhost:27017/regNum");
// console.log(models);
const regRoutes = require('./registration');
const regRoute = regRoutes(models);


var app = express();

app.use(express.static('public'));
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));
// parse application/json
app.use(bodyParser.json());


// app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

app.use(flash());

app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: 'hbs'
}));

app.set('view engine', 'hbs');
// creating a route
app.get('/', function(req, res) {
    res.render("regNum");
});

 app.post('/', function(req,res) {
 regRoute.addFun(req, res);
});
app.post('/reg_Numbers', regRoute.filterData);


//start the server
var server = app.listen(process.env.PORT || 3001, function() {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);

});
