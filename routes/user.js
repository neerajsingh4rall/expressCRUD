const express = require('express');
const userRoutes = express.Router();
const mail = require('../utils/mail');
const protectRoute = require('../utils/jsonwebtoken');
const winston = require('../utils/winston');
const multer = require('multer');

userRoutes.post('/register',(req,res)=>{
const userOperations = require('../helpers/useroperation');
let promise = userOperations.add({'name':req.body.name, 'userid':req.body.userid, 'password':req.body.password, 'email':req.body.email});
promise.then(data=>{
    // res.status(200).send('Register Successfull  '+data.userid);
    mail(data.name,data.userid,data.email,res);
    console.log('Data of Registration is  '+data);
    res.render('register.ejs', {"name": data.name,"userid":data.userid,"email":data.email});
    
   
}).catch(err=>{
    console.log('Error in Registration is',err);
    winston.error('Error in Registration is',err);
    res.status(500).send('Error during Registration',err);
})
});

userRoutes.post('/login',(req,res)=>{
    console.log('body is ',req.body);
    const userOperations = require('../helpers/useroperation');
    userOperations.search(req.body,res);
    // let promise = userOperations.search(req.body);
    // promise.then(data=>{
    //     res.status(200).send(data.userid+' You Successfully Login');

    //     //  res.status(200).render('dashboard');
      
    // }).catch(err=>{
    //     res.status(500).send('Error during Login',err);
    // })

});

const storage = multer.diskStorage({
    destination : function(req,file,cb){
      return cb(null,'./uploads');
    },
    filename : function(req,file,cb){
        return cb(null, new Date().toISOString() + " , " + file.originalname);
    }
});
const fileFilter = (req,file,cb)=>{
    // if(file.mimeType === 'image/jpeg' || file.mimeType === 'image/png' || file.mimeType === 'image/jpg') {
        if(file.mimeType !== 'image/pdf' || 'image/doc' || 'image/docx') {
        return cb(null,true);
    }else {
        return cb(new Error('Only jpeg , jpg , png files'),false);
    }
}
const fileSize = (req,res,cb)=>{
    if(fileSize == '1024 * 1024 * 5') {
        console.log('file within given limit');
        return cb(null,true);
    }else {
        return cb(new Error('Out of given limit'),false);
    }
}
const upload = multer({
    storage: storage ,
    limits: {
    fileSize: fileSize
},  fileFilter: fileFilter
});

var uploading = upload.single('idImage');
userRoutes.post('/productupload',protectRoute,(req,res)=>{
    uploading(req,res,(err)=>{
  if(err){
      res.send('error while uploading file');
      console.log('error while uploading file',err);
  }
  else {
    console.log('req.file is ',req.file);
    res.send('File Uploaded Successfully');
  }
})
});

// userRoutes.post('/product',upload.single('idImage'),(req,res,next)=>{
// console.log('file Request',req.file);
// res.send('file uploaded.....');
// next();
// });

userRoutes.get('/redirecteg2',(req,res)=>{
    console.log('i am in redirecteg2');
    res.send('Redirect2 Route');
});
userRoutes.get('/redirecteg',(req,res)=>{
    console.log('i am in redirecteg');
    res.redirect('/redirecteg2');
});
userRoutes.get('/pathparameg/:user/:personal',(req,res)=>{
    var user = req.params.user;
    var personal = req.params.personal;
    console.log('user ',user);
    console.log('personal ',personal);
    res.set({'Content-Type': 'application/json'});
    res.json({'user':user,'personal':personal});
});
userRoutes.get('/user',protectRoute, (req,res)=>{ 
    res.status(200).json('User');

    // console.log(req.headers.userid);
});
userRoutes.post('/delete',(req,res)=>{
    const userOperations = require('../helpers/useroperation');
    userOperations.delete(req.body,res);
});
userRoutes.post('/update',(req,res)=>{
    const userOperations = require('../helpers/useroperation');
    userOperations.update(req.body,res);
});
module.exports = userRoutes;
 