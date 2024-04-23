const express = require( 'express' )
// import express from 'express'
const app = express()

const hostname = '127.0.0.1';
const port = process.env.PORT || 3000

app.get('/', (req, res) => {    
    res.type('text/plain')
    res.send('Express World!')
})

app.listen(port, hostname, ()=>{
    console.log("browse this url");
    console.log(`${hostname}:${port}`)
});


