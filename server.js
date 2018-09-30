const express = require('express');
const hbs = require("express-handlebars");
var path = require('path');
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

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

app.listen(8080, ()=>{
    console.log('Server is listening on port 8080');
});





