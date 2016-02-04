/* this moudle simulate various backend services, some are quick and some can be slow
*/
var exec = require('child_process').exec;
var querystring = require("querystring");

function start(res,postData){
	console.log("Request handler 'start' was called.");
	exec("ping www.baidu.com",function(err,stdout,stderr){   //this is a long function 
	  res.writeHead(200, {"Content-Type":"text/plain"});
	  res.write(stdout);
	  res.end();
	});
	}
	
	
function upload(res,postData){
  console.log("Request handler 'upload' was called: ",postData);	
  res.writeHead(200, {"Content-Type":"text/plain"});
//  res.write("You've sent :"+postData);
  res.write("You've sent :"+querystring.parse(postData).text);
  res.end();
  }
  
function getform(res,postData){
  console.log("Request handler 'getform' was called.");

  var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" method="post">'+
    '<textarea name="text" rows="20" cols="60"></textarea>'+
    '<input type="submit" value="Submit text" />'+
    '</form>'+
    '</body>'+
    '</html>';
	
	res.writeHead(200, {"Content-Type": "text/html"});
    res.write(body);
    res.end(); 
}
  
exports.start = start;
exports.upload = upload;
exports.getform = getform;

