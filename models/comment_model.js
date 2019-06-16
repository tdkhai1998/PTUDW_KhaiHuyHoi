var db = require('../utils/db');
var mm = require('moment');
var getAll = id => db.load(`select nd.ten as tenNguoiCmt, cmt.* from comment as cmt join nguoidung as nd on cmt.nguoiBinhLuan=nd.username  where baiBinhLuan=${id}`)
    .then(val => {
        if (val.length <= 0) {
            return [
                [], 0
            ];
        } else {
            var socmt = val.length;
            var comments = [];
            val.forEach(i => {
                if (i.traLoiCho == null) {
                    i.child = [];
                    val.forEach(j => {
                        if (j.traLoiCho == i.id) {
                            i.child.push(j);
                        }
                    })
                    comments.push(i);
                }
            });
            return [comments, socmt];
        }
    })
    .catch(e => next(e));
var create = () => {
    var obj = new Object();
    obj.nguoiBinhLuan = "";
    obj.baiBinhLuan = 0;
    obj.ngayBinhLuan = mm(Date.now()).format('YYYY-MM-DD hh:mm:ss');
    obj.noiDung = "";
    obj.traLoiCho = null;
    return obj;
}
module.exports = {
    getAll,
    create,
    add: entity => {
        return db.add('comment', entity);
    },
}