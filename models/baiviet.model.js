var db = require('../utils/db');
var chuyenmuc_m = require('../models/chuyenmuc.model');
var nguoidung_m = require('../models/admin/user.model');
var tag_model = require('../models/tag.model');


var premiumSearchString = `order by premium DESC , ngaydang DESC `;
var orderByDate = 'order by ngaydang DESC ';

var baiVietNoiBat_QS = `select * from baiviet as bv JOIN chuyenmuc as cm ON bv.idChuyenMuc=cm.idChuyenMuc WHERE trangThai='daxuatban' and ngaydang BETWEEN (SELECT Date_sub(CURRENT_DATE(), INTERVAL WEEKDAY(CURRENT_DATE()) DAY)) AND(SELECT Date_add(CURRENT_DATE(), INTERVAL (7-WEEKDAY(CURRENT_DATE())) DAY)) ORDER BY luotxem Asc limit 10`;
var baiVietXemNhieuNhat_QS = (limit, offset) => `select * from baiviet as bv JOIN chuyenmuc as cm ON bv.idChuyenMuc=cm.idChuyenMuc where trangThai='daxuatban' order by luotxem DESC ` + limitString(limit, offset);
var top10ChuyenMuc_QS = `select * from baiviet as bv JOIN chuyenmuc as cm ON bv.idChuyenMuc=cm.idChuyenMuc where bv.trangThai='daxuatban' order by ngaydang asc limit 10`; //
var baiVietMoiNhat_QS = (limit, offset) => `select * from baiviet as bv JOIN chuyenmuc as cm ON bv.idChuyenMuc=cm.idChuyenMuc where trangThai='daxuatban'` + orderByDate + limitString(limit, offset);
var baiVietCungChuyenMuc_QS = (id, limit, offset) => `select * from baiviet as bv JOIN chuyenmuc as cm ON bv.idChuyenMuc=cm.idChuyenMuc  where bv.trangThai='daxuatban' and bv.idChuyenMuc=${id} order by ngaydang asc ` + limitString(limit, offset);
var limitString = (limit, offset) => `limit ${limit} offset ${offset}`;
var full_text_search_QS = (key, limit, offset) => `SELECT * FROM baiviet as bv JOIN chuyenmuc as cm ON bv.idChuyenMuc=cm.idChuyenMuc WHERE bv.trangThai='daxuatban' and round(MATCH(tieuDe,moTa, noiDung) AGAINST (N'${key}' IN BOOLEAN MODE),5)>0  order by premium DESC , ngaydang DESC limit ${limit} offset ${offset}`;
var count_full_text_search_QS = key => `SELECT count(*) FROM baiviet as bv JOIN chuyenmuc as cm ON bv.idChuyenMuc=cm.idChuyenMuc WHERE bv.trangThai='daxuatban' and round(MATCH(tieuDe,moTa, noiDung) AGAINST (N'${key}' IN BOOLEAN MODE),5)>0 `;
var tongBaiVietChuaTag_QS = (idTag) => `select count(*) as tong from thuoctag  join baiviet on thuoctag.idBaiViet=baiviet.idBaiViet join chuyenmuc on baiviet.idChuyenMuc=chuyenmuc.idChuyenMuc where baiviet.trangThai='daxuatban' and thuoctag.idTag=${idTag}`;
var baiVietChuaTag_QS = (idTag, limit, offset) => `select * from thuoctag  join baiviet on thuoctag.idBaiViet=baiviet.idBaiViet join chuyenmuc on baiviet.idChuyenMuc=chuyenmuc.idChuyenMuc  where baiviet.trangThai='daxuatban' and thuoctag.idTag=${idTag} order by premium DESC , ngaydang DESC ` + limitString(limit, offset);
var single = id => db.load(`SELECT bv.*, cm.tenChuyenMuc FROM baiviet as bv JOIN chuyenmuc as cm ON bv.idChuyenMuc=cm.idChuyenMuc WHERE bv.trangThai='daxuatban' and idBaiViet= ${id}`);
var singleWithTags = id => Promise.all([single(id), db.load(`select * from thuoctag tg join tag t on tg.idTag=t.idTag and tg.idBaiViet=${id}`)]).then(([baiviet, tags]) => {
    if (baiviet.length <= 0) return null;
    else {
        baiviet[0].tags = [];
        tags.forEach(i => {
            baiviet[0].tags.push(i);
        });
        return baiviet[0];
    }
})
var getTags = (bv, id) => Promise.all([bv, db.load(`select * from thuoctag tg join tag t on tg.idTag=t.idTag and tg.idBaiViet=${id}`)]).then(([baiviet, tags]) => {
    if (baiviet.length <= 0) return null;
    else {
        baiviet[0].tags = [];
        tags.forEach(i => {
            baiviet[0].tags.push(i);
        });
        return baiviet[0];
    }
})
var getTagsForBaiViets = baiViet => Promise.all([baiViet, db.load('select * from thuoctag tg join tag t on tg.idTag=t.idTag')]).then(([bv, tags]) => {
    {
        bv.forEach(i => {
            i.tags = [];
            tags.forEach(j => {
                if (i.idBaiViet == j.idBaiViet) {
                    i.tags.push(j);

                }
            })

        })

        return bv;
    }
}).catch(e => console.log(e.sqlMessage));
var baiVietXemNhieuNhatChuyenMuc = (id) => {
    return db.load(`SELECT * FROM baiviet join chuyenmuc on baiviet.idChuyenMuc=chuyenmuc.idChuyenMuc 
    WHERE trangThai='daxuatban' and luotxem=(
        SELECT MAX(luotxem) FROM baiviet WHERE idChuyenMuc = ${id} )  ORDER BY ngayDang DESC LIMIT 1 `);
}
var top10chuyenmuc = () => {
    return chuyenmuc_m.top10ChuyenMuc().then(val => {
        var baiviet = [];
        val.forEach(e => {
            baiviet.push(baiVietXemNhieuNhatChuyenMuc(e.idChuyenMuc));
        })
        return Promise.all(baiviet).then(r => {
            bv = [];
            r.forEach(i => {
                bv.push(i[0]);
            })
            console.log(bv.length);
            return bv;
        })
    })
}
var tongBaiVietChuyenMuc = id => db.load(`Select count(*) as tong from (SELECT cm2.idChuyenMuc FROM chuyenmuc cm join chuyenmuc cm2 on cm.idChuyenMuc=cm2.chuyenMucCha
    Where cm.idChuyenMuc=${id} UNION select ${id}) as id join baiviet as bv on id.idChuyenMuc=bv.idChuyenMuc where bv.trangThai='daxuatban'`);
