
//importing modules
const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
var config = require('config');
var http = require('http');

//user defined modules
var movieRoutes = require('./routes/movie-routes');

//Initiate express
var app = express();

//configuring express middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));


//Enabling CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//defining routes
app.use('/api/movies', movieRoutes);


//configuring mongodb
const mongoServer = `mongodb://${config.get('mongodb.server')}/${config.get('mongodb.db')}`;

mongoose.connect(mongoServer, { useMongoClient: true });
mongoose.connection.on("connected", function () {
    console.log(`Connected to mongodb on ${config.get('mongodb.server')}`)
});

mongoose.connection.on("err", function (err) {
    if (err)
        console.log(`Unable to connect to mongodb on ${config.get('mongodb.server')}`);
});

//creating and starting web server
http.createServer(app)
    .listen(config.get("express.port"), function (err) {
        if (err) {
            console.log("Couldn't start app server");
            return;
        }
        var host = `${config.get("express.host")}:${config.get("express.port")}`;
        console.log(`Express server started at ${host}`);
    });