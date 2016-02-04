/* this moudle simulate various backend services, some are quick and some can be slow
*/
var exec = require('child_process').exec;

function start(res){
	console.log("Request handler 'start' was called.");
	exec("ping www.baidu.com",function(err,stdout,stderr){   //this is a long function 
	  res.writeHead(200, {"Content-Type":"text/plain"});
	  res.write(stdout);
	  res.end();
	});
	}
	
	
function upload(res){
  console.log("Request handler 'upload' was called");	
  res.writeHead(200, {"Content-Type":"text/plain"});
  res.write("What do you want to upload?");
  res.end();
  }
  
exports.start = start;
exports.upload = upload;

