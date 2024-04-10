const express = require('express');
// const mong = require('./mongo.js');
const app = express();

app.get('/main', (req, res) => {
    res.send('main here');
});

app.get('/', (req, res) => {
    res.send('Hello World2222222!');
});

const { MongoClient } = require("mongodb");
const url = "mongodb+srv://TestTest:TestTest@goldtrade.skpkklp.mongodb.net/";
var client = new MongoClient(url);
let db, trips, expenses
client.connect()

app.get('/mongo', async (req, res) => {

    db = client.db("gold")
    trips = db.collection("start");
    const estimate = await trips.estimatedDocumentCount();
    console.log(`Estimated number of documents in the movies collection: ${estimate}`);

    let results = await trips.find({})
    .limit(2)
    .toArray();

    console.log(results);
    
    // res.status(200).json({ trips: results })
    res.send(results).status(200); //geht auch

    // trips.find().toArray((err, items) => {
    //     console.log("test"); 
    //     if (err) {
    //         console.error(err)
    //         res.status(500).json({ err: err })
    //         return
    //     }
    //     res.status(200).json({ trips: items })
    //   })

    // MongoClient.connect(url, function(err, db) {
    //     // if (err) throw err;
    //     console.log("test");
    //     var dbo = db.db("gold");
    //     dbo.collection("start").find({}).toArray(function(err, result) {
    //       if (err) throw err;
    //       console.log(result);
    //       db.close();
    //     });
    //   });

    // res.send("this is mongo website.");
});

// const middleWare = require('middleWare');
// const MONGO = require('mongodb').MongoClient;
// const url = "mongodb+srv://TestTest:TestTest@goldtrade.skpkklp.mongodb.net/";

// router.get('/m', middleWare(async (req, res, next) => {
//     const db = await MONGO.connect(url);
//     const MyCollection = db.collection('MyCollection');
//     const estimate = await collection.estimatedDocumentCount();
// 		console.log(`Estimated number of documents in the movies collection: ${estimate}`);
//     // const result = await MyCollection.find(query).toArray();
//     res.send(result);
// }))

app.listen(3000, () => {
    console.log('Example app listening on port port 3000!');
});

//Run app, then load http://localhost:port in a browser to see the output.npm
