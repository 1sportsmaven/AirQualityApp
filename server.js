var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

var app = express();

// usersData is populated in the listener. Used for retrieving details for sending e-mails.
var usersData = [];

// import sendEmails function to send e-mails on air quality to registered users
var sendEmails = require("./controllers/mailer");

// generate e-mails after a set interval. We have arbitraly set this to 60000 milliseconds, which is 1min.
setInterval(function() {
    sendEmails(usersData);
    usersData = populateUsers();
}, 60000)

//set port for express
app.set('port', process.env.PORT || 8080);

// require our models for syncing
var db = require("./models");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());
// serve static content for the app from the public directory in the application directory
app.use(express.static('public'));

// // set handlebars
// var exphbs = require('express-handlebars');
// app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
// app.set('view engine', 'handlebars');

// // import routes and give the server access to them
// var routes = require('./controllers/airquality_controllers');
// app.use(routes);

// import routes and give the server access to them
require('./routes/api-routes.js')(app);
require('./routes/html-routes.js')(app);

//start server and listen for requests
db.sequelize.sync({}).then(function() {

    app.listen(app.get('port'), () => {
        console.log('Server running on port: ' + app.get('port'));

        request('http://localhost:8080/api/users', function(error, response, body) {
            if (error) {
                console.log('error:', error); // Print the error if one occurred
                return;
            }
            usersData = JSON.parse(body);
        });

    });
});


function populateUsers() {
    request('http://localhost:8080/api/users', function(error, response, body) {
        if (error) {
            console.log('error:', error); // Print the error if one occurred
            return;
        }
        usersData = JSON.parse(body);
        return usersData;
    });
}