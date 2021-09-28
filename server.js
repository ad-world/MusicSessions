// server.js

'use strict';

var express = require('express');
var app = express();
var mongoose = require('mongoose');
var hbs = require('express-handlebars');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// var MongoStore = require('connect-mongo')(session);

var main = require('./server/routes/main/main');

var port = process.env.PORT || 3000;

app.engine('hbs', hbs({ defaultLayout: 'layout', extname: '.hbs' }));
app.set('view engine', 'hbs');

app.use('/', main);


app.listen(port);
console.log('listening on port ' + port);
