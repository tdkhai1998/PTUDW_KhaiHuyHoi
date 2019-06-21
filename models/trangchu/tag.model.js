var db = require('../../utils/db');
var all = () => db.load(`select * from tag where daXoa=0`);

module.exports = {
    all
}