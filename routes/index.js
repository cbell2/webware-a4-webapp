var express = require('express');
var router = express.Router();
var mongSetup = require('../mongooseSetup');
var seltzers = require("mongoose").model('seltzers');

var mongoDB = mongSetup.db;

/* GET home page. */
router.get('/', function(req, res, next) {
    seltzers.find().then((allSeltzers) => {
        console.log(JSON.stringify(allSeltzers));
        res.render('index.hbs', {
            title: "Fizz: Seltzer Reimagined",
            seltzers: allSeltzers,
            isLoggedIn: false
        });
    }, (err) => {
        console.log('Could not get meal data from the server');
        throw err;
    });

// router.post('/submit', function (req, res, next) {
//
// })

    router.post('/signup', function(req, res, next){
        console.log("called");
       var newUser= {
           name: req.body.fname,
           email: req.body.email,
           password: req.body.password,
           cPassword: req.body.cPassword
       }
       console.log(newUser.email)
    });
});

module.exports = router;