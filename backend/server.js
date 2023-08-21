const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const MongoClient = require('mongodb').MongoClient;

const MONGO_URL = 'mongodb://keatonS:200305082@18.116.57.165:27017/goStudy';
const client = new MongoClient(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
    if (err) throw err;
    console.log("Connected to MongoDB");
});

app.get('/test', (req, res) => {
  res.send('Hello, World!');  // A simple test endpoint
});

const db = client.db('goStudy');

app.get('/getData', (req, res) => {
  const collection = db.collection('your_collection_name');
  collection.find({}).toArray((err, data) => {
      if (err) throw err;
      res.json(data);
  });
});
