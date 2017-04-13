var http = require('http');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var mongoFunctions = require('./server/includes/mongo-functions');

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

mongoose.connect('mongodb://localhost/lostproperty');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection errro...'));

db.once('open', function callback(){
  console.log('lost property db opened');
});



app.get('/category', function(req, res){
  var categories = mongoFunctions.listCategories( db, 
    function(categories){
      res.json(categories);
    });
  
  
});

app.post('/category', (req, res) => {
  console.log('post received');
  mongoFunctions.insertCategory(req, res, db);
  var ok = {status:'ok'};
  res.json(ok);
})

app.get('*', function(req, res){res.sendFile(rootPath + '/index.html');});

// app.use(function (req,res) { //1
//     res.render('404', {url:req.url}); //2
// });

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


