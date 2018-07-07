// Make sure we wait to attach our handlers until the DOM is fully loaded
$(function() {
    $("#logout").tooltip({ title: "Logout", delay: { show: 500, hide: 200 } });

    var username = localStorage.getItem("username");

    $.get("/api/users/" + username, function(data) {

        // populate form with user data
        $("#username").val(data.username);
        $("#password").val(data.password);
        $("#passconfirm").val(data.password);
        $("#firstname").val(data.firstname);
        $("#lastname").val(data.lastname);
        $("#city").val(data.city);
        $("#zipcode").val(data.zipcode);
        $("#email").val(data.email);
        $("#welcome").text("Welcome, " + data.firstname + " " + data.lastname);
        if (data.dailyupdates) {
            $("#dailyupdates").val("1");
        } else {
            $("#dailyupdates").val("0");
        }

        // add new elements to the form
        $("#page-title").text("User Profile");
        $("#submit").hide();

        $("#username").prop("readonly", true);

        var btn0 = $("<button>");
        btn0.text("Amend");
        btn0.addClass("newbtns");
        $("#button-area").append(btn0);

        var btn1 = $("<button>");
        btn1.text("Unsubscribe");
        btn1.addClass("newbtns");
        $("#button-area").append(btn1);

        var btn2 = $("<button>");
        btn2.text("Forecast");
        btn2.addClass("newbtns");
        $("#button-area").append(btn2);

        $("#instr").text("Click Amend to change user profile, Click Logout to Sign off, Click Forecast to get air forecast");

    });

    /*
    signin
    */

    $("#loginBtn").on("click", function(event) {
        event.preventDefault();
        username = $("#username").val().trim();
        var login = {
            username: $("#username").val().trim(),
            password: $("#password").val().trim()
        };

        $.ajax("/api/login", {
            type: "POST",
            data: login
        }).then(function(result) {
            console.log(result);
            if (result.noAccount) {
                userMessage("Login Failure", "User Account Not Known");
            } else {
                if (result.correctPass) {
                    // save username to localstorage and load signup html form
                    localStorage.setItem("username", result.username);
                    location = "/signup/";

                } else {
                    userMessage("Login Failure", "Please check your CAPS lock and enter your correct account credentials");
                }
            }

        });

    });


    $("#submit").on("click", function(event) {
        event.preventDefault();

        if ($("#password").val().trim() === $("#passconfirm").val().trim())
            if ($.isNumeric($("#zipcode").val())) {
                username = $("#username").val().trim();
                var newUser = {
                    username: $("#username").val().trim(),
                    password: $("#password").val().trim(),
                    firstname: $("#firstname").val().trim(),
                    lastname: $("#lastname").val().trim(),
                    city: $("#city").val().trim(),
                    zipcode: $("#zipcode").val().trim(),
                    email: $("#email").val().trim(),
                    dailyupdates: $("#dailyupdates").val() == "1" ? true : false
                };

                $.ajax("/api/users", {
                    type: "POST",
                    data: newUser
                }).then(function(result) {
                    if (typeof result.errors !== "undefined") {
                        userMessage("Server error", result.errors[0].message);
                    } else {
                        console.log(result);
                        userMessage("Success", "Your account created successfully");
                        $("#welcome").text("Welcome, " + result.firstname + " " + result.lastname);
                        $("#page-title").text("User Profile");
                        $("#submit").hide();

                        $("#username").prop("readonly", true);

                        var btn0 = $("<button>");
                        btn0.text("Amend");
                        btn0.addClass("newbtns");
                        $("#button-area").append(btn0);

                        var btn1 = $("<button>");
                        btn1.text("Unsubscribe");
                        btn1.addClass("newbtns");
                        $("#button-area").append(btn1);

                        var btn2 = $("<button>");
                        btn2.text("Forecast");
                        btn2.addClass("newbtns");
                        $("#button-area").append(btn2);

                        $("#instr").text("Click Amend to change user profile, Click Logout to Sign off, Click Forecast to get air forecast");
                    }
                });
            } else {
                userMessage("Data Error", "Invalid US postal code");
            }
        else {
            userMessage("Data Error", "Password mismatch. Ensure your password confirmation matches your password entry");
        }
    });


    // amend user profile

    $("body").on("click", ".newbtns", function(event) {

        event.preventDefault();

        switch ($(this).text()) {
            case "Amend":
                {
                    amendUser();
                    break;
                }
            case "Unsubscribe":
                {
                    unsubscribe();
                    break;
                }
            case "Forecast":
                {
                    forecast();
                    break;
                }
        }

    });


    function amendUser() {
        if ($("#password").val().trim() === $("#passconfirm").val().trim())
            if ($.isNumeric($("#zipcode").val())) {

                var newUser = {
                    username: $("#username").val().trim(),
                    password: $("#password").val().trim(),
                    firstname: $("#firstname").val().trim(),
                    lastname: $("#lastname").val().trim(),
                    city: $("#city").val().trim(),
                    zipcode: $("#zipcode").val().trim(),
                    email: $("#email").val().trim(),
                    dailyupdates: $("#dailyupdates").val() == "1" ? true : false
                };

                $.ajax("/api/users", {
                    type: "PUT",
                    data: newUser
                }).then(getUserData);

            } else {
                userMessage("Data Error", "Invalid US postal code");
            }
        else {
            userMessage("Data Error", "Password mismatch. Ensure your password confirmation matches your password entry");
        }
    }


    function unsubscribe() {
        $.ajax("/api/users/" + $("#username").val().trim(), {
            type: "DELETE"
        }).then(signUp);
    }

    var userMessage = (title, text) => {
        var div = $('<div>').html(text).dialog({
            title: title,
            modal: true,
            hide: "puff",
            show: "slide",
            height: "auto",
            width: "auto"
        });
    };

    function getUserData() {
        userMessage("Success", "Your account amended successfully");
        $.get("/api/users/" + username, function(data) {
            $("#welcome").text("Welcome, " + data.firstname + " " + data.lastname);
        });
    }

    function signUp() {
        userMessage("Success", "Your account amended successfully");
        alert("Your account has been deleted");
        location = "/";

    }

    function forecast() {
        // save username to localstorage and load forecast html form
        localStorage.setItem("username", username);
        location = "/forecast";

    }

});