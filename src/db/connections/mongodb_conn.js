


/* const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://dbUser:<password>@szcluster.hz9s4jb.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
}); */


/*  */
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const username = encodeURIComponent("dbUser");
const password = encodeURIComponent("s0q9fo3SiWt9KTnh");
// const cluster = "SZCluster";
const cluster = "szcluster.hz9s4jb.mongodb.net";
// const authSource = "<authSource>";
// const authMechanism = "<authMechanism>";

// let uri = `mongodb+srv://${username}:${password}@${cluster}/?authSource=${authSource}&authMechanism=${authMechanism}`;

let uri = `mongodb+srv://${username}:${password}@${cluster}/?retryWrites=true&w=majority`;
// let uri =  `mongodb://localhost:27017/`

// console.log(uri);

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function mongoCollection(dbName, collectionName) {
  
  try {
    
    client = await client.connect();

    const database = client.db(dbName);// e.g. globomantics db
    const collectionObj = database.collection(collectionName);//e.g. sessions collection

    /* Return a collection */
    const cursor = collectionObj.find();
    await cursor.forEach(doc => console.dir(doc));
    
    /* Return a single item */
    // const session = await sessions.findOne(new ObjectId('62ab1ebfa3618655cc1b7f89'));
    // const session = await sessions.findOne({id: 80310});
    // console.dir(session);

    return collectionObj;
    
  } 
  catch(error) {
    debug(error.stack);
  }
  finally {
    // await client.close();// Don't close the connection, MongoClient will manage the connections from the pool
  }
}
// mongoConnector().catch(err => console.log(err));

module.exports = {mongoCollection, client};