var express = require('express');
var router = express.Router();
var userModel = require('../models/account/account.model')
var bcrypt = require('bcrypt');
var passport = require('passport');
var nodemailer = require('nodemailer');
var moment = require('moment');
var randomstring = require("randomstring");
var auth = require('../middleware/auth').authUser;
request = require('request');
var check = (loai) => {
    switch (loai) {
        case "1":
            return "/"
        case "2":
            return "/writer_vietbai"
        case "3":
            return "/editor_xemdanhsach"
        case "4":
            return "/admin/tags"
        default:
            return "/sair"
    }
}
var saltRounds = 10;
router.get('/register', (req, res, next) => {
    res.render('account/register', {
        title: "Đăng ký",
        layout: 'account_layout',
    });
})
router.get('/is-available', (req, res, next) => {
    var username = req.query.username;
    userModel.single(username).then(rows => {
        if (rows.length > 0) {
            return res.json(false);
        } else {
            return res.json(true);
        }
    }).catch(err => {
        next(e);
    })
})
router.get('/is-available2', (req, res, next) => {
    var username = req.query.username;
    userModel.single(username).then(rows => {
        if (rows.length > 0) {
            return res.json(true);
        } else {
            return res.json(false);
        }
    }).catch(err => {
        next(e);
    })
})
router.get('/forgot-password', (req, res, next) => {
    res.render('account/forgot_password', {
        title: "Quên mật khẩu",
        layout: 'account_layout'
    });
})
router.post('/forgot-password', (req, res, next) => {
    var username = req.body.username;
    var email = req.body.email;
    userModel.single(username).then(rows => {
        var user = rows[0];
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'quocvu142@gmail.com',
                pass: 'quochoi42'
            }
        });
        var url = 'https://hkhweb.herokuapp.com/account/req-from-email?username=' + username + '&key=' + user.code;
        var html = '<a href="' + url + '"><b>Click here to reset password</b></a>';
        const mailOptions = {
            from: 'quocvu142@gmail.com', // sender address
            to: user.email, // list of receivers
            subject: 'Forgot password', // Subject line
            html: html // plain text body
        };
        return transporter.sendMail(mailOptions, function(err, info) {
            if (err) {
                //console.log(err);
                err.message = "Bị lỗi email rồi";
                return next(err);
                console.log(err);
            } else {
                req.session.message = `Check email ${user.email} để đổi mật khẩu`;
                res.redirect('/account/login');
            }
        });
    })
})
router.get('/req-from-email', (req, res, next) => {
    var username = req.query.username;
    userModel.single(username).then(rows => {
        var user = rows[0];
        var key = req.query.key;
        if (key === user.code) {
            res.render('account/change_new_password', {
                title: "Đổi mật khẩu",
                layout: 'account_layout',
                username: username,
            })
        }
    }).catch(err => {
        next(e);
    })
})
router.post('/req-from-email', (req, res, next) => {
    var username = req.body.username;
    userModel.single(username).then(rows => {
        var entity = rows[0];
        var password = req.body.password;
        entity.password = bcrypt.hashSync(password, saltRounds)
        entity.code = randomstring.generate(15);
        userModel.update(entity).then(n => {
            res.redirect('/account/login');
        }).catch(err => {
            next(e);
        })
    })
})
router.post('/register', (req, res, next) => {
    if (req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
        res.redirect('account/register');
    }
    const secretKey = "6Lf18agUAAAAADS6EJgFYSGSoGgaqwkKBiLfSFfB";
    const verificationURL = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;
    request(verificationURL, function(error, response, body) {
        body = JSON.parse(body);
        if (body.success !== undefined && !body.success) {
            res.redirect('account/register');
        }
        var entity = new Object;
        var password = bcrypt.hashSync(req.body.password, saltRounds);
        entity.username = req.body.username;
        entity.password = password;
        entity.ten = req.body.name;
        entity.loaiTaiKhoan = 1;
        entity.email = req.body.email
        entity.idChuyenMuc = null;
        var date = moment().add(7, 'days').format('YYYY-MM-DD');
        entity.HSD = date;
        entity.daXoa = 0;
        entity.code = randomstring.generate(15);
        userModel.add(entity).then(n => {
            res.redirect('/admin/categories');
        }).catch(err => {
            next(e);
        })
    });
})
router.get('/reset-password', (req, res, next) => {
    res.render('account/reset_password', { title: "Đổi mật khẩu", layout: 'account_layout' });
})
router.post('/reset-password', (req, res, next) => {
    var old = req.body.old_password;
    var ret = bcrypt.compareSync(old, req.user.password);
    if (ret) {
        var entity = req.user;
        var password = bcrypt.hashSync(req.body.password, saltRounds);
        entity.password = password;
        userModel.update(entity).then(n => {
            res.redirect('/admin/categories');
        }).catch(err => {
            next(e);
        })
    } else {
        res.end('error occured');
    }
})
router.get('/login', (req, res, next) => {
    console.log(req.user);
    if (req.user) {
        res.redirect(check(req.user.loaiTaiKhoan));
    } else {
        console.log(res.locals.url);
        var m = req.session.message;
        req.session.message = null;
        res.render('account/login', {
            title: "Đăng nhập",
            layout: 'account_layout',
            message: m
        });
    }
})
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err)
            return next(err);
        if (!user) {
            req.session.message = "Đăng Nhâp Không Thành Công"
            return res.redirect('/account/login')
        }
        req.logIn(user, err => {
            if (err)
                return next(err);
            if (req.session.sessionFlash) {
                return res.redirect(req.session.sessionFlash.urlBack);
            } else {
                return res.redirect(check(user.loaiTaiKhoan));
            }
        });
    })(req, res, next);
})
router.get('/auth/facebook', passport.authenticate('facebook'));
router.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/',
        failureRedirect: '/account/login'
    })
);
router.get('/auth/google',
    passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));
