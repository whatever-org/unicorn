'use strict';

var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');

var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var flash = require('express-flash')

mongoose.connect(require('./server/config/db').url);

app.set('view engine', 'ejs');
app.use(morgan('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: 'thisisasupersecretstring',
    saveUninitialized: true,
    resave: true
}));
app.use(flash());
app.use('/', require('./server/routes/unicorn'));
app.use(express.static(__dirname + '/public'));

var router = express.Router();


app.listen(port);
console.log('Server running on port ' + port);