var db = require('../../utils/db');


module.exports={
  all:()=>{
    return db.load(`
    select * from tag where daXoa=0`)
  }
}