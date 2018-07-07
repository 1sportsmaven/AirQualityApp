// Make sure we wait to attach our handlers until the DOM is fully loaded
$(function() {
    $("#logout").tooltip({ title: "Logout", delay: { show: 500, hide: 200 } });

    var username = localStorage.getItem("username");

    $.get("/api/users/" + username, function(data) {

        // populate form with forecast data

        var zipcode = data.zipcode;

        // remove buttons not required
        $("#page-title").text("Air Quality Now");
        $("#amend").hide();
        $("#unsubscribe").hide();
        $("#forecast").hide();

        $("#instr").text("Click User Profile to access your account details");

        $("#welcome").text("Welcome, " + data.firstname + " " + data.lastname);

        console.log(username);
        console.log(zipcode);
        /* 
                var queryURL =
                    "http://www.airnowapi.org/aq/observation/zipCode/current/?format=application/json&zipCode=" +
                    zipcode + "&date=" + today + "&distance=25&API_KEY=" + key;
         */
        $.ajax("/api/forecast", {
                type: "POST",
                data: zipcode
            })
            .then(function(res) {
                console.log(res);
                /* 

                $("#dateobserved").val(res[0].DateObserved);
                $("#hourobserved").val(res[0].HourObserved);
                $("#localtimezone").val(res[0].LocalTimeZone);
                $("#reportingarea").val(res[0].ReportingArea);
                $("#statecode").val(res[0].StateCode);
                $("#parameter").val(res[0].ParameterName);
                $("#airquality").val(res[0].AQI);
                $("#category").val(res[0].Category.Number);
                $("#categoryname").val(res[0].Category.Name);
 */
            });

    });
});