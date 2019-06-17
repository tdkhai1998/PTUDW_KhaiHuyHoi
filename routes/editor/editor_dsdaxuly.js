var express = require('express');
var router = express.Router();
var load = require('../../models/editor/editor_xemdanhsach.model')


router.get('/', function(req, res, next) {
    if (req.isAuthenticated() && req.user.loaiTaiKhoan == 3) {
        console.log(req.user)
        Promise.all([load.allbyuser(req.user.username), load.tenchuyenmuc(req.user.idChuyenMuc)])
            .then(([rows, chuyenmuc]) => {
                rows.forEach(element => {

                    if (element.trangThai == 'bituchoi')
                        element.stt = 'Đã từ chối'
                    else
                        element.stt = 'Chờ xuất bản'

                });

                console.log(rows)
                res.render('./editor/editor_dsdaxuly_body', {
                    user: req.user,
                    row: rows,
                    cm: chuyenmuc[0],
                    layout: '../editor/editor_xemdanhsach_layout'
                });
            }).catch(err => {
                console.log(err);
                res.end('error occured.')
            });
    } else
        res.redirect('account/login')
});

module.exports = router;