const jwt = require('jsonwebtoken');
//Async

// const jwtOperations = {
//     SECRETKEY: 'UCANTSEEME',
//     generateToken(userid, email) {
//         var token = jwt.sign({ userid, email },
//             this.SECRETKEY,
//             { expiresIn: '1h' },
//             (err, token) => {
//                 if (err) {
//                     console.log('error is ', err)
//                 }
//                 else {
//                     re.send('token is ', token);
//                 }
//             }
//         );
        
//     },
//     verifyToken(ClientToken) {
//         var decoded = jwt.verify(ClientToken, this.SECRETKEY, (err, authorizedData) => {
//             if (err) {
//                 console.log('ERROR: Could not connect to the protected route');
//                 res.sendStatus(403);
//             }
//             else {
//                 res.json({
//                     message: 'Successful log in',
//                     authorizedData

//                 });
//             }
//         });
//     }
// }
//sync
const jwtOperations = {
SECRETKEY:'UCANTSEEME',
generateToken(userid , email){
    
    var token = jwt.sign({userid , email }, this.SECRETKEY,{ expiresIn: '1h' });
    return token;
},
verifyToken(clientTokenNumber){
    var decoded = jwt.verify(clientTokenNumber, this.SECRETKEY);
    if(decoded){
    console.log('Verified: ',decoded.userid+ ' email ' +decoded.email);
    // next();
    return decoded;
    }
    else{
        console.log('Token Not Matched...');
        return undefined;
    }
}
}

              
                // if(decoded){
                //     console.log('Token Varified');
                //     console.log('userid ',decoded.userid);
                //     console.log('email ',decoded.email);
                //     return decoded.userid + "&" + decoded.email;
                // }
                // else {
                //     console.log('Token Unvarified');
                //     return undefined;
                // }
            
        

            module.exports = jwtOperations;