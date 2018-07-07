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

    app.get('/signup', (req, res) => {
        res.sendFile(path.join(__dirname, "../public/html/signup.html"));
    });


    app.get('/', (req, res) => {
        console.log("index - What the fuck");
        res.sendFile(path.join(__dirname, "../public/html/index.html"));
    });

};