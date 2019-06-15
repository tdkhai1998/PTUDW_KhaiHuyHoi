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

  

  


}