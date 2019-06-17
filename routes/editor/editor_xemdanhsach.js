var express = require('express');
var router = express.Router();
var load = require('../../models/editor/editor_xemdanhsach.model')
var auth = require('../../middleware/auth').authEditor;


router.get('/', auth, function(req, res, next) {
    var page = (req.query.page ? req.query.page : 1);
    page = page <= 0 ? 1 : page;
    var limit = 5;
    var offset = (page - 1) * limit;
    Promise.all([load.all(req.user.idChuyenMuc, limit, offset), load.tenchuyenmuc(req.user.idChuyenMuc), load.countAll(req.user.idChuyenMuc)])
        .then(([rows, chuyenmuc, count]) => {
            var n = count[0].count;
            n = n / limit;

            console.log(n);
            var pages = [];
            for (var i = 0; i < n; i++) {
                var obj = new Object();
                obj.giatri = i + 1;
                if (page == i + 1) obj.active = true
                else obj.active = false;
                pages.push(obj);
            }
            res.render('./editor/editor_xemdanhsach_body', {
                user: req.user,
                row: rows,
                pages,
                cm: chuyenmuc[0],
                layout: '../editor/editor_xemdanhsach_layout'
            });
        }).catch(err => {
            console.log(err);
            res.end('error occured.')
        });
});



module.exports = router;