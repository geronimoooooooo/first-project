// 📁 say.js
 function sayHi(user) {    
    console.log(`Hello, ${user}!`);
  }
  
 function sayBye(user) {
    console.log(`Bye, ${user}!`);
  }
  
  function add(x, y){
    return x+y
  }
// module.exports = {sayHi, sayBye,  add};  //for require
export {sayHi, sayBye, add} //import  * as say from "../node1/say.js";

  //console.log(add(4,15));
  //export {sayHi, sayBye}; // a list of exported variables