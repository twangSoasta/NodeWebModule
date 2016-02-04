var http = require('http');
var url = require('url');
function start(host,port,callback,handle){
//var host = "127.0.0.1";
//var port = 8888;
var server = http.createServer(function(req,res){
	var resHeader = {
		"Content-Type": "text/plain",
		"accepted-encoding":"gzip,deflate",
		"set-cookies":"twang"
		};
	
	var resData = "Have a nice year of Monkey!";
	var pathname = url.parse(req.url).pathname;
	console.log("See an incoming request message",req.url,"Pathname: ",pathname,req.method);
	
	callback(handle,pathname,res);  //pass handle into the callback function which is route()
	                            // send to router to determine who should handle the response then produce the final results based on the handler' meta result								
/*	res.writeHead(200, resHeader);   //not handle here anymore but in the requestHandler
	res.write(resData);
	res.end();
*/	
	});

server.listen(port,host,function(){
	console.log("Http server listening on",host,":",port);
	});

console.log("Starting");  //this shows up on top
};

exports.startMyHttpServer = start;

