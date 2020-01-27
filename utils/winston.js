const winston = require('winston');

// const logger = winston.createLogger({
//     format: winston.format.combine(winston.format.timestamp(),winston.format.json()),
//     transports: [
//         new winston.transports.File({filename: '/Users/Shakti/Desktop/DataBase/db_1 Logs/app.log', level: 'debug'}),
//         new winston.transports.File({filename: '/Users/Shakti/Desktop/DataBase/db_1 Logs/error.log', level: 'error'}),
//     ]
// });
const customFormat = winston.format.printf(({level, message, label, timestamp})=>{
    return `${timestamp} [${label}] ${level}: ${message}`;
});
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
    winston.format.label({label:'Agantak'}),
    winston.format.timestamp(),
    customFormat
    ),
    transports: [
        new winston.transports.File({filename:'/Users/Shakti/Desktop/DataBase/db_1 Logs/error.log', level: 'error'}),
        new winston.transports.File({filename:'/Users/Shakti/Desktop/DataBase/db_1 Logs/combined.log', level: 'debug'})

    ]
});


module.exports = logger;