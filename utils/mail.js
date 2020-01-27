const nodeMailer = require('nodemailer');

function configAccount(name,userid,email,res) {
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
        subject : 'Hello' + userid + 'You Registered Succesfully',
        text : 'Email Regarding Your Job Conformation ' +name,
        html : '<b>Welcome to </b>' +name
    }
    transporter.sendMail(mailOptions,(err,doc)=>{
        console.log('MailOptions is ' ,"from " +mailOptions.from);
        console.log("to "+mailOptions.to);
        if(err){
            console.log('mail error is',err);
            res.send('Mail Sending Error');
        }
        else {
            res.send('Mail Successfully Sended to '+name);
            console.log('Mail Successfully Sended to '+name);
        }
    });
});
}
module.exports = configAccount;