var express = require('express');
var router = express.Router();
var mongSetup = require('../mongooseSetup');
var seltzers = require("mongoose").model('seltzers');
var user = require("mongoose").model('user');
var purchases = require("mongoose").model('purchases');

var mongoDB = mongSetup.db;

/* GET control page */
router.get('/', function(req, res, next) {
    var loggedin = false;
    var name = 'not logged';
    // Check if user has already logged in
    if (req.session.name) {
        loggedin = true;
        name = req.session.name;
        user.findOne({
            email: req.session.email,
            password: req.session.password
        }).populate({
            path: 'purchases',
            model: 'purchases'
        }).then((someUser) => {
            // Display all transactions
            var isTransactions = true;
            var transactions = someUser.purchases;
            console.log(JSON.stringify(transactions));
            if (transactions.length == 0) {
                isTransactions = false;
            }

            res.render('control.hbs', {
                    title: "Fizz: Seltzer Reimagined",
                    isLoggedIn: loggedin,
                    isControl: true,
                    username: name,
                    isTransactions: isTransactions,
                    transactions: transactions,
            });
            // seltzers.find().then((allSeltzers) => {
            //     console.log(JSON.stringify(allSeltzers));
            //     res.render('control.hbs', {
            //         title: "Fizz: Seltzer Reimagined",
            //         seltzers: allSeltzers,
            //         isLoggedIn: loggedin,
            //         username: name,
            //         cart: userCart,
            //         isCart: isShoppingCart
            //     });
            // }, (err) => {
            //     console.log('Could not get seltzer data from the server');
            //     throw err;
            // });
        });
    } else {
        res.render('control.hbs', {
            title: "Fizz: Seltzer Reimagined",
            isLoggedIn: loggedin,
            isControl: true,
            isTransactions: false,
        });
    }
});

module.exports = router;
