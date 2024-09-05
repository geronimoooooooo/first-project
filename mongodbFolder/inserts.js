
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
            date: new Date().toUTCString(),
        });        

       let insert2Content = {name: "Bro2", address: "Hood2"};
       // const insert2 = await collection.insertOne(insert2Content);

       let results = await collection.find().sort({_id:-1}).limit(2).toArray(); //last 2 recods
       console.log(results);

       const estimate = await collection.estimatedDocumentCount();
       console.log(`Estimated number of documents in the collection ${collectionName}: ${estimate}`);    
   } catch (error) {            
   console.log(error);
   }finally {
   // Close the database connection when finished or an error occurs
       await client.close();
   }    
}

async function insertUser(client, dbName, collectionName) {
    try {
        console.log("Inserting user...to "+dbName+"."+collectionName);
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
      
        const insert = await collection.insertOne({
           title:"user1",
            // title: "Post Title 1",
            // body: "Body of post.",
            // category: "News",
            // likes: 1,
            // tags: ["news", "events"],
            toUTCString: new Date().toUTCString(),
            toISOString: new Date().toISOString(),
            date: new Date(),
            toLocaleDateString: new Date().toLocaleDateString(),
            toLocaleTimeString: new Date().toLocaleTimeString()
        });        

       let insert2Content = {name: "Bro2", address: "Hood2"};
       // const insert2 = await collection.insertOne(insert2Content);

       let results = await collection.find().sort({_id:-1}).limit(2).toArray(); //last 2 recods
       console.log(results);
       console.log(`results: ${results}`);

       const estimate = await collection.estimatedDocumentCount();
       console.log(`Estimated number of documents in the collection ${collectionName}: ${estimate}`);    
   } catch (error) {       
    console.log(error);     
   
   }finally {
   // Close the database connection when finished or an error occurs
    //    await client.close();
   }    
}

export {insertUser, insertIntoMongo}