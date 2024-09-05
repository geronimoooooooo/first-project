import express from "express";
import { Router } from "express";

const routerBirds = Router(); //express.Router()


const timeLog = (req,res,next) =>{
    console.log("time: ", Date.now())
    next()
}

routerBirds.use(timeLog)

routerBirds.get("/", (req,res)=>{
    res.send("you like birds!");
})

routerBirds.get("/where", (req,res)=>{
    res.send("birds everywhere!");
})

export default routerBirds;