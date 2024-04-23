import https from "https"
import express from "express"
import fs from "fs"


const app = express()
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
//#endregion

const credentials = {
    pfx: fs.readFileSync('sslcert/STAR_researchstudio_at.pfx')
  };
  
var httpsServer = https.createServer(credentials, app);
 
  // httpServer.listen(80, () => {
  //     console.log('HTTP Server running on port 80');
  // });
  

const port = process.env.PORTHTTPS || 443
  
httpsServer.listen(port, (err) => {
  if(err){
    console.log(new Date().toISOString()+` https server could not start on port: ${port}`);
  }else{
    console.log(new Date().toISOString()+` https server running on port: ${port}`);
  }
});
  