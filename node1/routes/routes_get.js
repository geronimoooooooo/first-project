
// const https = require('https');
import https from "https"
import express from "express";
// import xml from 'xml'
import axios from "axios"
// var xml = require('xml');
// var xmlString = xml(xmlObject, options);
export const router2 = express.Router();


export function homeMiddleware(req, res, next){
    console.log("logger homeMiddleware 2");
    next();
}

export function getTime(req, res){
    let sco = 'science';
    // let myTime = Date.prototype.toISOString();
    let myTime = new Date().toISOString();
    console.log("this is bro function");
    res.send(`This is bro ${myTime}`);
}

export function npvGetAxios(req,res2){
    let urlNpv = 'https://mds.sommer.at/Web-Service-Admintool/fetchXHydro10.php?station=25062015&von=2024-03-15T20:50:01&name=npvbgd&passwort=4f56bbca4d4bdbe06cb8819286ea8690';
    // res2.type('application/xml');    
    // res2.set('Content-Type', 'text/xml');
    let urlJson = 'https://jsonplaceholder.typicode.com/users';

    axios.get(urlJson)
    .then(res => {
        const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
        console.log('Status Code:', res.status);
        console.log('Date in Response header:', headerDate);

        const users = res.data;

        for(let user of users) {
        console.log(`Got user with id: ${user.id}, name: ${user.name}`);
        }
        res2.send(users);
    })
    .catch(err => {
        console.log('Error: ', err.message);
    });
}

export function npvGet(req, res2){
    console.log("this is func npvGet");
    var users="";
    let xmlString ="";
    // res2.send("this is npv");
    let urlNpv = 'https://mds.sommer.at/Web-Service-Admintool/fetchXHydro10.php?station=25062015&von=2024-03-15T20:50:01&name=npvbgd&passwort=4f56bbca4d4bdbe06cb8819286ea8690';
    let urlJson = 'https://jsonplaceholder.typicode.com/users';
    https.get(urlNpv, res => {
  let data = [];
  const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
  console.log('Status Code:', res.statusCode);
  console.log('Date in Response header:', headerDate);

  res.on('data', chunk => {
    data.push(chunk);
  });
 
  res.on('end', () => {
    console.log('Response ended: ');
    // users = JSON.parse(Buffer.concat(data).toString());
    xmlString = Buffer.concat(data).toString();
    //  xmlString = JSON.parse(Buffer.concat(data).toString());
    console.log(xmlString);
    // xmlString = xml(xmlString);
    console.log(xmlString);

    for(let u2 of users) {
      console.log(`Got u2 with id: ${u2.id}, name: ${u2.name}`);
    }

    res2.type('application/xml');    
    res2.set('Content-Type', 'text/xml');
    res2.header('Content-Type', 'text/xml');
    // res2.type('application/json');    json doesnt need that line
    res2.send(xmlString);
    // res2.json(users);
  });
}).on('error', err => {
    console.log('Error: ', err.message);
});
}


// GET /user/signin
router2.get('/signin', (req, res) => {
    console.log("signin");    
    res.send("this is signin");
});

//user/afk/:name/:class 
router2.get('/afk/:name/:class', (req, res) => {
    console.log("afk");    
    // res.send("this is afk");
    return res.json({ name: req.params.name, id: req.params.class });
});