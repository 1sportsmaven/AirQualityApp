// load sensitive environmental data from .env file
require('dotenv').config();

var airnow = require('airnow');
var moment = require('moment');
var path = require('path');

// Use at least Nodemailer v4.1.0
var nodemailer = require('nodemailer');

var api = process.env.NowAirAPI_KEY;

var client = airnow({ apiKey: api });

function sendEmails(users) {
    var distance = 100;

    for (var x = 0; x < users.length; x++) {
        // build my options
        var options = {
            zipCode: users[x].zipCode,
            distance: distance,
            format: "application/json"
        };

        var firstname = users[x].firstname;
        var lastname = users[x].lastname;
        var email = users[x].email;

        // get the current observations by zip
        client.getObservationsByZipCode(options, function(err, observations) {
            if (err) {
                console.log('derp! an error calling getObservationsByZipCode: ' + err);
                return;
            } else {
                // the world is good! start processing the observations
                generateMail(observations, firstname, lastname, email);
            }
        });
    }

}

function generateMail(airnow, firstN, lastN, email) {

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'airnowapp2@gmail.com',
            pass: 'Shanghai#123'
        }
    });

    var to = "'" + firstN + " " + lastN + " <" + email + ">'";
    var from = "Team Shanghai Airnow <airnowapp2@gmail.com>";

    var subject = "Air Quality As At " + moment().format("MM/DD/YYYY HH:mm");
    var html = "<img src='cid:unique1@nodemailer.com' height='60' width='700'/>";
    html += "<hr><h1>" + subject + "</h2>";
    var img = "<img src=" + path.join(__dirname, 'public/assets/img/Airqualitylegend.jpg') + " height='500' width='700'>";

    for (var x = 0; x < airnow.length; x++) {
        html += "<hr><h2>Date Observed: " + airnow[x].DateObserved + "</h2>";
        html += "<p>Hour observed: " + airnow[x].HourObserved + "</p>";
        html += "<p>Local Time Zone: " + airnow[x].LocalTimeZone + "</p>";
        html += "<p>Reporting Area: " + airnow[x].ReportingArea + "</p>";
        html += "<p>State Code: " + airnow[x].StateCode + "</p>";
        html += "<p>Parameter Name: " + airnow[x].ParameterName + "</p>";
        html += "<p>Air Quality Index: " + airnow[x].AQI + "</p>";
        html += "<p>Category Number: " + airnow[x].Category.Number + "</p>";
        html += "<p>Category Name: " + airnow[x].Category.Name + "</p>";
        html += "<br>";
    }
    html += "<hr><img src='cid:unique@nodemailer.com'/>";
    html += "<br><br><p>Click <a href='http://localhost:8080/'>here</a> to access your account and see more details on the forecast.</p>";
    html += "<br><br><hr><br><h2 style='text-decoration: underline'>Airnow App</h2>";
    html += "<h2>Team Shanghai</h2>";

    // Message object
    var message = {
        from: from,
        to: to,
        subject: subject,
        html: html,
        attachments: [{
                filename: 'Airqualitylegend.jpg',
                path: process.cwd() + '\\public\\assets\\img\\Airqualitylegend.jpg',
                cid: 'unique@nodemailer.com'
            },
            {
                filename: 'clean_air_innovation.jpg',
                path: process.cwd() + '\\public\\assets\\img\\clean_air_innovation.jpg',
                cid: 'unique1@nodemailer.com'
            }
        ]
    };

    transporter.sendMail(message, (err, info) => {
        if (err) {
            console.log('Error occurred. ' + err.message);
            return process.exit(1);
        }

        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });

}


module.exports = sendEmails;