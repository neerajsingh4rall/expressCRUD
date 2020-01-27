const mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost:27017/demoShopDB',{ 'useCreateIndex':true,
 useUnifiedTopology: true , 
 useNewUrlParser: true , 
 useFindAndModify: false,
 poolSize:10 },
 function(err)  {
     if(err){
         console.log('Cant connected to db')
     } 
     else {
         console.log('Connected to db');
     }
   });

  module.exports = mongoose;