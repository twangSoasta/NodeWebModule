var server = require("./server.js");  //server is an obj, function exported is startMyHttpServer
var router = require("./router.js");  //router is an obj, function exported is route
var requestHandlers = require("./requestHandler.js");

var handle = {};  //var handle = new Object(); handle is an object including values and methods(functions)
handle["/"] = requestHandlers.start;        
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload; // the rest will be undefined 

server.startMyHttpServer("127.0.0.1",8889,router.route,handle);
