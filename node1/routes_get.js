
import path from "path";
// const path  = ('path');
import { fileURLToPath } from "url";
// const fileURLToPath = require('url');
import { offers } from "./importer/LibRequireHelper.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * The hello function logs a message to the console.
 * @param req - The `req` parameter is an object that represents the HTTP request made by the client. It contains
 * information such as the request method, headers, URL, and body.
 * @param res - The `res` parameter is the response object that is used to send a response back to the client. It contains
 * methods and properties that allow you to control the response, such as setting the status code, headers, and sending the
 * response body.
 */
export function hello(req, res){
    console.log(`this is hello function`);
    res.send(`hello XY`);
}

export function index3(req, res){
    console.log("this is function index3");
    let file = path.join(__dirname + '/index3.html');
    res.sendFile(file);
}

export function routeDel(req, res) {
    var id = req.params.id;
    console.log(id);
  
    // offers.splice(id,1); //del at pos id 1 element
  
    let pos = offers.findIndex((obj) => obj.id == id);
    offers.splice(pos, 1); //del at pos id 1 element
    res.send(offers);
  }
  
  const users = [
    { id: 1, name: " Coder1" },
    { id: 2, name: " Coder2" },
    { id: 3, name: " Coder3" },
  ];
  
  export function bros(req, res) {  
    console.log(`used param ${req.params.id}`);
    if (req.query.name != undefined) {
      console.log(req.query.name);
    }  
    res.send(users);
    //res.json({user:'tobi', 1:1})
  }
  
// exports = {hello};
