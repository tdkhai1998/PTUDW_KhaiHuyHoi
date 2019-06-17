var express = require('express');
var router = express.Router();
var baiviet_model = require('../../models/trangchu/baiviet.model')
var chuyenmuc_model = require('../../models/trangchu/chuyenmuc.model');
var comments = require('../../models/trangchu/comment_model');
var passport = require('passport');
var acc = require('../../models/account/account.model');
var url = require('url');
router.get('/:id', function(req, res, next) {
    var idBaiViet = req.params.id;
    var check;
    if (req.isAuthenticated()) {
        if (new Date(req.user.HSD) >= Date.now()) {
            check = 1; //đăng nhập và còn hạn
        } else {
            check = 2; // đăng nhập như hết hạn
        }
    } else {
        check = 3; // chưa đăng nhập
    }
    baiviet_model.singleWithTags(idBaiViet)
        .then(baiviet => {
            if (baiviet == null) {
                next();
            } else {
                if (!baiviet.premium || (check == 1)) { // bài viết thường hoặc đã đăng nhập tài khoản còn hạn
                    Promise.all([chuyenmuc_model.mapping(), comments.getAll(idBaiViet), baiviet_model.baiVietCungChuyenMuc(baiviet.idChuyenMuc, 5, 0)])
                        .then(([chuyenmuc, comment, cungchuyenmuc]) => {
                            baiviet_model.tangLuotXem(baiviet.idBaiViet).then(val => {
                                res.render('TrangChu/chitietbaiviet', {
                                    layout: 'main',
                                    title: baiviet.tieuDe,
                                    chuyenmuc,
                                    daDangNhap: req.isAuthenticated(),
                                    user: req.user,
                                    baiviet,
                                    comments: comment[0],
                                    socmt: comment[1],
                                    cungchuyenmuc
                                })
                            })
                        })
                        .catch(e => next(e));
                } else { //bài viết premium
                    req.session.urlBack = req.baseUrl + "/" + req.url;
                    if (check == 2) { // tài khoản hết hạn
                        req.session.message = "Tài khoản người dùng hết hạn";
                        res.redirect('/');
                    } else { // chưa đăng nhập
                        req.session.message = " Vui lòng đăng nhập để đọc bài viết này!";
                        req.session.sessionFlash = {
                            urlBack: req.baseUrl + req.url
                        }
                        res.redirect('/account/login');
                    }
                }
            }
        })
        .catch(e => next(e));
});
router.post('/:id', function(req, res, next) {
    if (req.isAuthenticated()) {
        var val = req.body;
        console.log(val);
        if (val.type) {
            res.redirect(url.format({
                pathname: '/timkiem',
                query: req.body
            }));
        } else {
            var comment = comments.create();
            comment.nguoiBinhLuan = req.user.username;
            comment.id = Date.now();
            comment.baiBinhLuan = req.params.id;
            comment.noiDung = val.noiDung;
            if (val.idcmt != '') {
                comment.traLoiCho = val.idcmt;
            }
            comments.add(comment).then(val => {
                res.redirect('./' + req.params.id);
            }).catch(e => next(e));
        }
    } else {
        req.session.urlBack = req.baseUrl + '/' + req.url;
        res.redirect('/account/login')
    }
});
module.exports = router;