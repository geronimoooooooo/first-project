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

import { router2, homeMiddleware } from './routes/routes_get.js';

import { getDataFromForm2, routerVar } from "./routes_post.js";
// const routes_post = require('./routes_post.js');

import { offers, routeGetOfferList } from "./importer/LibRequireHelper.js";
import  * as libreq2 from "./importer/LibRequireHelper2.js";
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




  

  






// With middleware








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


// apply the routes to our application







httpsServer.listen(443, (err) => {
  if(err){
    console.log(new Date().toISOString()+` https server could not start on port: ${process.env.PORTHTTPS}`);
  }else{
    console.log(new Date().toISOString()+` https server running on port: ${process.env.PORTHTTPS}`);
  }
    });