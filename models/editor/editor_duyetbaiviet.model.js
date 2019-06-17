var db = require('../../utils/db');

module.exports = {
    mapping: (id) => {
        return db.load(`select * from chuyenmuc where idChuyenMuc = '${id}' or chuyenMucCha = '${id}'`).then((value) => {
            value.forEach((item) => {
                item.chuyenMucCon = [];
                value.forEach((item2) => {
                    if (item.idChuyenMuc == item2.chuyenMucCha) {
                        item.chuyenMucCon.push(item2)
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
    one: (id) => {
        return db.load(`select * from baiviet, chuyenmuc where baiviet.daXoa=0 and idBaiViet = '${id}' and baiviet.idChuyenMuc = chuyenmuc.idChuyenMuc`)
    },
    tuchoi: (entity) => {
        return db.add('baiviettuchoi', entity)
    },
    updatestt: (trangthai, id, nguoiduyet) => {
        return db.load(`update baiviet  set trangThai = '${trangthai}', nguoiDuyet = '${nguoiduyet}' where idBaiViet = '${id}'`)
    },
    tags: id => {
        return db.load(`select * from thuoctag, tag where idBaiViet = '${id}' and thuoctag.idTag = tag.idTag`)
    },
    alltag: () => {
        return db.load(`select * from tag`)
    },
    updatebv: (ngaydang, chuyenmuc, id) => {
        return db.load(`update baiviet set ngayDang = '${ngaydang}' , idChuyenMuc = '${chuyenmuc}' where idBaiViet = '${id}'`)
    },
    chuyenmuc: (name) => {
        return db.load(`select * from chuyenmuc where tenChuyenMuc = N'${name}'`)
    },
    addtag: (idtag, idbv) => {
        return db.load(`insert into thuoctag values (${idbv},${idtag})`)
    },
    idtagfromname: name => {
        return db.load(`select * from tag where tenTag = '${name}'`)
    },
    deletetag: (id, baiviet) => {
        return db.load(`delete from thuoctag where idTag ='${id}' and idBaiViet = '${baiviet}'`)
    }
};