const xj = require('xls-to-json');
const winston = require('../utils/winston');
const path = require('path');
function xmlTojson() {
const rootPath = path.normalize(__dirname+"\..");
const fullPath = path.join(rootPath,'/uploads/2020-01-12T15:07:08.247Z , demo_file.xls');
xj({
    input: fullPath,
    output: "output.json",
    sheer: "sampleSheet",
    rowsToSkip: 2
}, function(err, result) {
if(err){
    winston.error('Error in Converting into JSON');
    console.log('Error in Converting into JSON');
}else {
    console.log('Converted into JSON ',result);
    winston.debug('Converted into JSON');
}
});
}
