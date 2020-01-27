const mongoose = require('../db/connection');
const userSchema = new mongoose.Schema({
    'userid':{type:String, required:true, unique:true},
    'password':{type:String, required:true},
    'name':{type:String, required:true, maxlength:20, minlength:3},
    'genid':{type:String},
    'email':{type:String, required:true},
    'isVerify':{type:String, default:'N'}
});
module.exports = mongoose.model('users',userSchema);