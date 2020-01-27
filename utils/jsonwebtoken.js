
const jwtToken = require('../utils/tokenjwt');
const jwtMiddleWare = (req,res,next)=>{
   
    res.set({"Content-Type":"application/json"});
    var token = req.headers['token'];
    console.log('JWT Middleware ',token);
    var user = jwtToken.verifyToken(token);

    if(user) {
        req.query.userid = user.userid;
        req.query.email = user.email;
        console.log('user-userid is ',user.userid);
        console.log('user-email',user.email);
        next();
    }
    else {
        console.log('Invalid Token');
    }

}
module.exports = jwtMiddleWare;