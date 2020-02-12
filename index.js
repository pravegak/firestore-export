const firebaseAdmin = require('firebase-admin');
const { Parser } = require('json2csv');
const serviceAccount = require('./config/serviceAccountKey.json');
const fs = require('fs');

let databaseURL = process.argv[2];
let collectionName = process.argv[3];

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: databaseURL
});

console.log(`retrieving data from ${collectionName} collection`)

let db = firebaseAdmin.firestore();
db.settings({ timestampsInSnapshots: true });

let data = [];

let results = db.collection(collectionName)
  .get()
  .then(snapshot => {
    snapshot.forEach(doc => {
      let document = doc.data();
      let date;
      let timestamp = document.timestamp || document.timeStamp
      if (timestamp) {
        date = timestamp.toDate().toISOString();
      }

      delete document["timestamp"]
      delete document["timeStamp"]

      document["timestamp"] = date;
      data.push(document);
    })
    return data;
  })
  .catch(error => {
    console.log(error);
  })

results.then(dt => {
  console.log(`writing ${collectionName} collection to file.`)
  const parser = new Parser();
  fs.writeFile("export.csv", parser.parse(data), function (err) {
    if (err) {
      return console.log(err.message);
    }
    console.log("file was successfully saved!");
  });
});