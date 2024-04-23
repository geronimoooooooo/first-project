//remove from package.json "type": "module",

function sayHi(user) {
  console.log(`Hello, ${user}!`);
}

function sayBye(user) {
  console.log(`Bye, ${user}!`);
}

function add(x, y) {
  return x + y
}
const PI = 3.14159;

const offers =[{"id":0,"name":"Item 0","price":"$0"},{"id":1,"name":"Item 1","price":"$1"},{"id":2,"name":"Item2","price":"$222"}]

function adder(req, res) {
  const offer = {"id":110,"name":"Item 110","price":"$110"};
  console.log(offer);
  offers.push(offer);
  res.json(offer);
}

//exports = { sayHi, add, PI };
function routeGetOfferList(req, res) {
  offers = [
    {
      serverOffer: "Venoxis",
      serverWant: "Blackhand",
      offerGold: 5000,
      wantGold: 5000,
    },
    {
      serverOffer: "Venoxis2",
      serverWant: "Blackhand2",
      offerGold: 50002,
      wantGold: 50002,
    }
  ];  
  res.json(offers);
  // res.send(offers);
}

  //console.log(add(4,15));
  module.exports = {sayHi, sayBye, add, PI}; // a list of exported variables