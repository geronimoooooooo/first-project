

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

app.use((req, res, next)=>{
  // app.use('*' :/?a=1&b=2, /, /home?a=1&b=2, 1
  console.log(new Date().toISOString() +" app.use((req, res, next)=>: "+req.url+", "+req.path+ ", "+req.originalUrl+","+req.query.a);
  next();
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


app.get('/ho*me',(req, res) => {
  console.log("logger in app.get home: "+req.url+", "+req.path+ ", "+req.originalUrl);
  res.write("Home \n")
  res.end('Page');
  // res.send('Home Page');
});

app.get('/afk/', (req, res) => {
  console.log("logger in app.get /afk: "+req.url+", "+req.path+ ", "+req.originalUrl);
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

// var httpsServer = https.createServer(credentials, app);

// httpsServer.listen(3000, (err) => {
//   if(err){
//     console.log(new Date().toISOString()+` https server could not start on port: ${process.env.PORTHTTPS}`);
//   }else{
//     console.log(new Date().toISOString()+` https server running on port: ${process.env.PORTHTTPS}`);
//   }
//     });
app.listen(3000, ()=>{    
  console.log(`browse this url http://localhost:3000`)
});