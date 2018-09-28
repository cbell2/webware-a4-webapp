var http = require('http')
    , fs = require('fs')
    , url = require('url')
    , mongoose = require("mongoose")
    , handlebars = require("handlebars")
    , jquery = require("jquery")
    , port = 8080;

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

var server = http.createServer(function (req, res) {
    var uri = url.parse(req.url);
    if (req.method === 'GET') {
        switch (uri.pathname) {
            case '/':
                sendFile(res, './public/index.html');
                break;
            case '/index.html':
                sendFile(res, './public/index.html');
                break;
            case '/seltzer':
                console.log("meals requested");
                seltzers.find().then((aSeltzer) => {
                    res.writeHead(200, {'content-type': 'text/plain'});
                    console.log(JSON.stringify(aSeltzer));
                    res.end(JSON.stringify(aSeltzer));
                }, (err) => {
                    console.log('Could not get meal data from the server');
                    throw err;
                });
                break;
            default:
                res.end('404 not found')


            // case '/':
            //     sendFile(res, './public/index.html');
            //     break;
            // case '/index.html':
            //     sendFile(res, './public/index.html');
            //     break;
            // case '/styles.css':
            //     sendFile(res, './public/styles.css');
            //     break;
            // case '/background.jpg':
            //     sendFile(res, './public/background.jpg');
            //     break;
            // case '/alec.jpg':
            //     sendFile(res, './public/alec.jpg');
            //     break;
            // case '/anthony.jpg':
            //     sendFile(res, './public/anthony.jpg');
            //     break;
            // case '/daniel.jpg':
            //     sendFile(res, './public/daniel.jpg');
            //     break;
            // case '/matt.jpg':
            //     sendFile(res, './public/matt.jpg');
            //     break;
            // case '/max.jpg':
            //     sendFile(res, './public/max.jpg');
            //     break;
            // case '/brandon.jpg':
            //     sendFile(res, './public/brandon.jpg');
            //     break;
            // case '/joe.jpg':
            //     sendFile(res, './public/joe.jpg');
            //     break;
            // case '/noah.jpg':
            //     sendFile(res, './public/noah.jpg');
            //     break;
            // case '/meal-data':
            //     console.log("meals requested");
            //     mealsWeek.find().then((meals) => {
            //         res.writeHead(200, {'content-type': 'text/plain'});
            //         console.log(JSON.stringify(meals));
            //         res.end(JSON.stringify(meals));
            //     }, (err) => {
            //         console.log('Could not get meal data from the server');
            //         throw err;
            //     });
            //     break;
            // case '/approval-data':
            //     console.log("approvals requested");
            //     approval.find().then((approvals) => {
            //         res.writeHead(200, {'content-type': 'text/plain'});
            //         console.log(JSON.stringify(approvals));
            //         res.end(JSON.stringify(approvals));
            //     }, (err) => {
            //         console.log('Could not get approval data from the server');
            //         throw err;
            //     });
            //     break;
            // case '/request-data':
            //     console.log("requests requested");
            //     request.find().then((requests) => {
            //         res.writeHead(200, {'content-type': 'text/plain'});
            //         console.log(JSON.stringify(requests));
            //         res.end(JSON.stringify(requests));
            //     }, (err) => {
            //         console.log('Could not get approval data from the server');
            //         throw err;
            //     });
            //     break;
            // default:
            //     res.end('404 not found')
        }
    } else if (req.method === 'POST') {
        // let body = '';
        // req.on('data', function (data) {
        //     body += data;
        // });
        // req.on('end', function () {
        //     let toAdd = JSON.parse(body);
        //     let foodReq = new request({
        //         name: toAdd.name,
        //         quantity: toAdd.quantity,
        //         options: toAdd.option,
        //         reqId: Date.now().toString(36)
        //     });
        //     foodReq.save().then((result)=>{
        //         console.log(result);
        //         res.end(JSON.stringify(result));
        //     }, (e)=>{
        //         console.log("Error adding a request to db");
        //         throw e;
        //     })
        // })
    } else if (req.method === 'DELETE') {
        // let body = '';
        // req.on('data', function (data) {
        //     body += data;
        // });
        // req.on('end', function () {
        //     let toDelete = JSON.parse(body);
        //     console.log(toDelete.form);
        //     if (toDelete.form === "meals") {
        //         mealsWeek.deleteOne({mealID: toDelete.id}).then((result) => {
        //             console.log(result);
        //             res.end();
        //         });
        //     }
        //     else if (toDelete.form === "requests") {
        //         request.deleteOne({reqId: toDelete.id}).then((result) => {
        //             console.log(result);
        //             res.end();
        //         }, (e) => {
        //             console.log("Error deleting request: ", e);
        //             throw e;
        //         });
        //     }
        // });
    } else if (req.method === "PUT") {
        // let body = '';
        // req.on('data', function (data) {
        //     body += data;
        // });
        // req.on('end', function () {
        //     let toUpdate = JSON.parse(body);
        //     if (toUpdate.form === 'meals') {
        //         let newMeal = {
        //             text: toUpdate.mealName,
        //             mealId: toUpdate.id
        //         };
        //
        //         mealsWeek.findOneAndUpdate({mealID: toUpdate.id}, newMeal, {
        //             upsert: true,
        //             new: true
        //         }).then((result) => {
        //             console.log(result);
        //             res.end();
        //         })
        //     }
        //
        //     if (toUpdate.form === 'approval') {
        //         if (toUpdate.type === 'up') {
        //             approval.findOneAndUpdate({name: toUpdate.id}, {$inc: {upvotes: 1}}, {
        //                 new: true
        //             }).then((result) => {
        //                 console.log(result);
        //                 res.end(JSON.stringify(result));
        //             })
        //         } else if (toUpdate.type === 'down') {
        //             approval.findOneAndUpdate({name: toUpdate.id}, {$inc: {downvotes: 1}}, {
        //                 new: true
        //             }).then((result) => {
        //                 console.log(result);
        //                 res.end(JSON.stringify(result));
        //             })
        //         }
        //     }
        // });
    }
});

server.listen(process.env.PORT || port);
console.log('listening on 8080')

// subroutines

function sendFile(res, filename) {

    fs.readFile(filename, function (error, content) {
        res.writeHead(200, {'Content-type': 'text/html'})
        res.end(content, 'utf-8')
    })

}
