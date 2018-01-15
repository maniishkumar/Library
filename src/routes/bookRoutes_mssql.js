var express = require('express');
var sql = require('mssql');
var bookRouter_mssql = express.Router();



var router_mssql = function(nav){
var books = [
  {
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

bookRouter_mssql.route('/')
  .get(function(req, res) {
    var resultsets = [];

     var request = new sql.Request();
    request.query('SELECT * from books', function (error, recordset) {
      if (error) {
        console.log('Error is: ', error);
      };
      res.render('bookListView',
      {
        title: 'Books',
        nav: nav,
        books: recordset.recordset,
        
      });
    });
    
    });
  bookRouter_mssql.route('/:id')
    .all(function(req, res, next){
      var ps = new sql.PreparedStatement();
      ps.input('id', sql.Int);

      ps.prepare('select * from books where id=@id', function(err){
        ps.execute({id: req.params.id}, function(err, recordset){
         if(err){
           res.status(500).send('Server error: ' + err);
         } else if(recordset.recordset.length === 0) {
            res.status(404).send('Book not found');
         } else {
           req.book = recordset.recordset[0];
           next();
         }
        })
      })
    })
    .get(function(req, res){
      res.render('bookView', {
        title: 'Book Details',
        nav: nav,
        book: req.book
      })

    });
  return bookRouter_mssql;
}

module.exports = router_mssql;
