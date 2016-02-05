# NodeWebModule
experiment project using NodeJS 

index.js - main js file, calling server, router, requestHandler js module, create handle object(of functions)
           start http server, passing the callback function (router) and handle into the server call. 
           require the other 3 js modules
		   
server.js - implementation of http server and listen to a port, use req.pathname as a switch to be used to pass into
            callback(router) function to be assigned different handling function later. 
			use req.addListener to sniff every incoming requet POST data
			pass postData into requestHandler to process and display
			exports start()

router.js - takes in handle, res, req, pathname, postData to call the correct handling functions 
            exports route
			
requestHandler.js - define start, getform, upload, uploadfile, show functions to handle different actions based on req, res and 
                    postdata to write response back to the screen to display. 
                    exports 5 functions

