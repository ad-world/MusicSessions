// server.js

'use strict';

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const hbs = require('express-handlebars');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
// const MongoStore = require('connect-mongo')(session);

var main = require('./server/routes/main/main');

var port = process.env.PORT || 3000;

app.engine('hbs', hbs({ defaultLayout: 'layout', extname: '.hbs' }));
app.set('view engine', 'hbs');

app.use('/static', express.static(path.join(__dirname, 'public')));

app.use('/', main);

app.listen(port);
console.log('listening on port ' + port);
