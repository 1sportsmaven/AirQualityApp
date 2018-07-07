var express = require('express');
var router = express.Router();

// render the sign-in page
router.get('/', (req, res) => {
    res.render('index');
});
/* 
// render the sign-up page
router.get('/sign-up', (req, res) => {
    res.render('signup');
});
 */
// render the user profile page
router.get('/profile', (req, res) => {
    res.render('profile');
});

// render the forecast page
router.get('/forecast', (req, res) => {
    res.render('forecast');
});

// export routes for server.js to use
module.exports = router;