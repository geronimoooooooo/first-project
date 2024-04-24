/*
app.get('/', (req, res) => {
  res.send('Hello World!111')
})
*/
import { offers } from "./importer/LibRequireHelper.js";

export function routeDel(req, res) {
  var id = req.params.id;
  console.log(id);

  // offers.splice(id,1); //del at pos id 1 element

  let pos = offers.findIndex((obj) => obj.id == id);
  offers.splice(pos, 1); //del at pos id 1 element
  res.send(offers);
}

var users = [
  { id: 1, name: " Coder1" },
  { id: 2, name: " Coder2" },
  { id: 3, name: " Coder3" },
];

export function bros(req, res) {
  
  console.log(`used param ${req.params.id}`);
  if (req.query.name != undefined) {
    console.log(req.query.name);
  }  
  res.send(users);
  //res.json({user:'tobi', 1:1})
}
