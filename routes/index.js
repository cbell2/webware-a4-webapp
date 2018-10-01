var express = require('express');
var router = express.Router();
var mongSetup = require('../mongooseSetup');
var seltzers = require("mongoose").model('seltzers');
var user = require("mongoose").model('user');
var purchases = require("mongoose").model('purchases');

var mongoDB = mongSetup.db;

/* GET home page. */
router.get('/', function(req, res, next) {
    var loggedin = false;
    var name = 'not logged';
    if(req.session.name) {
        loggedin = true;
        name = req.session.name
    }
    seltzers.find().then((allSeltzers) => {
        console.log(JSON.stringify(allSeltzers));
        res.render('index.hbs', {
            title: "Fizz: Seltzer Reimagined",
            seltzers: allSeltzers,
            isLoggedIn: loggedin,
            username: name
        });
    }, (err) => {
        console.log('Could not get meal data from the server');
        throw err;
    });

    router.get('/logout', function(){
        req.session.destroy(function(err){
            if (err){
                console.log(err);
            }
            else {
                res.redirect('/');
            }
        })
    });

// router.post('/submit', function (req, res, next) {
//
// })

    router.post('/signup', function(req, res, next){
        console.log("called");
        req.session.name= req.body.name;
       var newUser= new user({
           name: req.body.name,
           email: req.body.email,
           password: req.body.password,
       });

       newUser.save().then((doc)=>{
       console.log(doc);
       res.end();
    }, (e) => {
        console.log("There was an error: ", e);
        throw e;
});

       console.log(req.session.name)
    });
});

module.exports = router;