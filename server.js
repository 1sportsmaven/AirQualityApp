var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// import sendEmails function to send e-mails on air quality to registered users
var sendEmails = require("./controllers/mailer");

// generate e-mails after a set interval. We have abitraly set this to 60000 milliseconds, which is 1min.
// setInterval(sendEmails, 60000);  comment as this is working now to avoid api lockout

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

// set handlebars
/* var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
 */
// import routes and give the server access to them
require('./routes/api-routes.js')(app);

//start server and listen for requests
db.sequelize.sync({ force: true }).then(function() {

    app.listen(app.get('port'), () => {
        console.log('Server running on port: ' + app.get('port'));
    });
});