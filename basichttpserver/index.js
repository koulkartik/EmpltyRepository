const http = require('http');
const port = 8000;
const fs = require('fs');

function requestHandler(request,response){
    console.log(request.url);
    response.writeHead(200, {'content-type': 'text/html'});


    let filePath;

    switch(request.url){
      case '/':
           filePath = '.\\basichttpserver\\index.html';
           break;
      case '/profile':
           filePath = '.\\basichttpserver\\profile.html';
           break;
      default:
          filePath = '.\\basichttpserver\\404.html';     
    }

   fs.readFile(filePath, function(error,data){
     if(error){
         console.log('error',error);
         return response.end('<h1>Error!</h1>');
     }
     return response.end(data);

   })
   //  fs.readFile('.\\basichttpserver\\index.html', function(error,data){
   //   if(error){
   //      console.log('Error',error);
   //      return response.end('<h1>Error!</h1>');
   //   }
     
   //   return response.end(data);
   //  });
 
    // res.end('<h1><u>Gotcha!</u></h1>');
}

const server = http.createServer(requestHandler);

server.listen(port, function(error){
   if(error){
     console.log(error);
     return;
   }
 
   console.log("Server is rumnning on port: " ,port);
});