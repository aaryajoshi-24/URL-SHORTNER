const shortid = require("shortid");

function generateShortCode() {
    return shortid.generate();
}

module.exports = generateShortCode;