var db = require('../../utils/db');
module.exports = {
  all: () => {
    return db.load(`
      select * from chuyenmuc where daXoa=0`)
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

  loadCatsParent: (id) => {
    if (id) {
      return db.load(`select * from chuyenmuc where daXoa = 0 and chuyenMucCha is null and idChuyenMuc<>${id}`);
    }
    return db.load(`select * from chuyenmuc where daXoa=0 and chuyenMucCha is null`);
  },

  loadCatsChild: (id) => {
    return db.load(`select * from chuyenmuc where daXoa =0 and chuyenMucCha=${id}`);
  }


}