var express = require('express');
var router = express.Router();
var seltzers = require("mongoose").model('seltzers');


/* GET home page. */
router.get('/', function(req, res, next) {
    seltzers.find().then((allSeltzers) => {
        console.log(JSON.stringify(allSeltzers));
        res.render('index.hbs', {
            title: "Fizz: Seltzer Reimagined",
            seltzers: allSeltzers
        });
    }, (err) => {
        console.log('Could not get meal data from the server');
        throw err;
    });
});

module.exports = router;