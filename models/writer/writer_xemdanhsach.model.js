var db = require('../../utils/db');

module.exports = {
  allbyuserStt: (user,stt) => {
    return db.load(`select * from baiviet, chuyenmuc where baiviet.idChuyenMuc = chuyenmuc.idChuyenMuc and  baiviet.nguoiDang ='${user}' and trangThai='${stt}'`);
  },
  all: (idChuyenMuc) => {
    return db.load(`select * from baiviet, chuyenmuc where baiviet.idChuyenMuc = chuyenmuc.idChuyenMuc and  baiviet.idChuyenMuc ='${idChuyenMuc}' `);
  },
  tuchoi: (entity) =>{
    return db.add('baiviettuchoi',entity)
  },
  update: id =>{
    return db.load(`update baiviet  set trangThai = 'bituchoi' where idBaiViet = '${id}'`)
  },
  tenchuyenmuc: id =>{
    return db.load(`select * from chuyenmuc where idChuyenMuc = ${id}`)
  },
  one: (id) => {
    return db.load(`select * from baiviet, chuyenmuc where idBaiViet = '${id}' and baiviet.idChuyenMuc = chuyenmuc.idChuyenMuc`)
  },
  lido: id =>{
    return db.load(`select * from baiviettuchoi where idBaiViet = '${id}'`)
  }
};
