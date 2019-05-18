var db = require('../utils/db');

module.exports = {
  all: () => {
    return db.load('select * from chuyenmuc');
  },
  single: id => {
    return db.load(`select * from chuyenmuc where idChuyenMuc = ${id}`);
  },

  add: entity => {
    return db.add('chuyenmuc', entity);
  },

  update: entity => {
    return db.update('chuyenmuc', 'idChuyenMuc', entity);
  },

  delete: id => {
    return db.delete('chuyenmuc', 'idChuyenMuc', id);
  },
};
