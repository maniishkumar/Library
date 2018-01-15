var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var books = [{
    title: 'Ramayan',
    author: 'Tulsidas',
    genre: 'Devotional',
    read: false
  },
  {
    title: 'Geeta',
    author: 'Maharshi Vyas',
    genre: 'Devotional',
    read: false
  },
  {
    title: 'The monk who sold his ferari',
    author: 'Robin Sharma',
    genre: 'Motivational',
    read: false
  },
  {
    title: 'Think and grow rich',
    author: 'Nepolian',
    genre: 'Self-improvement',
    read: false
  }
]

var router = function (nav) {
    adminRouter.route('/addBooks')
    .get(function (req, res) {
        var url = 'mongodb://localhost:27017';
        mongodb.connect(url, function (err, client) {

            var db = client.db('library');

            var collection = db.collection('books');
            // Insert some documents
            collection.insertMany(books, function (err, result) {

                console.log('Inserted " + books.length + " documents into the collection');
                res.send(result);
                client.close();
            });
        });
    });

    return adminRouter;
};

module.exports = router;