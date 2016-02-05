
function route(handle,pathname,res,postData,req){
console.log("About to route a request for ",pathname);
if (typeof handle[pathname] === 'function') {
//	handle[pathname](res);           // if the path exists, call the handle method in the requesHandler
	handle[pathname](res,postData,req);  // pass additional postData to handler to deal with and req object 
} else {
	console.log("No request handler found for ",pathname);
	res.writeHead(404,{"Content-Type":"text/plain"});
	res.write("404 Not Found");
	res.end();
 }
}
	
exports.route = route;