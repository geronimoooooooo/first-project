//#region importer
import * as dotenv from "dotenv"; 
dotenv.config();
// require('dotenv').config();
import https from "https"
// const https = require('https')

import fs from "fs"
// const fs = require('fs')
import path from "path";
// const path  = ('path');
import { fileURLToPath } from "url";
// const fileURLToPath = require('url');

import express from "express";
// const express = require('express');

import { hello, index3} from "./routes_get.js";
// const routes_get = require('./routes_get.js');

import { router2, bro, homeMiddleware } from './routes/routes_get.js';

import { getDataFromForm2, routerVar } from "./routes_post.js";
// const routes_post = require('./routes_post.js');

import { offers, routeGetOfferList, adder } from "./importer/LibRequireHelper.js";
//#endregion

const app = express()
const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json()); // for json
app.use(express.urlencoded({ extended: true })); // for form data
app.set("view engine", "ejs");
app.set("views", __dirname);

//#region https
// const httpsServer = https.createServer({
//     key: fs.readFileSync('privateKey.key'),
//     cert: fs.readFileSync('certificate.crt'),
//   }, app);

// var privateKey  = fs.readFileSync('sslcert/privateKey.key', 'utf8');
// var certificate = fs.readFileSync('sslcert/certificate.crt', 'utf8');

// var credentials = {key: privateKey, cert: certificate};

const credentials = {
  pfx: fs.readFileSync('sslcert/STAR_researchstudio_at.pfx')
};

var httpsServer = https.createServer(credentials, app);
//#endregion

app.get('/return/:val', (req, res) => {
  //https://ispacevm04.researchstudio.at/return/abc54 returniert abc54 im body
  res.send(req.params.val)});

  app.use('/home', (req, res, next) => {
    console.log('A new request received at middleware home ' + new Date().toISOString());
    next();
  });
  app.use('/home', homeMiddleware);
  
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
  res.sendFile(path.join(__dirname+'/form.html'));
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

// With middleware
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


app.get('/bro', bro);

app.get('/hello', hello);
app.get('/', (req, res) => {  
  res.send('startseite');
  //res.json({ success: true })
})
app.get('/index3', index3);

// about page route (http://localhost:8080/about)
router.get('/', function(req, res, next) {
  console.log("router.get /");
  // res.send('im the about page!');
  next();
});

// home page route (http://localhost:8080)
router.get('/', function(req, res) {
  console.log("router.get /2");
  res.send('im the home page of a router als weiterleitung!');
});

// route middleware to validate :name
router.param('name', function(req, res, next, name) {
  // do validation on name here
  // blah blah validation
  // log something so we know its working
  console.log('doing name validations on ' + name);

  // once validation is done save the new item in the req
  req.name = name;
  // go to the next thing
  next();
});

// route with parameters (http://localhost:8080/hello/:name)
app.get('/hello/:name/:age', function(req, res) {
  res.send('hello ' + req.name + '!' + req.params.name + ' '+req.params.age);
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

// apply the routes to our application
app.use('/a', router); //calls 2 weitere routes von "router", die "/"" sind
app.use('/user', router2); //user/afk/:name/:class 

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

// For invalid routes
app.get('*', (req, res) => {
  console.log("*");
  // res.status(404).sendFile(path.join(__dirname+'/form.html'));
  // res.sendFile(path.join(__dirname+'/form.html'));
  res.send('404! This is an invalid URL.');
});

httpsServer.listen(process.env.PORTHTTPS, (err) => {
  if(err){
    console.log(new Date().toISOString()+` https server could not start on port: ${process.env.PORTHTTPS}`);
  }else{
    console.log(new Date().toISOString()+` https server running on port: ${process.env.PORTHTTPS}`);
  }
    });


