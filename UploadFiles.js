var formidable = require('formidable'),
    http = require('http'),
	fs= require('fs');
    util = require('util');
	

http.createServer(function(req, res) {
  if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
    // parse a file upload
    var form = new formidable.IncomingForm();
//    console.log(JSON.stringify(form));
    form.parse(req, function(err, fields, files) {
	  var filePath = files.upload.path;
	  console.log("The file path is: "+filePath);
	  var fileData = fs.readFileSync(filePath);
	//  console.log("The file data is: "+fileData);
      res.writeHead(200, {'content-type': 'text/plain'});
      res.write('received upload:\n\n');
	  res.write(fileData,'utf8');
      res.end(util.inspect({fields: fields, files: files}));
//      res.end(JSON.stringify(fields)+JSON.stringify(files));
    });
    return;
  }

  // show a file upload form
  res.writeHead(200, {'content-type': 'text/html'});
  res.end(
    '<form action="/upload" enctype="multipart/form-data" '+
    'method="post">'+
    '<input type="text" name="title"><br>'+
    '<input type="file" name="upload" multiple="multiple"><br>'+
    '<input type="submit" value="Upload">'+
    '</form>'
  );
}).listen(8888,function(){
	console.log("Listening on port:8888");
});