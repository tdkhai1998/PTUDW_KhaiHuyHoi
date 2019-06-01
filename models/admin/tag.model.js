var db = require('../../utils/db');


module.exports={
  all:()=>{
    return db.load(`
    select * from tag where daXoa=0`)
  },

  add:(entity)=>{
    return db.add('tag',entity);
  },


  single:(id)=>{
    return db.load(`select * from tag where idTag=${id}`);
  },

  update:(entity)=>{
    return db.update('tag','idTag',entity);
  },

  delete: id => {
  
    return db.load(`update tag set daXoa=1 where idTag=${id}`);
  },
}