const fs = require('fs')


module.exports = {
    async createDirectory(path) {
        try {
            await mkdir(path);
            console.log(`Created directory ${path}`);
        } catch (error) {
            console.error(`Got an error trying to create the directory: ${error.message}`);
        }
    }
}