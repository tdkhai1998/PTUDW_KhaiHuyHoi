var db = require('../../utils/db');
module.exports = {
  all: () => {
    return db.load(`
    SELECT bv.*, cm.tenChuyenMuc, nd.butDanh
    from baiviet bv, chuyenmuc cm, nguoidung nd
    WHERE bv.idChuyenMuc=cm.idChuyenMuc and (bv.daXoa=0 or bv.daXoa is null)
     AND bv.trangThai='choxuatban' and nd.username=bv.nguoiDang`)
  },

  inspect: (id) => {
    return db.load(`update baiviet set trangThai='daxuatban' where idBaiViet=${id}`)
  },

  count: (type) => {
    if (!type)
      return db.load(`select count(idBaiViet) as count from baiviet where daXoa=0 or daXoa is null`);
    else {
      return db.load(`select count(idBaiViet) as count from baiviet where (daXoa=0 or daXoa is null) and trangThai='${type}'`);
    }
  },

  loadArticles: (page, record, type) => {
    var limit = (page - 1) * (record);
    if (!type)
      return db.load(`SELECT bv.*, cm.tenChuyenMuc, nd.butDanh
      from baiviet bv
      LEFT JOIN chuyenmuc cm on bv.idChuyenMuc=cm.idChuyenMuc
      LEFT JOIN nguoidung nd on bv.nguoiDang=nd.username
      WHERE bv.daXoa=0 or bv.daXoa is null 
      ORDER BY bv.ngayDang DESC  LIMIT ${limit}, ${record}`);
    else
      return db.load(`SELECT bv.*, cm.tenChuyenMuc, nd.butDanh
      from baiviet bv
      LEFT JOIN chuyenmuc cm on bv.idChuyenMuc=cm.idChuyenMuc
      LEFT JOIN nguoidung nd on bv.nguoiDang=nd.username
      WHERE (bv.daXoa=0 or bv.daXoa is null) and bv.trangThai='${type}'
      ORDER BY bv.ngayDang DESC LIMIT ${limit}, ${record}`)

  },

  delete:(id)=>{
    return db.load(`update baiviet set daXoa=1 where idBaiViet=${id}`);
  }


}