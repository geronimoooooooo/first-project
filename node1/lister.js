//import { default as sum } from "./module_helper.js";

//const help = require('./helper1.mjs')
//import sum from './helper1.mjs'



// 📁 main.js
//import {sayHi, sayBye} from './say.js';
//import * as myf from './say.js'

//myf.sayHi("Test");
// sayLib.sayHi('John'); // Hello, John!
// console.log(sayLib.add(4,15));



let now = new Date();
console.log( now.toISOString().slice(0,-6)+"Z");

let aa = "value";
const aMap = new Map();
aMap.set("a","1");
aMap.set("b", 222);
aMap.forEach((e)=>{
    console.log(e);
})

for(let [k,v] of aMap){
	console.log(`key: ${k} and val: ${v}`);
}

const ar = [0,1,2,3,4,5,6];
// ar.shift()
const ar2 = [5,6,7,8];
const ar3 = new Set([...ar, ...ar2]);
console.log(ar3);

const ar5 = ar.slice(ar.length-2)
console.log(ar);
console.log(ar5);

const arr = Array(4).fill(44);
arr.forEach((item)=>console.log(item));


ar2.forEach((item) => {
	console.log("item:"+item);
});

const fullStack = [
  ['HTML', 'CSS', 'JS', 'React'],
  ['Node', 'Express', 'MongoDB'],
	['Node2', 'Express2', 'MongoDB2']
];

const txt = JSON.stringify(fullStack);
console.log(txt);
console.log(fullStack);

for (const [k,v] of fullStack) {
	console.log(k, v);
}

const arr3 = [1000, 145, 88, 100];
console.log(arr3.sort());
console.log(arr3.sort((a,b)=> a-b));


//  const resourceMap = new Set(ar);
// resourceMap.forEach((item) => {
// 	console.log(item);
// });


// const ar3 = ar.splice(0, 2, [1000,10000]);
// ar3.forEach((item) => {
// 	console.log(item);
// });

