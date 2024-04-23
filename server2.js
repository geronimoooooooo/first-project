import https from "https"
import express from "express";
//const express = require('express')
import path from "path";
import { fileURLToPath } from "url";
// import { bros, routeDel} from "./route1.js";
// import {npvGet, npvGetAxios, getTime} from "./routes/routes_get.js"
// import { offers, routeGetOfferList, adder } from "./importer/LibRequireHelper.js";
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

const credentials = {
    pfx: fs.readFileSync('sslcert/STAR_researchstudio_at.pfx')
  };

// Listen both http & https ports
const httpServer = https.createServer(app);
const httpsServer = https.createServer(credentials, app);

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
