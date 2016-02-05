/* this moudle simulate various backend services, some are quick and some can be slow
*/
var exec = require('child_process').exec;
var querystring = require("querystring");
var fs = require('fs');
var formidable = require('formidable');

function start(res,postData,req){
	console.log("Request handler 'start' was called.");
	exec("ping www.baidu.com",function(err,stdout,stderr){   //this is a long function 
	  res.writeHead(200, {"Content-Type":"text/plain"});
	  res.write(stdout);
	  res.end();
	});
	}
	
	
function upload(res,postData,req){
  console.log("Request handler 'upload' was called: ",postData);	
  res.writeHead(200, {"Content-Type":"text/plain"});
//  res.write("You've sent :"+postData);
  res.write("You've sent :"+querystring.parse(postData).text);
  res.end();
  }
  
function getform(res,postData,req){
  console.log("Request handler 'getform' was called.");

/*   var body = '<html>'+                  //text form and file upload form
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" method="post">'+           // form action determine the url
    '<textarea name="text" rows="20" cols="60"></textarea>'+
    '<input type="submit" value="Submit text" />'+
    '</form>'+
	'<form action="/uploadfile" enctype="multipart/form-data" '+   
    'method="post">'+
    '<input type="file" name="upload" multiple="multiple">'+
    '<input type="submit" value="Upload file" />'+
    '</form>'+	
    '</body>'+
    '</html>';
	*/
	
	var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/uploadfile" enctype="multipart/form-data" '+
    'method="post">'+
    '<input type="file" name="uploadfile" multiple="multiple">'+
    '<input type="submit" value="Upload file" />'+
    '</form>'+
    '</body>'+
    '</html>';

	res.writeHead(200, {"Content-Type": "text/html"});
    res.write(body);
    res.end(); 
}

function show(res,postData,req){           // or show(res) only
	console.log("Request handler 'show' was called");
	fs.readFile("./files/test1.png","binary",function(err,file){
		if (err) {
			res.writeHead(500,{"Content-Type":"text/plain"});
			res.write(err +"\n");
			res.end();
		} else {
		    res.writeHead(200,{"Content-Type":"image/png"});
			res.write(file,'binary');
			res.end();
		}
			
		});
}

function uploadfile(res, postData,req) {
  console.log("Request handler 'uploadfile' was called.");

  var form = new formidable.IncomingForm();
console.log("about to parse"+req.toString());
  form.parse(req, function(error, fields, files) {
	  console.log("file is "+JSON.stringify(files));
	if (error) {
		console.log("Error is: "+error); return;
	} else {
	var filePath = files.upload.path;
	console.log("The file path is: "+filePath);
    console.log("parsing done");
    fs.renameSync(filePath, "/files/test1.png");
    res.writeHead(200, {"Content-Type": "text/html"});
    res.write("received image:<br/>");
    res.write("<img src='/show' />");
    res.end();
	}
  });
}


  
exports.start = start;
exports.upload = upload;
exports.getform = getform;
exports.show = show;
exports.uploadfile = uploadfile;

