var db = require('../../utils/db');
module.exports = {
  all: () => {
    return db.load(`
    SELECT bv.*, cm.tenChuyenMuc, nd.butDanh
    from baiviet bv, chuyenmuc cm, nguoidung nd
    WHERE bv.idChuyenMuc=cm.idChuyenMuc and (bv.daXoa=0 or bv.daXoa is null)
     AND bv.trangThai='choxuatban' and nd.username=bv.nguoiDang`)
  },

  inspect:(id)=>{
    return db.load(`update baiviet set trangThai='daxuatban' where idBaiViet=${id}`)
  },

  add: (entity) => {
    return db.add('chuyenmuc', entity);
  },


  single: (id) => {
    return db.load(`select * from chuyenmuc where idChuyenMuc=${id}`);
  },

  update: (entity) => {
    return db.update('chuyenmuc', 'idChuyenMuc', entity);
  },

  delete: id => {
    db.load(`update chuyenmuc set chuyenMucCha=NULL where chuyenMucCha=${id}`);
    return db.load(`update chuyenmuc set daXoa=1 where idChuyenMuc=${id}`);
  },

  


}