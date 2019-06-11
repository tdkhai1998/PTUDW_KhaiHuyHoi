var db = require('../../utils/db');
module.exports={
    allCat:()=>{

    },

    add:(entity)=>{
        return db.add('nguoidung',entity);
      },
    
      single:(user)=>{
        return db.load(`select * from nguoidung where username='${user}'`);
      },
    
      update:(entity)=>{
        return db.update('nguoidung','username',entity);
      },
    
      delete: username => {
        
        return db.load(`update chuyenmuc set daXoa=1 where username=${username}`);
      },

      findCategory: (id)=>{
        return db.load(`select * from chuyenmuc where idChuyenMuc=${id}`);
      }
}