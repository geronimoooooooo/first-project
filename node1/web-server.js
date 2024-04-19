//console.log("hello world")

const http = require('node:http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
  console.log(`Use browser to call http://localhost:3000/`);
}); 

var request = require("request");
	request("http://www.google.com",function(error,response,body)
	{
		console.log(body);
	});