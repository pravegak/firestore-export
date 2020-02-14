const firebaseAdmin = require('firebase-admin');
const { Parser } = require('json2csv');
const serviceAccount = require('./config/serviceAccountKey.json');

let databaseURL = process.argv[2];
let collectionName = process.argv[3];

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: databaseURL
});

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
  })
  .catch(error => {
    console.log(error);
  })

results.then(dt => {
  const parser = new Parser();
  process.stdout.write(parser.parse(data));
});