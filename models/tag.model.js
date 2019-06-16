var db = require('../utils/db');
var all = () => db.load(`select * from tag limit 10`);

module.exports = {
    all
}