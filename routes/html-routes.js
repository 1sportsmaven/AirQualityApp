// Dependencies
// The path module provides utilities for working with file and directory paths
var path = require('path');

/*
 * Routing for html file rendering
 */
module.exports = (app) => {
    // Below code handles when a user visits a page. It sends relevant files to the browser
    // to allow the user to interact with the server.
    // Dependencies

    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, "../public/html/index.html"));
    });

    app.get('/signup', (req, res) => {
        res.sendFile(path.join(__dirname, "../public/html/signup.html"));
    });

    app.get('/forecast', (req, res) => {
        res.sendFile(path.join(__dirname, "../public/html/forecast.html"));
    });

};