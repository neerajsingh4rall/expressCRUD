const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
const cors = require('./utils/cors');

app.listen(process.env.PORT || '3000',()=>{
    const chalk = require('chalk');
    console.log(chalk.green('Server Started'));
    console.log(chalk.yellow('@3000'));
});

//Date
app.use((req,res,next)=>{
    var date = new Date();
    console.log('Time is ',date);
    next();
});
app.set('View ejs engine','ejs');
app.use(require('./utils/cors'))
app.use('/',require('./routes/user'));
app.use(require('./utils/jsonwebtoken'));

//404 Error
app.use((req,res,next)=>{
    res.send('404 Error');
    next();
});
