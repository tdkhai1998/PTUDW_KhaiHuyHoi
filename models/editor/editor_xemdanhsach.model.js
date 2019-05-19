var db = require('../../utils/db');

module.exports = {
  all: () => {
    return db.load('select * from baiviet, chuyenmuc where baiviet.idChuyenMuc = chuyenmuc.idChuyenMuc');
  },
};
