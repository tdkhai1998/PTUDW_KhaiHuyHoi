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
  tags: id =>{
    return db.load(`select * from thuoctag, tag where idBaiViet = '${id}' and thuoctag.idTag = tag.idTag`)
  },
  one: (id) => {
    return db.load(`select * from baiviet, chuyenmuc where idBaiViet = '${id}' and baiviet.idChuyenMuc = chuyenmuc.idChuyenMuc`)
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
  },
  update: (entity) =>{
    return db.update('baiviet','idBaiViet', entity)
  },
  deleteLido: id =>{
    return db.delete('baiviettuchoi','idBaiViet', id)
  },
  deletetag: (id,baiviet) =>{
    return db.load(`delete from thuoctag where idTag ='${id}' and idBaiViet = '${baiviet}'`)
  }
}; 
