const unique = require('short-uuid');
function generateId() {
    return unique.generate();
}
module.exports = generateId;