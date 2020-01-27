const bcrypt = require('bcrypt');
const encrypt = {
    salt:10,
    generateHash(plainPassword){
    let hash = bcrypt.hashSync(plainPassword,this.salt);
    return hash;
    },
    compareHash(plainPassword,dbPassword){
        let compare = bcrypt.compareSync(plainPassword,dbPassword);
        return compare;
    }
}
module.exports = encrypt;