var http = require('http');
var fs = require('fs');
var url = require('url');

function templateHTML(title, list, body){
  return `
  <!doctype html>
  <html>
  <head>
    <title>WEB1 - ${title}</title>
    <meta charset="utf-8">
  </head>
  <body>
    <h1><a href="/">WEB</a></h1>
    ${list}
    <a href="/create">create</a>
    ${body}
  </body>
  </html>
  `;
}

function templateList(filelist) {
  var list = '<ul>';
  var i = 0;
  while(i < filelist.length){
    list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
    i = i + 1;
  }
  list = list+'</ul>';
  return list;
}

var app = http.createServer(function(request,response){
    var _url = request.url;
    const myURL = new URL('https://localhost:3000'+_url);
    console.log(myURL);
    var queryData = myURL.searchParams.get('id');
    if(queryData) {
    } else {
      queryData = undefined;
    }
    var pathname = myURL.pathname;
    console.log("pathname is: " + pathname);
    console.log("query data is: " + queryData);
    
    if(pathname === '/'){
      if(queryData === undefined){
 
        fs.readdir('./data', function(error, filelist){
          var title = 'Welcome';
          var description = 'Hello, Node.js';
          var list = templateList(filelist);
          var template = templateHTML(title, list, `<h2>${title}</h2>${description}`);
          response.writeHead(200);
          response.end(template);
        })
 
 
 
      } else {
        fs.readdir('./data', function(error, filelist){
          fs.readFile(`data/${queryData}`, 'utf8', function(err, description){
            var title = queryData;
            var list = templateList(filelist);
            var template = templateHTML(title, list, `<h2>${title}</h2>${description}`);
            response.writeHead(200);
            response.end(template);
          });
        });
      }
    } else {
      response.writeHead(404);
      response.end('Not found Not Found');
    }
 
 
 
});
app.listen(3000);
