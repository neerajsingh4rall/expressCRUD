const nodeMailer = require('nodemailer');

function forgetPassword(userid , password , email , res) {
nodeMailer.createTestAccount((err,acc)=>{
    let transporter = nodeMailer.createTransport({
        service : 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: false,
        auth: {user: 'neeraj.4rall.singh@gmail.com' , pass: 'neeraj@1990'}
});
let mailOptions = {
    from : 'neeraj.4rall.singh@gmail.com', 
    to : email,
    subject : 'Hello ' + userid + 'Your Password Changed Succesfully',
    text : 'Forget Password' +userid,
    html : '<b>Welcome </b> ' +userid
}
transporter.sendMail(mailOptions,(err,doc)=>{
    console.log('MailOptions is ' ,"from " +mailOptions.from);
    console.log("to "+mailOptions.to);
    if(err){
        console.log('mail error is',err);
        res.send('Mail Sending Error');
    }
    else {
        res.send('Mail Successfully Sended to '+userid);
        console.log('Mail Successfully Sended to '+userid);
    }
});
});
}

module.exports = forgetPassword;