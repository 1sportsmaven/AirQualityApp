# Air Quality App


## Application Description
Air Quality App is a web-based application that allows users to register to the database. Once registered, the users will have access to information related to the current quality of air in their area as well as a seven day forecast. The area is represented by a zipcode which the user will input when creating his / her profile. Depending on the selected frequency, users will get e-mails with current quality of the air and a link that will allow them to login to the website to see more information such as the forecast.


## Technology Setup
An Express server with a number of npm modules have been used in the application. The [AirNow API](https://docs.airnowapi.org/) is used to retreive data on the air quality from [Airnow](https://www.airnow.gov/) which is displayed on the website. An [airnow npm module](https://www.npmjs.com/package/airnow) is used to retrieve information that is then mailed to users via the [Nodemailer npm module](https://www.npmjs.com/package/nodemailer). These two modules represent the backbone of the backend application setup with the AirNow API representing the front end application setup.


## Application Depolyment
The application can be accessed on [Heroku](https://www.herokuapp.com/)