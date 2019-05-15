
var hehe = require('./connect');

hehe.con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
  
