const express = require( 'express' )
// import express from 'express'
const app = express()
const port = process.env.PORT || 1024

app.get('/', (req, res) => {
    res.type('text/plain')
    res.send('Thanks for reading')
})

app.listen(port, console.log(`http://127.0.0.1:${port}`))