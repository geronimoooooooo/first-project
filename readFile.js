// const {users} = require('./public/users.json')

import users from './public/users.json' assert {type: "json"};
// console.log(users);

let names = users.users.find((e=> e.name=="John"))
console.log(names.id)

import { readFile } from 'fs/promises';
let jsonObj = JSON.parse(await readFile("./public/users.json", "utf8"));

console.log(jsonObj);

names = jsonObj.users.find((e=> e.name=="Doe"))
console.log(names.id)

// let data = require('./public/users.json')
// console.log(data);

console.log("fin");