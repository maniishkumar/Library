var Express = require('express');
// var mysql      = require('mysql');
var sql = require('mssql');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');

var app = new Express();
var config = {
    server    : 'GDC-MANISHK-LPT\\SQLEXPRESS01',
    user      : 'sa',
    password  : 'Passw0rd!',
    database  : 'Books'
}

sql.connect(config, function(err){
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected');
});
var nav = [{
    Link: '/Books',
    Text: 'Books'
}, {
    Link: '/Authors',
    Text: 'Authors'
}];
//Routes
var bookRouter = require('./src/routes/bookRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);
var authRouter = require('./src/routes/authRoutes')(nav);


//PORT number on which application will run
var port = process.env.PORT || 3007;

app.use(Express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({secret: 'placetoreadandlearn'}));
require('./src/config/passport')(app);


app.set('views', './src/views');
app.set('view engine', 'ejs');


app.use('/Books', bookRouter);
app.use('/Admin', adminRouter);
app.use('/Auth', authRouter);

app.get('/', function(req, res) {
    //res.send('Hello world!');
    res.render('index', {title: 'Express', nav: [{
            Link: '/Books',
            Text: 'Books'
        }, {
            Link: '/Authors',
            Text: 'Authors'
        }]});
});

app.listen(port, function(err) {
    if (err) {
        console.log('Error: ' + err);
    }
    console.log('Listening on port: ' + port);
});
