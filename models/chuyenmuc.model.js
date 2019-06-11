var db = require('../utils/db');
module.exports = {
  mapping:()=>{
    return db.load('select * from chuyenmuc').then((value)=>{
      value.forEach((item)=>{
        item.chuyenMucCon=[];
        value.forEach((item2)=>{
            if(item.idChuyenMuc==item2.chuyenMucCha){
              item.chuyenMucCon.push(item2)
            }
        })
        if(item.chuyenMucCha==null){
          item.chuyenMucCha=true;
        }
        else{
          item.chuyenMucCha=false;
        }
      })
      return value;
    })
  },
  all: () => {
    return db.load('select * from chuyenmuc');
  },
  single: id => {
    return db.load(`select * from chuyenmuc where idChuyenMuc = ${id}`);
  },

  add: entity => {
    return db.add('chuyenmuc', entity);
  },

  update: entity => {
    return db.update('chuyenmuc', 'idChuyenMuc', entity);
  },

  delete: id => {
    return db.delete('chuyenmuc', 'idChuyenMuc', id);
  },
};
