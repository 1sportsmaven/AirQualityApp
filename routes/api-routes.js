// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the database
// *********************************************************************************

// Dependencies
// =============================================================
var Sequelize = require("sequelize");
var Op = Sequelize.Op;

// Requiring our Users model
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {


    // Get route for retrieving a single user
    app.get("/api/users/:username", function(req, res) {
        db.User.findOne({
            where: {
                username: req.params.username
            }
        }).then(function(result) {
            res.json(result);
        });
    });

    // POST route for saving a new user
    app.post("/api/users", function(req, res) {
        console.log(req.body);
        db.User.create({
            username: req.body.username,
            password: req.body.password,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            city: req.body.city,
            zipcode: req.body.zipcode,
            email: req.body.email,
            dailyUpdates: req.body.dailyUpdates
        }).then(function(result) {
            res.json(result);
        });
    });

    // DELETE route for deleting users
    app.delete("/api/users/:username", function(req, res) {
        db.User.destroy({
            where: {
                username: {
                    [Op.eq]: req.params.username
                }
            }
        }).then(function(result) {
            res.json(result);
        });
    });

    // PUT route for updating users
    app.put("/api/users", function(req, res) {
        db.User.update(req.body, {
            where: {
                username: {
                    [Op.eq]: req.body.username
                }
            }
        }).then(function(result) {
            res.json(result);
        });
    });
};