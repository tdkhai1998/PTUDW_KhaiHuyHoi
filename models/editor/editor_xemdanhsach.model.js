var db = require('../../utils/db');

module.exports = {
    allbyuser: (user, limit, offset) => {
        return db.load(`select * from baiviet, chuyenmuc where baiviet.daXoa=0 and baiviet.idChuyenMuc = chuyenmuc.idChuyenMuc and  baiviet.nguoiDuyet ='${user}' order by ngayDang DESC limit ${limit} offset ${offset}`);
    },
    countAllByUser: (username) => db.load(`select count(*) count from baiviet, chuyenmuc where baiviet.daXoa=0 and baiviet.idChuyenMuc = chuyenmuc.idChuyenMuc and  baiviet.nguoiDuyet ='${username}' order by ngayDang DESC`),

    all: (id, limit, offset) => db.load(`Select * from 
    (SELECT cm2.idChuyenMuc, cm2.tenChuyenMuc FROM chuyenmuc cm join chuyenmuc cm2 on cm.idChuyenMuc=cm2.chuyenMucCha
    Where cm.idChuyenMuc=${id} UNION 
    select idChuyenMuc, tenChuyenMuc from chuyenmuc 
    where idChuyenMuc=${id}) as id join baiviet as bv on id.idChuyenMuc=bv.idChuyenMuc where  bv.trangThai='chuaduocduyet'
    and bv.daXoa=false order by premium DESC , ngaydang DESC limit ${limit} offset ${offset}`),

    countAll: (idChuyenMuc) => db.load(`select count(*) count from baiviet, chuyenmuc where baiviet.daXoa=0 and baiviet.idChuyenMuc = chuyenmuc.idChuyenMuc and  baiviet.idChuyenMuc ='${idChuyenMuc}' and trangThai='chuaduocduyet' order by ngayDang DESC  `),
    tuchoi: (entity) => db.add('baiviettuchoi', entity),
    update: id => {
        return db.load(`update baiviet  set trangThai = 'bituchoi' where idBaiViet = '${id}'`)
    },
    tenchuyenmuc: id => {
        return db.load(`select * from chuyenmuc where idChuyenMuc = ${id}`)
    }
};