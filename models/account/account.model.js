var db = require('../../utils/db');
module.exports={
    allCat:()=>{

    },

    add:(entity)=>{
        return db.add('nguoidung',entity);
      },
    
      single:(user)=>{
        return db.load(`select * from nguoidung where username='${user}' and daXoa=0`);
      },
    
      update:(entity)=>{
        return db.update('nguoidung','username',entity);
      },
    
     

      findCategory: (id)=>{
        return db.load(`select * from chuyenmuc where idChuyenMuc=${id}`);
      }
}