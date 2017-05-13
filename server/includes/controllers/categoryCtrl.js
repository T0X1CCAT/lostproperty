
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Category = mongoose.model('Category');
var mongoFunctions = require('../mongo-functions');

module.exports.getCategoryList = function(req, res) {

  if (!req.payload._id) {
    console.log('payload id not found');
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } 
  
  else {
     console.log('payload id found', req.payload._id);
    User
      .findById(req.payload._id)
      .exec(function(err, user) {
          console.log('list cats');
          mongoFunctions.listCategories( 
            function(categories){
                res.json(categories);
            });
        
      });
  }

};

module.exports.addCategory = function(req, res) {

  var ok={status:'ok'}; 
  if (!req.payload._id) {
    console.log('payload id not found');
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } 
  
  else {
    mongoFunctions.insertCategory(req, res, function(exists){
      if (exists){
        ok = {status:'name_exists'};
        res.json(ok);
      }else{
        ok = {status:'ok'};
        res.json(ok);
      }

    });
  } 
};