

// let now = new Date();
// console.log(now.toISOString());
// console.log(now.toISOString().slice(0,-5)+"Z");
// console.log(now.toISOString().replace(/[.]\d+/, ''));
// console.log(now.toISOString().replace('T', ' ').replace(/[.]\d+/, ''));


import express from "express";
// const https = require('https');
import https from "https"
// const fs = require('fs');
import fs from "fs"
const app = express()
import * as dotenv from "dotenv"; 
dotenv.config();

app.use('/*', (req, res, next)=>{
  // app.use('*' :/?a=1&b=2, /, /home?a=1&b=2, 1
  console.log(new Date().toISOString() +" app.use('/*' :"+req.url+", "+req.path+ ", "+req.originalUrl+","+req.query.a);
  next();
})
app.use((error, req, res, next) => {
  console.log('req.url: '+req.url);
})

app.get('/', (req, res) => {  
  // res.redirect(302, "/home");
  res.write("first line");
  res.end('startseite');
  //res.json({ success: true })
});


//detail?race=&name= user/1/100/detail?race=orc&name=zugzug
app.get('/user/:id/:dps/detail' , (req , res)=>{
  // const id = req.params.id;
  let {id} = req.params;
  // const name = req.query.name;
  let {race, name} = req.query;

  console.log("id: "+id);
  console.log("dps: "+req.params.dps);
  console.log("race: "+race);
  console.log("name: "+name);  
  res.send('hello from simple server :)' + JSON.stringify(req.query));
})

const mwTimeLogger = (req, res, next) => {
  console.log(new Date().toISOString()+ " new request to server");
  if (false) {
    // A middleware function can end the request cycle, so the next
    // handler function is not called.
    return res.status(403).send("You do not have access");
  }
  // A middleware function calls next() to invoke the next handler function
  // on the route.
  console.log("next() von mwTimeLogger mw");
  next();
};
const mwTimeLogger2 = (req, res, next) => {
  console.log(new Date().toISOString()+ " new request to server");
  if (false) {
    // A middleware function can end the request cycle, so the next
    // handler function is not called.
    return res.status(403).send("You do not have access");
  }
  // A middleware function calls next() to invoke the next handler function
  // on the route.
  console.log("next() von mwTimeLogger2 mw");
  next();
};

app.get("/mwtester", mwTimeLogger2, mwTimeLogger, (req, res) => {
  console.log("/mwTester");
  res.send("mwTester");
  // This function is only called if false in mw
});

app.get('/ho*me', mwTimeLogger,(req, res) => {
  console.log("logger in app.get home: "+req.url+", "+req.path+ ", "+req.originalUrl);
  res.write("Home \n")
  res.end('Page');
  // res.send('Home Page');
});

// const options = {
//   pfx: fs.readFileSync('sslcert/STAR_researchstudio_at.pfx')
// };

// const httpsServer = https.createServer({
//     key: fs.readFileSync('privateKey.key'),
//     cert: fs.readFileSync('certificate.crt'),
//   }, app);

 var privateKey  = fs.readFileSync('sslcert/researchstudio_at.key', 'utf8');
 var certificate = fs.readFileSync('sslcert/STAR_researchstudio_at.crt', 'utf8');

 var credentials = {key: privateKey, cert: certificate};

// const credentials = {
//   pfx: fs.readFileSync('sslcert/STAR_researchstudio_at.pfx')
// };

// var httpsServer = https.createServer(credentials, app);

// https.createServer(options, (req, res) => {
//   res.writeHead(200);
//   res.send('hello world\n');
// }).listen(8000);

var httpsServer = https.createServer(credentials, app);

httpsServer.listen(process.env.PORTHTTPS, (err) => {
  if(err){
    console.log(new Date().toISOString()+` https server could not start on port: ${process.env.PORTHTTPS}`);
  }else{
    console.log(new Date().toISOString()+` https server running on port: ${process.env.PORTHTTPS}`);
  }
    });