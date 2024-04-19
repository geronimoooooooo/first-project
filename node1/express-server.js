import https from "https"
import { log } from "console";
import express from "express";
//const express = require('express')
import path from "path";
import { fileURLToPath } from "url";
import { bros, routeDel} from "./route1.js";
import {npvGet, npvGetAxios, getTime} from "./routes/routes_get.js"
import { offers, routeGetOfferList, adder } from "./importer/LibRequireHelper.js";
import * as dotenv from "dotenv";
import fs from "fs"
// let https;
try {
  https = await import('node:https');
} catch (err) {
  console.error('https support is disabled!');
} 

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const module_helper = import("./helper1.js"); //ruft alles hier drinnen auf
const app = express(); 
//const port = 3000;

app.use(express.json()); // for json
app.use(express.urlencoded({ extended: true })); // for form data
// app.engine('html', require('ejs').renderFile);
app.set("view engine", "ejs");
app.set("views", __dirname);

// require('dotenv').config();
dotenv.config();

//assuming app is express Object.
// app.get('/',function(req,res) {
//   res.sendFile('index.html');
// });

app.get("/bro/:id", bros);

app.get("/del/:id", routeDel);

app.post("/submit-form", (req, res) => {
  const username = req.body.username;
  //...
  res.end();
});

app.get("/list", routeGetOfferList);

app.get("/main", function (req, res) {
  var name = "hello";
  name = path.join(__dirname+'/index2.html');
  console.log(name);
  res.sendFile(path.join(__dirname+'/index2.html'));
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

// With middleware
app.use('/a1', function (req, res, next) {
  console.log("/");
  res.json(offers)
  next();
})


app.get('/add', adder);
// app.get("/", function (req, res) {
//   //res.sendFile(__dirname + "/index.html");
//   console.log(process.env.NAME);
//   res.send("das ist ein Test");
// });

app.route("/a").get((req, res) => {
  res.send("You have chosen aaaaa a");
});



app.post('/form', (req, res) => {
  const first_name = req.body.first_name
  const last_name = req.body.last_name

  res.send(`This is ${first_name} with ${last_name}.`);
 })
 

app.route("/Node").get(function (req, res) {
  res.send("Tutorial on Node");
});
app.get("/npv", npvGet);
app.get("/npv2", npvGetAxios);
app.get("/time", getTime);

// Listen both http & https ports
const httpServer = https.createServer(app);
const httpsServer = https.createServer({
  key: fs.readFileSync('sslcert/privateKey.key'),
  cert: fs.readFileSync('sslcert/certificate.crt'),
}, app);

httpServer.listen(80, () => {
    console.log('HTTP Server running on port 80');
});

httpsServer.listen(443, () => {
    console.log('HTTPS Server running on port 443');
});

/*
app.listen(process.env.PORTHTTPS, function () {
  console.log(`Server is running on ${process.env.PORTHTTPS}`);
});
*/
