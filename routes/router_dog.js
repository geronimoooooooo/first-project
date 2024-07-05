import express from "express";
const routerRouter = express.Router();

routerRouter.get('/' , (req , res)=>{
    res.send("you love routes.")
})

routerRouter.get('/routes' , (req , res)=>{
    res.send("many routes.")
})

export default routerRouter