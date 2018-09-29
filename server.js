const express = require('express');
const mongoose = require('mongoose');
const hbs = require("express-handlebars");
var path = require('path');




mongoose.Promise = global.Promise;
var mongoURL = "mongodb://heroku_3jf8k8hh:k3sdvg06ef04b0gmjfqotelgbr@ds133622.mlab.com:33622/heroku_3jf8k8hh";
mongoose.connect(mongoURL);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));

var seltzers = mongoose.model('seltzers', {
    seltzer: {
        type: String,
        required: true
    },
    seltzerID: {
        type: Number,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});



var routes = require('./routes/index');
var app = express();


app.engine( 'hbs', hbs( {
    helpers: {
        getUsername: function(){
            return 'Log in ya bum';
        }

    },
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/'
} ) );

app.set('view engine', 'hbs');

app.use((req, res, next) =>{
    // check to see users cookies so we can steal their data or check if theyre logged in
   next();
});

//app.use(express.static(path.join(__dirname,'public')));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
// app.get('/', (req, res)=>{
//     res.send('index.html');
// });

// app.get('/', (req, res)=>{
//     seltzers.find().then((allSeltzers) => {
//         console.log(JSON.stringify(allSeltzers));
//         res.render('index.hbs', {
//             title: "Fizz: Seltzer Reimagined",
//             seltzers: allSeltzers
//         });
//     }, (err) => {
//         console.log('Could not get meal data from the server');
//         throw err;
//     });
//
// });



// app.get('/', (req, res)=>{
//     res.send({
//         name: "Kamil",
//         like: [
//             'Biking',
//             'Cities'
//         ]
//     });
// });

app.listen(8080, ()=>{
    console.log('Server is listening on port 8080');
});




// var randomSeltzer = new seltzers({
//     seltzer: "Polar Seltzer Variety Pack",
//     seltzerID: 1,
//     quantity: 20,
//     size: "12 fl oz",
//     brand: "Polar",
//     price: 7.99
// });
//
// randomSeltzer.save().then((doc) => {
//     console.log(doc);
// }, (e) => {
//     console.log("There was an error: ", e);
//     throw e
// });

