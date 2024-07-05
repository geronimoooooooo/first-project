//needs mongodb package

// const { MongoClient } = require("mongodb");
import { MongoClient } from "mongodb";
import { insertUser, insertIntoMongo } from "./inserts.js";


const url = "mongodb+srv://TestTest:TestTest@goldtrade.skpkklp.mongodb.net/";
var client = new MongoClient(url );
const dbName = "gold";
const collectionName = "start"
let db, collection, expenses;

async function getDataFromMongo(dbName2=dbName, collectionName2=collectionName){
    try {                
        await client.connect();

        db = client.db(dbName2)
        collection = db.collection(collectionName2);

        //Find the first document in the collection
        // const first = await collection.findOne();
        // console.log(first);
        
        const estimate = await collection.estimatedDocumentCount();
        console.log(`Estimated number of documents in the collection: ${estimate}`);    
        
        let query = {name: "Amy"}
        let results;

        results = await collection.find({}).limit(5).toArray();         
        // results = await collection.find(query, {projection: {name: 1}}).sort({_id:-1}).limit(2).toArray(); //last 2 recods because _id:-1 is reverse
        // results = await collection.find(query, {projection: {name: 1}}).sort({_id:-1}).limit(2).toArray(); //last 2 recods because _id:-1 is reverse
        console.log(results);
        
        // results = await collection.find({}).limit(2).sort({$natural:-1}).toArray(); //last 2 recods
        // console.log(results);
        
    } catch (error) {            
        console.log(error);    
    }finally {    
    	await client.close();
    }    
}



async function insertManyIntoMongo(params) {
    client.connect(url);    
    var dbo = client.db(dbName);
        var myobj = [
          { name: 'John', address: 'Highway 71'},
          { name: 'Peter', address: 'Lowstreet 4'},
          { name: 'Amy', address: 'Apple st 652'}       
        ];

    const stat = await dbo.collection(collectionName).insertMany(myobj, function(err, res) {
          if (err) throw err;
          console.log("Number of documents inserted: " + res.insertedCount);
          db.close();
        });
    console.log("-----> result: "+stat.insertedCount)
      client.close();
}
async function deleteFromMongo(params) {
    try {
        console.log("trying to delete...");
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);        

        // const first = await collection.findOne();
        // console.log(first);

        let removeIdsArray =[]
        let stat;
        // stat = await collection.deleteOne({title: "test1"});
        // console.log("deleted one docs: " + stat.deletedCount);

        // collection.find({}).limit(15).forEach(doc => 
        //     { 
        //       collection.remove({_id:doc._id})
        //     }
        //    )


        // stat = await collection.deleteMany({_id: { $in:(await collection.find({}).sort({ _id: -1 }).limit(4).toArray()).map(doc => doc._id) } })
        // console.log("deleted many docs: " + stat.deletedCount);

        
        // const lastDocs = await collection.find().sort({ _id: -1 }).limit(3).toArray(); // Find the last three documents
        // const deleteResult = await collection.deleteMany({ _id: { $in: lastDocs.map(doc => doc._id) } });
        // console.log(`${deleteResult.deletedCount} documents deleted.`);

        // Pull out just the _ids
        removeIdsArray = (await collection.find({}).sort({ _id: -1 }).limit(4).toArray()).map(doc => doc._id);
        stat = await collection.deleteMany({_id: {$in: removeIdsArray}});
        console.log( removeIdsArray);
        
        // removeIdsArray.push("6539b3f44a3597a63b433140")
        // console.log("deleteFromMongo");

        // collection.remove({_id: {$in: removeIdsArray}})
        // collection.remove({_id:removeIdsArray[0]}, function(err, result) { 
        //     (result === 1) ? console.log('Deleted') :console.log('Deleted '+err);
        // });
        // console.log(msg);
        // getDataFromMongo()

    } catch (error) {
        
    }finally{
        await client.close();
    }
}
async function listDatabases(){        
    let databasesList = await client.db().admin().listDatabases();    
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
    // client.close()
};
async function test3Awaits(dbName2=dbName, collectionName2=collectionName){
    try {                
        await client.connect();

        db = client.db(dbName2)
        collection = db.collection(collectionName2);
        
        const allItems = await collection.find({}).toArray();
        console.log(allItems);
        const namesBeginningWithS = await collection.find({ name: /^S/ }).toArray();
        const fiftyFiveYearOlds = await collection.find({ age: 55 }).toArray();

        // let [allItems, namesBeginningWithS, fiftyFiveYearOlds] = await Promise.all([
        //     collection.find({}).toArray(),
        //     collection.find({ name: /^S/ }).toArray(),
        //     collection.find({ age: 55 }).toArray()
        // ]);
        
    } catch (error) {            
        console.log(error);    
    }finally {    
    	await client.close();
    }    
    
}
async function getLastDocument(collectionName) {
  try {
    const client = new MongoClient(url);
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const query = {};
    const options = {
      sort: { _id: -1 }, // Sort by _id in descending order
      limit: 1 // Limit to 1 result
    };

    const result = await collection.find(query, options).toArray();

    await client.close();

    if (result.length === 0) {
      return null;
    }

    return result[0];
  } catch (error) {
    console.error('Error getting last document:', error);
    throw error;
  }
}

getLastDocument(collectionName)
  .then(document => {
    if (document) {
      console.log('Last document:', document);
    } else {
      console.log('No documents found');
    }
  })
  .catch(error => {
    console.error('Error getting last document:', error);
  });

// insertManyIntoMongo()
insertIntoMongo()
insertUser(client,"enterprise","employee");

// getDataFromMongo()
// deleteFromMongo()
 listDatabases(client);
// getDataFromMongo("sample_airbnb","listingsAndReviews")
// test3Awaits()