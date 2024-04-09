//needs mongodb package

// const { MongoClient } = require("mongodb");
import { MongoClient } from "mongodb";


const url = "mongodb+srv://TestTest:TestTest@goldtrade.skpkklp.mongodb.net/";
var client = new MongoClient(url );
const dbName = "gold";
const collectionName = "start"
let db, collection, expenses

async function getDataFromMongo(){
    try {                
        await client.connect();

        db = client.db(dbName)
        collection = db.collection(collectionName);

        //Find the first document in the collection
        // const first = await collection.findOne();
        // console.log(first);
        
        const estimate = await collection.estimatedDocumentCount();
        console.log(`Estimated number of documents in the collection: ${estimate}`);    
        
        let query = {name: "Amy"}
        let results;
        // let results = await collection.find({}).limit(2).toArray();         
        results = await collection.find(query, {projection: {name: 1}}).sort({_id:-1}).limit(2).toArray(); //last 2 recods because _id:-1 is reverse
        console.log(results);
        
        // results = await collection.find({}).limit(2).sort({$natural:-1}).toArray(); //last 2 recods
        // console.log(results);
     
        
    } catch (error) {            
        console.log(error);
    
    }finally {
    // Close the database connection when finished or an error occurs
    	await client.close();
    }    
}

async function insertIntoMongo() {
 	try {
 		await client.connect();
 		const db = client.db(dbName);
 		const collection = db.collection(collectionName);
       
 		const insert = await collection.insertOne({
            title:"lasts2",
 			// title: "Post Title 1",
 			// body: "Body of post.",
 			// category: "News",
 			// likes: 1,
 			// tags: ["news", "events"],
 			date: Date(),
 		});        

        let insert2Content = {name: "Bro2", address: "Hood2"};
        const insert2 = await collection.insertOne(insert2Content);

        results = await collection.find().sort({_id:-1}).limit(2).toArray(); //last 2 recods
        console.log(results);

        const estimate = await collection.estimatedDocumentCount();
        console.log(`Estimated number of documents in the collection: ${estimate}`);    
    } catch (error) {            
    
    }finally {
    // Close the database connection when finished or an error occurs
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
};

// insertManyIntoMongo()
// insertIntoMongo()

// getDataFromMongo()
// deleteFromMongo()
// getDataFromMongo()
listDatabases(client);