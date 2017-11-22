/*
	Author: Jaco du Plooy
*/

var express = require('express');
var path = require('path');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var firebase = require("firebase");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/'));

app.get('/index', function(req, res){
	console.log("Redirected user to index\n");
	res.redirect("index.html");
	res.end();
});

app.post('/example', function(req, res){
	console.log("retrieveDatasets req received. Email: " + req.body.userEmail);

	//
});

var server = app.listen(7000, function () {
   var host = server.address().address;
   var port = server.address().port;

   console.log("ToadList listening at http://%s:%s", host, port);
   console.log(__dirname);
})