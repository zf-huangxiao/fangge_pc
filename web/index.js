var express = require('express');
var path = require('path');
var http = require('http');
var exec = require('child_process').exec;
var cluster = require('cluster');
var numCPUs = 1;

var app = express();

app.use(express.static(path.join(__dirname, 'src')));


if (cluster.isMaster) {

	for (var i = 0; i < numCPUs; i++) {
		cluster.fork();
	}

	cluster.on('death', function(worker) {
		console.log('worker ' + worker.pid + ' died');
		cluster.fork();
	});
	cluster.on('exit', function(worker) {
		var st = new Date
		st = st.getFullYear()+ '-'+ (st.getMonth()+1)+ '-'+st.getDate()+ ' '+st.toLocaleTimeString()
		console.log('worker ' + worker.process.pid + ' died at:',st);
		cluster.fork();
	});

}
else {

	var server,
		port = 3002;

	server = http.createServer(app);

	server.listen(port, function(){
		console.log("Server running at http://:" + port);
	});

}

module.exports = app;
