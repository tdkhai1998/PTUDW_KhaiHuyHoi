var db = require('../../utils/db');
module.exports = {
  allCat: () => {

  },

  add: (entity) => {
    return db.add('nguoidung', entity);
  },

  single: (username) => {
    return db.load(`select * from nguoidung where username='${username}' and daXoa=0`);
  },

  update: (entity) => {
    return db.update('nguoidung', 'username', entity);
  },

  delete: (username) => {

    return db.load(`update nguoidung set daXoa=1 where username='${username}'`);
  },

  findCategory: (id) => {
    return db.load(`select * from chuyenMuc where idChuyenMuc=${id}`);
  }
  ,

  loadUser: (page, record, type, keyword) => {
    var limit = (page - 1) * (record);

    if (type == 0)
      return db.load(`select * from nguoidung where daXoa=0 and  username like '%${keyword}%'  LIMIT ${limit}, ${record}`);
    else
      return db.load(`select * from nguoidung where daXoa=0 and loaiTaiKhoan='${type}' and  username like '%${keyword}%' LIMIT ${limit}, ${record}`)
  },

  countUser: (keyword, type) => {
    if (type == 0)
      return db.load(`select count(username) as count from nguoidung where daXoa=0 and username like '%${keyword}%'`);
    else {
      return db.load(`select count(username) as count from nguoidung where loaiTaiKhoan='${type}' and daXoa=0 and username like '%${keyword}%'`);
    }
  }

}