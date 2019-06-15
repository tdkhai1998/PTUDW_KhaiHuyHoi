var db = require('../../utils/db');

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

  alltag: () =>{
    return db.load(`select * from tag`)
  },
  
  chuyenmuc: (name) =>{
    return db.load(`select * from chuyenmuc where tenChuyenMuc = N'${name}'`)
  },
  addtag: (idtag, idbv) =>{
    return db.load(`insert into thuoctag values (${idbv},${idtag})`)
  },
  
  add: (entity) =>{
    return db.add('baiviet',entity)
  }

}; 