var tatCaBaiVietChuyenMuc = (id, limit, offset) => db.load(`Select * from (SELECT cm2.idChuyenMuc, cm2.tenChuyenMuc FROM chuyenmuc cm join chuyenmuc cm2 on cm.idChuyenMuc=cm2.chuyenMucCha
    Where cm.idChuyenMuc=${id} UNION select idChuyenMuc, tenChuyenMuc from chuyenmuc where idChuyenMuc=${id}) as id join baiviet as bv on id.idChuyenMuc=bv.idChuyenMuc where  bv.trangThai='daxuatban' order by premium DESC , ngaydang DESC limit ${limit} offset ${offset}`);
var multiSimpleSearchString = (tenCots, key) => {
    var keys = key.split(" ");
    var sql = ``;
    tenCots.forEach(i => {
        sql += ` select * from baiviet join chuyenmuc on chuyenmuc.idChuyenMuc=baiviet.idChuyenMuc  where baiviet.trangThai='daxuatban' and ( `
        keys.forEach(e => {
            if (e != " ")
                sql += `${i} LIKE '%${e}%'  or `;
        })
        sql = sql.substring(0, sql.length - 4) + " )  Union "
    })
    sql = sql.substring(0, sql.length - 6);
    return sql;
}

module.exports = {
    singleWithTags,
    getTagsForBaiViets,
    single,
    tongBaiVietChuyenMuc,
    tatCaBaiVietChuyenMuc,
    baiVietChuaTag: (idTag, limit, offset) => db.load(baiVietChuaTag_QS(idTag, limit, offset)),
    tongBaiVietChuaTag: idTag => db.load(tongBaiVietChuaTag_QS(idTag)),
    multiSimpleSearch: (tenCots, key, limit, offset) => db.load(multiSimpleSearchString(tenCots, key) + `order by premium DESC , ngaydang DESC limit ${limit} offset ${offset}`),
    count_multiSimpleSearch: (tenCots, key) => db.load(multiSimpleSearchString(tenCots, key)).then(val => { var tong = val.length; return tong; }),
    full_text_search: (key, limit, offset) => db.load(full_text_search_QS(key, limit, offset)),
    count_full_text_search: key => db.load(count_full_text_search_QS(key)).then(val => val[0].tong),
    countSearch: key => search.then(val => val.length),
    baiVietCungChuyenMuc: (id, limit, offset) => db.load(baiVietCungChuyenMuc_QS(id, limit, offset)),
    baiVietMoiNhat: (limit, offset) => db.load(baiVietMoiNhat_QS(limit, offset)),
    baiVietNoiBat: () => db.load(baiVietNoiBat_QS),
    top10chuyenmuc,
    baivietxemnhieunhat: () => db.load(baiVietXemNhieuNhat_QS(10, 0)),
};