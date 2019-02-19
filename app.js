const hostname = '0.0.0.0';
var port = 520;

//---------------------------------------------------//
var fs = require('fs');

var http  = require('http');
var static = require('node-static');
var url = require('url');
var request = require('axios');

function static_handler(req, res) {
	req.addListener('end', function() {
		fileServer.serve(req, res, function (e, result) {
			//If the file cannot be found in '/static' directory
			//print to browser the error messafe
			if (e && (e.status === 404)) { 
				res.writeHead(404, {"Content-Type": "text/html"});
				res.write("ERROR 404: File not Found");  
				res.end();
		}
	});
}).resume();
}

function increment_handler(url, res) {
	var num = Number(url);
	console.log("Current Num: " + num);
	if(num == 0)
	{
		num = 1;
	}
	else {
		num = num * 2;
	}
	num = JSON.stringify(num);
	res.write(num, function(err) {res.end(); });
}

function login_handler(url, res) {
	//object to store user's login contents
	var obj = {
		user: url[0],
		password: url[1]
	};

	obj = JSON.stringify(obj);
	console.log("obj: " + obj); // check to see if object is created properly
	res.write(obj, function(err) {res.end(); });
}

function handler(req, res) {
	console.log("request url issss " + req.url);
	var url = req.url;
	if (url != '/favicon.ico') 
	{
	url = url.replace('/','');
	url = url.split('?');

	//make sure that the url is correct
	console.log(url);
	//console.log("The Length is: " + url.length);
	//console.log(typeof url); 

		if(url.length == 1)
		{
			fileServer = new static.Server('./public');
			static_handler(req,res);
		}
		else 
		{
			var subUrl = url[1].split('/'); //gets the login info from the url and stored in subUrl
			console.log(subUrl);
			if(subUrl.length == 1)
			{
				increment_handler(subUrl, res);
			}
			if(subUrl.length == 2) {
				login_handler(subUrl, res);
			}
		}
	}
}

var server = http.createServer(handler);
server.listen(port, hostname);