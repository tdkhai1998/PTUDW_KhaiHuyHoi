var db = require('../../utils/db');

module.exports = {
    allbyuserStt: (user, stt, limit, offset) => {
        return db.load(`select * from baiviet, chuyenmuc where baiviet.daXoa=0 and baiviet.idChuyenMuc = chuyenmuc.idChuyenMuc and  baiviet.nguoiDang ='${user}' and trangThai='${stt}' order by ngayDang DESC limit ${limit} offset ${offset}`);
    },
    countAllByUserStt: (user, stt) => db.load(`select count(*) count from baiviet, chuyenmuc where baiviet.daXoa=0 and baiviet.idChuyenMuc = chuyenmuc.idChuyenMuc and  baiviet.nguoiDang ='${user}' and trangThai='${stt}' order by ngayDang DESC`),
    all: (idChuyenMuc) => {
        return db.load(`select * from baiviet, chuyenmuc where baiviet.daXoa=0 and baiviet.idChuyenMuc = chuyenmuc.idChuyenMuc and  baiviet.idChuyenMuc ='${idChuyenMuc}' order by ngayDang DESC`);
    },
    tuchoi: (entity) => {
        return db.add('baiviettuchoi', entity)
    },
    update: id => {
        return db.load(`update baiviet  set trangThai = 'bituchoi' where idBaiViet = '${id}'`)
    },
    tenchuyenmuc: id => {
        return db.load(`select * from chuyenmuc where baiviet.daXoa=0 idChuyenMuc = ${id}`)
    },
    one: (id) => {
        return db.load(`select * from baiviet, chuyenmuc where baiviet.daXoa=0 and idBaiViet = '${id}' and baiviet.idChuyenMuc = chuyenmuc.idChuyenMuc`)
    },
    lido: id => {
        return db.load(`select * from baiviettuchoi where idBaiViet = '${id}'`)
    }

};