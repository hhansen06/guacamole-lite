const Crypto = require('crypto');

class Crypt {

    constructor(app) {
        this.server = app;
    }

    decrypt(encodedString) {
        let tempJSON = this.constructor.base64decode(encodedString);
        let encoded = JSON.parse(tempJSON.substr(0, tempJSON.indexOf('}')+1));
        
        encoded.iv = this.constructor.base64decode(encoded.iv);
        encoded.value = this.constructor.base64decode(encoded.value, 'binary');

        const decipher = Crypto.createDecipheriv(this.server.clientOptions.crypt.cypher, this.server.clientOptions.crypt.key, encoded.iv);

        let decrypted = decipher.update(encoded.value, 'binary', 'ascii');
        decrypted += decipher.final('ascii');

        return JSON.parse(decrypted);
    }

    static base64decode(string, mode) {
        return Buffer.from(string, 'base64').toString(mode || 'ascii');
    }

}

module.exports = Crypt;
