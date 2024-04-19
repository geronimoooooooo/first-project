const { MongoClient } = require("mongodb");

const url = "mongodb+srv://TestTest:TestTest@goldtrade.skpkklp.mongodb.net/";
const client = new MongoClient(url);
const dbName = "gold";
const collectionName = "start";

function go1(){
	console.log("test3");
MongoClient.connect(url, function(err, db) {
	// if (err) throw err;
	if(err){
		console.log("error "+err.message);
	}else{
		console.log("no error");
	}
	var dbo = db.db(dbName);
		const estimate = collectionName.estimatedDocumentCount();
		console.log(`Estimated number of documents in the movies collection: ${estimate}`);

	dbo.collection(collectionName).find({}).toArray(function(err, result) {
	  if (err) throw err;
	  console.log(result);
	  db.close();
	});
  });
}
console.log("test");
go1();
console.log("test2");



