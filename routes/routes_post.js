
// const router = require('express').Router()
import  express, { response } from "express";
import { offers } from "../node1/importer/LibRequireHelper.js";

export const routerVar = express.Router();


// module.exports  = router

export function formComments(req, res){
    const {pets} = req.body;
    if(pets){
        console.log(pets);
    }
    const userName = req.body.userName;
    const comment = req.body.textAreaComment;
    console.log("username: "+userName + " with comment: "+comment);

    console.log('this is form: '+ JSON.stringify(req.body));
    res.send('this is form '+ JSON.stringify(req.body));
}

export function getDataFromForm2(req, res){
    const {food} = req.body; //form field has name="food"    
    const sel = req.body.sel;
    const rad = req.body.exampleRadios;
        
    console.log(sel);    
    if(food)
    if (food.includes('meat')){
        console.log("you got dog!");
    }
    console.log("req.body"+ req.body); //req.body has all form elements as json, aber mit String steht nur Obj Obj
    // console.log(req.body); //req.body has all form elements as json
    // req.body.field = Boolean(req.body.field)

    let check_dog = Boolean(req.body.check_dog);
    if(check_dog)
    console.log( "req.body.checkbox1: "+req.body.check_dog);

    let check_cat = Boolean(req.body.check_cat);
    if(check_cat)    
    console.log( "req.body.cat: "+req.body.check_cat);
    
    // object = {
    //     first: req.body.first_name ? true : false,
    //     second: req.body.2 ? true : false,
    //     third: req.body.3 ? true : false
    // };
    const form = {  
        first:req.body.first_name,  
        last:req.body.last_name,
        selector: req.body.sel        
    };  
    console.log(JSON.stringify(form) + ", " +form.first+ ", "+ JSON.stringify(req.body));  
    
    // res.send({
    //     'user_id': user_id,
    //     'token': token,
    //     'geo': geo
    //   });

    offers.push({
        'id':req.body.first_name,
        'name':req.body.last_name,
        'price':req.body.price
    });
    // console.log(offers);
  
    // res.end(JSON.stringify(response));  
    // if(pet)
    // pet.forEach((item) => {
    //     console.log(item);
    // });

    const foodlist = req.body.food;
    console.log(foodlist);
    let radio = req.body.list_radio;
    console.log(radio);
    radio = req.body.exampleRadios;
    console.log(radio);
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    res.send(form);
    return
    
    const dairy = req.body.dairy_name === 'on';
    
    const celcius = req.body.celcius;

    if (req.body.meat) {
        console.log("meat true");
    } else {
        console.log("meat false");
    }

    // Check if checkbox1 is checked
    const checkbox1Checked = req.body.checkbox1 === 'on';

    // Check if checkbox2 is checked
    const checkbox2Checked = req.body.checkbox2 === 'on';
    if((req.body.food != undefined) && (listFood.includes('meat'))) {
        console.log("meat is checked");
    } else {
        
    }
        
    const meat = req.query.meat;
    if(req.query.meat === undefined){
        console.log("true 1meat ist: "+ meat);
    }else{
        console.log("false 1meat ist: "+ meat);
    }

    console.log( "req.body.checkbox1: "+req.body.checkbox1);
    console.log( "req.body.checkbox2: "+req.body.checkbox2);
    console.log( "req.body.dairy: "+req.body.dairy);    
    console.log(`This is ${first_name} with ${last_name} with ${checkbox1Checked} with ${checkbox2Checked}.`);
    console.log("this is first: "+first_name + " dairy: "+ dairy + " whole checked list: "+ req.body.food);
    // res.send(`Checkbox 1 checked: ${checkbox1Checked}, Checkbox 2 checked: ${checkbox2Checked}`);
    res.send(`This is ${first_name} with ${last_name} with ${dairy}..`);
   }

   