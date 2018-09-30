const mongoose = require('mongoose');

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

module.exports.db = db;
module.exports.seltzers = seltzers;



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
