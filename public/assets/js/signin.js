/*
signin.js
*/
/*
// Make sure we wait to attach our handlers until the DOM is fully loaded
$(function() {
    $("#logout").tooltip({ title: "Logout", delay: { show: 500, hide: 200 } });

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
                    // load signup html form
                    localStorage.setItem("username", result.username);
                    location = "/signup/";

                } else {
                    userMessage("Login Failure", "Please check your CAPS lock and enter your correct account credentials");
                }
            }

        });

    });
});

*/