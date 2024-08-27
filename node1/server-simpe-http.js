// const express = require( 'express' )
import express from 'express'
const app = express()

// const hostname = '127.0.0.1';
const port = process.env.PORT || 3000

app.get('/', (req, res) => {        
    res.send('Express World!')
})

app.listen(port, ()=>{    
    console.log(`browse this url http://localhost:${port}`)
});


