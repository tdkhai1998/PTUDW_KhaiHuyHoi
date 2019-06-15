var db = require('../../utils/db');

module.exports = {
  all: () => {
    return db.load(`select * from baiviet, chuyenmuc where baiviet.idChuyenMuc = chuyenmuc.idChuyenMuc and trangThai='chuaduocduyet'`);
  },
  tuchoi: (entity) =>{
    return db.add('baiviettuchoi',entity)
  },
  update: id =>{
    return db.load(`update baiviet  set trangThai = 'bituchoi' where idBaiViet = '${id}'`)
  }
 
};
