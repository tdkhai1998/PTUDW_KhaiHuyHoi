var db = require('../../utils/db');

module.exports = {
  allbyuser: (user) => {
    return db.load(`select * from baiviet, chuyenmuc where baiviet.idChuyenMuc = chuyenmuc.idChuyenMuc and  baiviet.nguoiDuyet ='${user}'`);
  },
  all: (idChuyenMuc) => {
    return db.load(`select * from baiviet, chuyenmuc where baiviet.idChuyenMuc = chuyenmuc.idChuyenMuc and  baiviet.idChuyenMuc ='${idChuyenMuc}' and trangThai='chuaduocduyet'`);
  },
  tuchoi: (entity) =>{
    return db.add('baiviettuchoi',entity)
  },
  update: id =>{
    return db.load(`update baiviet  set trangThai = 'bituchoi' where idBaiViet = '${id}'`)
  },
  tenchuyenmuc: id =>{
    return db.load(`select * from chuyenmuc where idChuyenMuc = ${id}`)
  }
 
};
