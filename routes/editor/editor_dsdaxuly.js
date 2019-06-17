var express = require('express');
var router = express.Router();
var load = require('../../models/editor/editor_xemdanhsach.model')
var auth = require('../../middleware/auth').authEditor;

router.get('/', auth, function(req, res, next) {
    var page = (req.query.page ? req.query.page : 1);
    page = page <= 0 ? 1 : page;
    var limit = 5;
    var offset = (page - 1) * limit;
    Promise.all([load.allbyuser(req.user.username, limit, offset), load.tenchuyenmuc(req.user.idChuyenMuc), load.countAllByUser(req.user.username)])
        .then(([rows, chuyenmuc, count]) => {
            rows.forEach(element => {
                if (element.trangThai == 'bituchoi')
                    element.stt = 'Đã từ chối'
                else
                    element.stt = 'Chờ xuất bản'
            });
            var n = count[0].count;
            n = n / limit;

            var pages = [];
            for (var i = 0; i < n; i++) {
                var obj = new Object();
                obj.giatri = i + 1;
                if (page == i + 1) obj.active = true
                else obj.active = false;
                pages.push(obj);
            }
            res.render('editor/editor_dsdaxuly_body', {
                user: req.user,
                row: rows,
                pages,
                cm: chuyenmuc[0],
                layout: '../editor/editor_xemdanhsach_layout'
            });
        }).catch(e => next(e));
});

module.exports = router;