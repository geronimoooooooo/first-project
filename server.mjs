//#region imports
import https from "https"
import express from "express"
import fs from "fs"
import * as dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import {npvGet, test, npvGetAxios, getTime, homeMiddleware} from "./routes/routes_get.mjs"
import { offers, routeGetOfferList, adder } from "./node1/importer/LibRequireHelper.js";
import routerBirds from './routes/router_birds.js'
import { log } from "console";
// const module_helper = import("./helper1.js"); //ruft alles hier drinnen auf
//#endregion

//#region definitions
const app = express();
const __filename = fileURLToPath(import.meta.url); //C:\web\first-project\server.mjs 
const __dirname = path.dirname(__filename); //C:\web\first-project
app.use(express.json()); // for json
app.use(express.urlencoded({ extended: true })); // for form data
app.use(express.static('public')); //url/file.img abrufbar, wenn im public folder

// app.engine('html', require('ejs').renderFile);
app.set("view engine", "ejs");
app.set("views", __dirname);
// require('dotenv').config();
dotenv.config();
//#endregion

//#region views
app.get('/test' , (req , res)=>{
   res.sendFile(path.join(__dirname, 'views', 'test.html'))
});
//#endregion


//#region middleware
app.use('/birds', routerBirds);

app.use('/a1', function (req, res, next) {
  console.log("/");
  res.json(offers)
  next();
})

app.use('/home', (req, res, next) => {
  console.log('A new request received at middleware home ' + new Date().toISOString());
  next();
});

app.use('/home', homeMiddleware);

app.use('/a1', function (req, res, next) {
  console.log("/a1");
  res.json(offers)
  // next(); //comment this line out, to avoid error
  //error comes because index2.html calls this a1 to get data to fill table and finally
  // get('*') is being called
  /*
  Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
    at new NodeError (node:internal/errors:399:5)
    at ServerResponse.setHeader (node:_http_outgoing:645:11)
    at ServerResponse.header (C:\web\node1\node_modules\express\lib\response.js:794:10)
    at ServerResponse.send (C:\web\node1\node_modules\express\lib\response.js:174:12)
    at file:///C:/web/node1/index.js:193:7
    at Layer.handle [as handle_request] (C:\web\node1\node_modules\express\lib\router\layer.js:95:5)
    at next (C:\web\node1\node_modules\express\lib\router\route.js:144:13)
    at Route.dispatch (C:\web\node1\node_modules\express\lib\router\route.js:114:3)
    at Layer.handle [as handle_request] (C:\web\node1\node_modules\express\lib\router\layer.js:95:5)
    at C:\web\node1\node_modules\express\lib\router\index.js:284:15
  */
})

app.use('/a', router); //calls 2 weitere routes von "router", die "/"" sind
app.use('/user', router2); //user/afk/:name/:class 
//#endregion middleware

//#region get
// For invalid routes
app.get('*', (req, res) => {
  console.log("*");
  // res.status(404).sendFile(path.join(__dirname+'/form.html'));
  // res.sendFile(path.join(__dirname+'/form.html'));
  res.send('404! This is an invalid URL.');
});

app.get("/main", function (req, res) {
  var name = "hello";
  name = path.join(__dirname+'/index2.html');
  console.log(name);
  res.sendFile(path.join(__dirname, 'views', 'index2.html'));
  // res.render(__dirname + "index.html", { name: name });
});

/* /game?name=oddball*/
app.get("/game", function (req, res) {
  var name = req.query.name;
  console.log(req.query.name);
  res.send(`this is a name: ${name} !`);
  //res.send("das ist ein Test: ${req.body.name } ")
  //res.render('the_template', { name: req.body.name });
});

app.get('/' , (req , res)=>{
  res.send('hello from simple server :)')
  console.log(`file: ${__filename} and dir. ${__dirname}`)
})

app.get('/', (req, res) => {  
  res.send('startseite');
  //res.json({ success: true })
})

app.get('/a' , (req , res)=>{
  res.send('aaaaaa   simple server :)')  
})

app.get('/return/:val', (req, res) => {
  //https://ispacevm04.researchstudio.at/return/abc54 returniert abc54 im body
  res.send(req.params.val)
});

