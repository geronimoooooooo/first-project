import express from 'express';
const routerParam = express.Router();

routerParam.param("userId", (req, res, next, id) => {
    console.log("This function will be called first");
    next();
});
 
routerParam.get("/user/:userId", (req, res) => {
    console.log("Then this function will be called with userId: ", req.params.userId);
    res.send(`your id: ${req.params.userId}`);
});


// route middleware to validate :name
routerParam.param('name', function(req, res, next, name) {
    // do validation on name here
    // blah blah validation
    // log something so we know its working
    console.log('doing name validations on ' + name);
  
    // once validation is done save the new item in the req
    req.name = name;
    // go to the next thing
    next();
  });
  
  // route with parameters (http://localhost:8080/hello/:name)
  routerParam.get('/hello/:name/:age', function(req, res) {
    res.send('hello ' + req.name + '!' + req.params.name + ' '+req.params.age);
  });


// Export router 
export default routerParam;