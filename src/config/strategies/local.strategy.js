var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    mongodb = require('mongodb').MongoClient;

module.exports = function () {
  console.log('We are in local Strategy Module');
	var url = 'mongodb://localhost:27017/';
    passport.use(new LocalStrategy({
            usernameField: 'userName',
            passwordField: 'password'
        },
        function (username, password, done) {
            console.log('We are in local Strategy');
            mongodb.connect(url, function (err, client) {
				          var db = client.db('library');
                  var collection = db.collection('users');
                  collection.findOne({
                          username: username
                      },
                      function (err, results) {
                          if(err){
                            console.log(err);
                          }
                          console.log('User: ', results);
                          if (results.password === password) {
                              var user = results;
                              done(null, user);
                          } else {
                              done(null, false, {message: 'Bad password'});
                          }

                      }
                  );
            });
        }));
};
