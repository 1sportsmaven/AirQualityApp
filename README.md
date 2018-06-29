## Air Quality App
Air Quality App is a web-based application that allows a users to register to the database. Once users are registered, the application will give users to information related to the current quality of air in their area as well as a seven day forecast. The area is represented by a zipcode. Depending on the selected frequency, users will get an e-mail with current quality of the air and a link that will allow them to login to the website to see more information such as the forecast.


## Technology
An Express server with a number of npm modules have been used in the application. The [AirNow API](https://docs.airnowapi.org/) is used to retreive data on the air quality from [Airnow](https://www.airnow.gov/) which is displayed on the website. An [airnow npm module](https://www.npmjs.com/package/airnow) is used to retrieve information that is then mailed to users via the [Nodemailer npm module](https://www.npmjs.com/package/nodemailer). These two modules represent the backbone of the backend application setup with the AirNow API representing the front end application setup.


## Application
The application can be accessed on [Heroku](https://www.herokuapp.com/)