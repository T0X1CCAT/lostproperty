var http = require('http');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');

mongoose.Promise = global.Promise;

//start mongo mongod -dbpath d:\\dev\\mongo\\bin\\data\\db
//start server on local win command line MONGO_DB_URL='mongodb://localhost/lostproperty' JWT_SECRET='DHNR65@SH' node index.js
//var mongoFunctions = require('./server/includes/mongo-functions');
var routes = require('./server/includes/config/routes');

require('./server/includes/config/passport');



//console.log('(__dirname',__dirname);
var rootPath = path.normalize(__dirname + '/public');

var env = process.env.NODE_ENV =process.env.NODE_ENV || 'dev';

var app = express();

app.set('port', process.env.PORT || 3000);
//app.set('views', path.join(__dirname, '/server/views'));
//app.set('view engine', 'jade'); 
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());



app.use(passport.initialize());

app.use('/', routes);

// app.use(function (req,res) { //1
//     res.render('404', {url:req.url}); //2
// });


// app.use(function (err, req, res, next) {
//   console.log('use');
//   if (err.name === 'UnauthorizedError') {
//     res.status(401);
//     res.json({"message" : err.name + ": " + err.message});
//   }
// });

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});



