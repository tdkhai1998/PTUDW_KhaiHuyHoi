var db = require('../../utils/db');

module.exports = {
  one: (id) => {
    return db.load(`select * from baiviet, chuyenmuc where idBaiViet = '${id}' and baiviet.idChuyenMuc = chuyenmuc.idChuyenMuc`)
  },
  tuchoi: (entity) =>{
    return db.add('baiviettuchoi',entity)
  },
  updatestt: id =>{
    return db.load(`update baiviet  set trangThai = 'bituchoi' where idBaiViet = '${id}'`)
  },
  tags: id =>{
    return db.load(`select * from thuoctag, tag where idBaiViet = '${id}' and thuoctag.idTag = tag.idTag`)
  },
  alltag: () =>{
    return db.load(`select * from tag`)
  },
  updatebv: (ngaydang,chuyenmuc,id) =>{
    return db.load(`update baiviet set ngayDang = '${ngaydang}' , idChuyenMuc = '${chuyenmuc}' where idBaiViet = '${id}'`)
  },
  chuyenmuc: (name) =>{
    return db.load(`select * from chuyenmuc where tenChuyenMuc = N'${name}'`)
  },
  addtag: (idtag, idbv) =>{
    return db.load(`insert into thuoctag values ${idtag},${idbv}`)
  },
  idtagfromname: name =>{
    return db.load(`select * from tag where tenTag = '${name}'`)
  }
};
