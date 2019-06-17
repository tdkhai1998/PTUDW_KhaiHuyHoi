var db = require('../utils/db');
module.exports = {
    top10ChuyenMuc: () => db.load(`SELECT idChuyenMuc, sum(luotxem) luotxem FROM baiviet WHERE baiviet.trangThai='daxuatban' group BY idChuyenMuc ORDER by luotxem desc LIMIT 10`),
    mapping: () => {
        return db.load('select * from chuyenmuc').then((value) => {
            value.forEach((item) => {
                item.chuyenMucCon = [];
                value.forEach((item2) => {
                    if (item.idChuyenMuc == item2.chuyenMucCha) {
                        item.chuyenMucCon.push(item2)
                        item2.Cha = item;
                    }
                })
                if (item.chuyenMucCha == null) {
                    item.chuyenMucCha = true;
                } else {
                    item.chuyenMucCha = false;
                }
            })
            return value;
        })
    },


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
// SELECT * FROM(SELECT idChuyenMuc, max(luotxem) luotxem FROM baiviet GROUP by idChuyenMuc) as lx JOIN(SELECT idChuyenMuc, sum(luotxem) luotxem FROM baiviet WHERE baiviet.trangThai = 'daxuatban'
//     group BY idChuyenMuc ORDER by luotxem desc LIMIT 10) as top on top.idChuyenMuc = lx.idChuyenMuc
// join baiviet as bv on bv.luotxem = lx.luotxem