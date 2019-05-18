var db = require('../utils/db');
module.exports = {
  all: () => db.load('select * from baiviet'),
  single: id =>  db.load(`select * from baiviet where idChuyenMuc = ${id}`),
  add: entity => db.add('baiviet', entity),
  update: entity => db.update('baiviet', 'idBaiViet', entity),
  delete: id => db.delete('baiviet', 'idBaiViet', id)
};
