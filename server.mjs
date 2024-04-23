import https from "https"
import express from "express"
import fs from "fs"


const app = express()

app.get('/' , (req , res)=>{
   res.send('hello from simple server :)')
})

app.get('/a' , (req , res)=>{
  res.send('aaaaaa   simple server :)')
})

//#region https
// const httpsServer = https.createServer({
//     key: fs.readFileSync('privateKey.key'),
//     cert: fs.readFileSync('certificate.crt'),
//   }, app);

// var privateKey  = fs.readFileSync('sslcert/privateKey.key', 'utf8');
// var certificate = fs.readFileSync('sslcert/certificate.crt', 'utf8');

// var credentials = {key: privateKey, cert: certificate};

/* const credentials = {
    key: fs.readFileSync('sslcert/privateKey.key'),
    cert: fs.readFileSync('sslcert/certificate.crt')
  };
*/

/**************** https:  use this on vm04

****************************/
//#endregion
const credentials = {
  pfx: fs.readFileSync('sslcert/STAR_researchstudio_at.pfx')
};

const portHTTPS = process.env.PORTHTTPS || 443

const httpsServer = https.createServer(credentials, app);


// const port = process.env.PORT || 3000
// app.listen(port, ()=>{
//   console.log(`browse this url: localhost:${port}`);  
// });

httpsServer.listen(portHTTPS, (err) => {
if(err){
  console.log(new Date().toISOString()+` https server could not start on port: ${portHTTPS}`);
}else{
  console.log(new Date().toISOString()+` https server running on port: ${portHTTPS}`);
}
});

  


  