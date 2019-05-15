
var con = require('./connect');

con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM `baiviet`", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      module.exports = result;
    });
    con.end();
  });


  

