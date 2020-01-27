const UserSchema = require('../models/userschema');
const unique = require('../utils/unique');
const encrypt = require('../utils/encrpt');
const jwt = require('../utils/tokenjwt');
const winston = require('../utils/winston');
const changePassword = require('../utils/templates/changepassword');
const deleteAccount = require('../utils/templates/deleteaccount');

const userOperations = {
    add(userObject){
     userObject.password = encrypt.generateHash(userObject.password);
     userObject.genid = unique();   
     const promise = UserSchema.create(userObject);
     return promise;
    },
    search(uobj,res){
    res.set({"Content-Type": "application/json"});
    console.log('search is',uobj);
    UserSchema.findOne({"userid":uobj.userid , "email":uobj.email},(err,doc)=>{
    
    if(err){
        res.json({'message':'Error During Login','error':err});
        console.log('error in search is',err);
        // res.send('Error During Login '+err);
    }
    else {
        if(doc){
            if(encrypt.compareHash(uobj.password,doc.password)){
                var token = jwt.generateToken(uobj.userid,uobj.email);
                res.render('login.ejs',{"userid":doc.userid});
                res.set({'Content-Type': 'application/json'});
                res.json({'message':'Welcome','userid':doc.userid ,'email':doc.email,'token':token});
                console.log('Welcome ',doc.userid);
                winston.debug('userid id '+doc.userid);
                // res.send('Welcome '+doc.userid);
                // res.render('dashboard.ejs',{'name':doc.name , 'userid':doc.userid , 'email':doc.email});
            }
            else {
                res.render('invalid.ejs');
                res.set({'Content-Type': 'application/json'});
                res.json({'message_1':'Invalid Userid or Password'});
                console.log('message_1','Invalid Userid or Password');
                winston.error('Credentials Not Matched');
                // res.send('Invalid Userid or Password');
                // res.render('invalid.ejs',{'name':'Invalid Userid or Password'});
            }
        }
        else {
            res.render('invalid.ejs');
            res.set({'Content-Type': 'application/json'});
            res.json({'message_2':'Invalid Userid or Password'});
            console.log('message_2','Invalid Userid or Password');
            winston.error('Credentials Not Matched');
            // res.send('Invalid Userid or Password');
            // res.render('invalid.ejs',{'name':'Invalid Userid or Password'});
        }
    }
    });
    // console.log("db",resUser)
    // return resUser;
    },
    delete(uObj,res){
        res.set({"Content-Type": "application/json"});
        console.log('delete userid  is',uObj);
        UserSchema.findOneAndRemove({"userid":uObj.userid , "email":uObj.email},(err,doc)=>{
           if(err){
            res.json({'message':'Error During Delete Account','error':err});
            console.log('Error During Delete Account is ',err);
           }else
           if(doc) {
               deleteAccount(doc.email,doc.userid);
               res.render('delete.ejs');
            res.json({'message':'Account Deleted Successfully','doc':doc});
            console.log('Account Deleted Successfully ',doc.userid);
           }else {
            res.render('invalid.ejs');
            res.json({'message':'Error in Deletion Userid not found'});
            console.log('Error in Deletion Userid not found');
           }
        });
    },
    update(uObj,res){
        res.set({"Content-Type": "application/json"});
        console.log('updation password  is',uObj.password);
        uObj.password = encrypt.generateHash(uObj.password);
        UserSchema.findOneAndUpdate({"userid": uObj.userid }, {"password": uObj.password},{"email": uObj.email},(err,doc)=>{
            console.log('Inside Updation ',uObj.password);
            if(err){
             res.json({'message':'Error in Updation of Password and Userid','error':err});
             console.log('Error in Updation of Password and Userid ',err);
            }
            else
            if(doc) {
                changePassword(doc.userid , doc.password , doc.email);
             res.json({'message':'Password Updated Successfully','doc':doc});
             console.log('Password Updated Successfully ',doc);
            }else {
                res.json({'message':'Userid and Password not found'});
                console.log('Userid and Password not found ',doc); 
            }
         });
    }
}
module.exports = userOperations;