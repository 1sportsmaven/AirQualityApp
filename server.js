var express = require('express');
var bodyParser = require('body-parser');

var app = express();
// var db = require('./models');

//set port for express
app.set('port', process.env.PORT || 8080);

// serve static content for the app from the public directory in the application directory
app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// set handlebars
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// import routes and give the server access to them
var routes = require('./controllers/airquality');
app.use(routes);

//start server and listen for requests
db.sequelize.sync({ force: true }).then(function() {
    app.listen(app.get('port'), () => {
        console.log('Server running on port: ' + app.get('port'));
    });
});