app.get('/home', (req, res) => {
  console.log("logger in app.get home");    
  res.send('Home Page');
});

app.get("/main", function (req, res) {
  // var name = "hello";
  // name = path.join(__dirname+'/index2.html');
  console.log("/main");
  // res.sendFile(path.join(__dirname+'/form.html'));
  res.sendFile(path.join(__dirname+'/index2.html'));

  // res.render(__dirname + "index.html", { name: name });
});

app.get("/form", function (req, res) {    
  res.sendFile(path.join(__dirname, 'views', 'form.html'));
  // res.render(__dirname + "index.html", { name: name });
});

/* /game?name=oddball*/
app.get("/game", function (req, res) {
  //if no name given, req.q.name is undefined and falsy
  if(req.query.name){ 
    let name = req.query.name;  
    console.log(req.query.name + " is " +typeof req.query.name);
    name = name.toLowerCase();
  }
  res.send(`this is a name: ${req.query.name} !`);
  //res.send("das ist ein Test: ${req.body.name } ")
  //res.render('the_template', { name: req.body.name });
});
//#endregion get

//#region get callback
// app.get('/add', adder);
// app.get("/npv", npvGet);
app.get('/index3', index3);
app.get('/hello', hello);
app.get("/npv2", npvGetAxios);
app.get("/time", getTime);
app.get("/list", routeGetOfferList);
// app.get("/bro/:id", bros);
// app.get("/del/:id", routeDel);
//#endregion

//#region post
app.post('/form', (req, res) => {
  const first_name = req.body.first_name
  const last_name = req.body.last_name
  res.send(`This is ${first_name} with ${last_name}.`);
})

app.post("/submit-form", (req, res) => {
  const username = req.body.username;
  //...
  res.end();
});
//#endregion

//#region post-callback
app.post('/form', getDataFromForm2);

app.post('/', (req, res) => {
  console.log(req.body)
  res.json({ success: true })
})

app.post('/api/users', function(req, res) {
const user_id = req.body.id;
const token = req.body.token;
const geo = req.body.geo;

res.send({
  'user_id': user_id,
  'token': token,
  'geo': geo
});
});
//#endregion post-callback
//#region route
app.route("/a1").get((req, res) => {
  res.send("You have chosen aaaaa a");
});

app.route("/a2").get(function (req, res) {
  res.send("Tutorial on Node");
});

app.route('/login')

  // show the form (GET http://localhost:8080/login)
  .get(function(req, res) {
      res.send('this is the login form');
  })

  // process the form (POST http://localhost:8080/login)
  .post(function(req, res) {
      console.log('processing');
      res.send('processing the login form!');
  });

//#endregion



//#region WEBSERVER
//#region https
// const httpsServer = https.createServer({
//     key: fs.readFileSync('privateKey.key'),
//     cert: fs.readFileSync('certificate.crt'),
//   }, app);

// var privateKey  = fs.readFileSync('sslcert/privateKey.key', 'utf8');
// var certificate = fs.readFileSync('sslcert/certificate.crt', 'utf8');

// var credentials = {key: privateKey, cert: certificate};

/* const credentials = {
    key: fs.readFileSync('sslcert/privateKey.key'),
    cert: fs.readFileSync('sslcert/certificate.crt')
  };
*/
//#endregion

//set NODE_OPTIONS=--openssl-legacy-provider ;read magic wiki
const credentials = {
  pfx: fs.readFileSync('sslcert/STAR_researchstudio_at.pfx')
};

const portHTTPS = process.env.PORTHTTPS || 443
const httpsServer = https.createServer(credentials, app);

// const port = process.env.PORT || 3000
// app.listen(port, ()=>{
//   console.log(`browse this url: localhost:${port}`);  
// });

httpsServer.listen(portHTTPS, (err) => {
  if(err){
    console.log("Error: ", err);
    console.log(new Date().toISOString()+` https server could not start on port: ${portHTTPS}`);
  }else{
    console.log(new Date().toISOString()+` https server running on port: ${portHTTPS}`);
  }
});
//#endregion
  

