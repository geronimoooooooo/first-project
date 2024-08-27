console.log("hello world");

let p1; // = null
p1 = null;
console.log(typeof p1);
console.log(p1);

// if(p1===undefined){
if(p1==undefined){
 console.log("undefined here");
}

if(p1===null) {
    console.log("null here");
}
const m1 = new Map();
m1.set(1, "1");
m1.set("2", 2);

m1.forEach(e=>console.log(e));
m1.forEach((k,v)=>console.log(`${k} and ${v}`));