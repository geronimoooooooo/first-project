const express = require('express')
// import 'express-async-errors'
const path = require('path')
const app = express()
app.use(express.static(path.join(__dirname, 'public')))
const port = 3001

console.log("hello world")
console.log(`dirname: ${__dirname}`)

var fs = require("fs");
var fileToRead = "text.txt";

const myLogger = function(req, res, next){
    console.log('new request...');
    next();
}

app.use(myLogger);
app.use(function (req, res, next) {
    console.log('Time: %s', new Date().toISOString())
    next()
  })


app.route('/read').get((req, res) => {
    fs.readFile(fileToRead, (err, data)=> {
        if (err) return console.error(err);
        console.log(data.toString());
        res.send(data.toString());
    });
    console.log("Program Ended");
})

function readMyFile(err,data){
    if (err) {  
        console.error('There was an error!', err);  
        return;  
      }  
      console.log(data.toString());  
}
app.route('/read2').get((req,res)=> {
    fs.readFile(fileToRead, readMyFile);
})


app.route('/a').get((req, res) => {
    var name = req.query.name;
    res.send(`this is a name: ${name} !`)
})

app.listen(port, (err) => {
    if (err) {
        console.log('Error: ', err)
    } else {
        console.log('Server is up on port: ', port)
    }
})