router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/account/login' }),
    function(req, res) {
        res.redirect('/');
    }
);
router.get('/profile', auth, (req, res, next) => {
    var isWriter = false;
    var isEditor = false;
    var isUser = false;
    var user = new Object;
    Object.assign(user, req.user);
    switch (user.loaiTaiKhoan) {
        case "1":
            isUser = true;
            user.loaiTaiKhoan = "User";
            break;
        case "2":
            isWriter = true;
            user.loaiTaiKhoan = "Writer";
            break;
        case "3":
            isEditor = true;
            user.loaiTaiKhoan = "Editor";
            break;
        case "4":
            user.loaiTaiKhoan = "Administrator";
            break;
    }
    try {
        user.ngaySinh = moment(req.user.ngaySinh).format('DD/MM/YYYY');
    } catch (err) {
        user.ngaySinh = null;
    }
    try {
        user.HSD = moment(req.user.HSD).format('DD/MM/YYYY');
    } catch (err) {
        user.HSD = null;
    }
    userModel.findCategory(req.user.idChuyenMuc).then(rows => {
        var cat = rows[0];
        var m = req.session.message;
        req.session.message = null;
        res.render('account/profile', {
            message: m,
            title: "Thông tin cá nhân",
            layout: 'account_layout',
            user: user,
            isWriter: isWriter,
            isEditor: isEditor,
            isUser: isUser,
            cat: cat
        });
    }).catch(err => {
        next(e);
    })
})
router.post('/profile', auth, (req, res, next) => {
    var entity = req.user;
    try {
        entity.ngaySinh = moment(req.body.dob, 'DD/MM/YYYY').format('YYYY-MM-DD');
    } catch (err) {
        entity.ngaySinh = null;
    }
    entity.ten = req.body.name;
    entity.HSD = moment(req.user.HSD, 'YYYY-MM-DD').format('YYYY-MM-DD');
    switch (req.user.loaiTaiKhoan) {
        case "2":
            entity.butDanh = req.body.author;
            break;
    }
    userModel.update(entity).then(n => {
        req.session.message = "Cập Nhật Thành Công";
        res.redirect(req.baseUrl + req.url);
    }).catch(err => {
        next(e);
    })
})
router.get('/logout', auth, (req, res, next) => {
    req.logOut();
    res.redirect('/account/login');
})
module.exports = router