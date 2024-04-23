const libRequireHelper = require('./LibRequireHelper');
//const { add, subtract, num } = require("./lib");
const msg = require('./msg');

msg.sayThanks();
console.log(msg.sayHello);


console.log("text "+ libRequireHelper.PI);
libRequireHelper

const result = libRequireHelper.add(1,10);
console.log(result);
console.log(libRequireHelper.PI);