const crypto = require('crypto');

module.exports = {
    hashPassword(password) {
        const salt = crypto.randomBytes(16).toString('hex');
        const iterations = 10000;
        const keylen = 64;
        const digest = 'sha512';
        const hash = crypto.pbkdf2Sync(password, salt, iterations, keylen, digest);
        return {
          salt: salt,
          hash: hash.toString('hex')
        };
    },

    verifyPassword(password, hash, salt) {
        const iterations = 10000;
        const keylen = 64;
        const digest = 'sha512';
        const verifyHash = crypto.pbkdf2Sync(password, salt, iterations, keylen, digest).toString('hex');
        return verifyHash === hash;
      }
      
}