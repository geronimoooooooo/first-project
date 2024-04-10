const e = require("express");
const lod = require('lodash')

function a1(){
//d1
let afk = Number("a");
console.log("afk is: "+afk + " type: "+ typeof afk);
let bro ="hey";
bro[0] ="A";
let name = null;
let number2 = 10;


const words2 ='He undefined earns 5000 euro from salary per month, 10000 euro annual bonus, 15000 euro online courses per month.'
const words ='1 1 a bb'
const arr = words2.split(' ')


let sum = 0;
for (let word of arr) {
    word = Number(word)
    console.log(typeof word +": "+ word);
    if(!lod.isNaN(word) && lod.isNumber(word)) {
            console.log(word);
            sum +=word;        
    }
}
console.log("sum: "+sum);
}

async function runProcess() {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.log(error);
    }
  }
  
  runProcess();

  fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(response => response.json())
  .then(json => {
    if (json.userId == 1) {
      json.completed == false;
    } else {
      json.completed == true;
    }
    console.log(json);
  })
  .catch(error => console.log(error));

// a1();

