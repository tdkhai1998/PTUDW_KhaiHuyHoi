var express = require('express');
var userModel = require('../../models/admin/user.model');
var catModel = require('../../models/admin/cat.model');
var bcrypt = require('bcrypt');
var moment = require('moment');
var randomstring = require("randomstring");

var router = express.Router();
var StrTypes = ["Tất cả", "User", "Writer", "Editor", "Administrator"];
var saltRound = 10;

router.get('/', (req, res, next) => {
    res.locals.user = true;
    var record = 30;
    var keyword = (req.query.keyword) ? req.query.keyword : "";
    var page = (req.query.page) ? req.query.page : 1;
    var type = (req.query.type) ? req.query.type : 0;
    userModel.countUser(keyword).then(n => {

        var count = Math.floor(n[0].count / record) + 1;
        var pages = [];
        for (var i = 0; i < count; i++) {
            var temp = new Object;
            temp.page = i + 1;
            if (page == i + 1) {
                temp.active = true;
            }
            temp.type = type;
            temp.page = page;
            temp.keyword = req.query.keyword;
            pages.push(temp);
        }

        var types = [];
        for (var i = 0; i < 5; i++) {
            var temp = new Object;
            temp.name = StrTypes[i];
            if (type == i) {
                temp.active = true;
            }
            temp.type = i;
            types.push(temp);
        }

        userModel.loadUser(page, record, type, keyword).then(rows => {
            var users = rows;
            users.forEach(element => {
                switch (element.loaiTaiKhoan) {
                    case "1": element.loai = "Độc giả"; break;
                    case "2": element.loai = "Writer"; break;
                    case "3": element.loai = "Editor"; break;
                    case "4": element.loai = "Admintrator"; break;
                }
                element.page = page;
                element.keyword = req.query.keyword;

            });
            res.render('admin/user/index', {
                users: users,
                pages: pages,
                types: types,

            })
        }).catch(err => {
            console.log(err);
            res.end('error');
        })

    }).catch(err => {
        console.log(err);
        res.end('error');
    })


})

router.get('/:username/remove', (req, res, next) => {
    var username = req.params.username;
    var page = (req.query.page) ? req.query.page : 1;
    var type = (req.query.type) ? req.query.type : 0;
    userModel.delete(username).then(n => {
        var url = '/admin/user?' + 'page=' + page + '&type=' + type;

        if (req.query.keyword) {
            url = url + '&keyword=' + req.query.keyword;
        }
        res.redirect(url);
    }).catch(err => {
        console.log(err);
        res.end('error');
    })
})

router.get('/:username/edit', (req, res, next) => {
    var username = req.params.username;
    catModel.all().then(cats => {
        userModel.single(username).then(rows => {
            var types = [];
            var user = rows[0];
            var showInput = new Object;
            switch (user.loaiTaiKhoan) {
                case "1": showInput.user = true; break;
                case "2": showInput.writer = true; break;
                case "3": showInput.editor = true; break;
                case "4": showInput.administrator = true; break;
            }


            for (var i = 1; i < StrTypes.length; i++) {
                var temp = new Object;
                temp.name = StrTypes[i];

                if (user.loaiTaiKhoan == i) {
                    temp.isSelected = true;

                }
                temp.value = i;
                types.push(temp);
            }
            var categories = cats;


            categories.forEach(element => {
                if (element.idChuyenMuc == user.idChuyenMuc) {
                    element.isSelected = true;

                }
            });
            try {
                user.ngaySinh = moment(user.ngaySinh).format('DD/MM/YYYY');

            } catch (err) {

            }

            try {
                user.HSD = moment(user.HSD).format('DD/MM/YYYY');

            } catch (err) {

            }


            res.render('admin/user/edit_Account', {
                user: user,
                types: types,
                select: showInput,
                categories: categories,

            })
        }).catch(err => {
            console.log(err);
            res.end('error');
        });

    }).catch(err => {
        console.log(err);
        res.end('error');
    })

})

router.post('/:username/edit', (req, res, next) => {
    userModel.single(req.params.username).then(rows => {
        var entity = rows[0];

        try {
            entity.ngaySinh = moment(req.body.dob, 'DD/MM/YYYY').format('YYYY-MM-DD');
        } catch (err) {
            entity.ngaySinh = null;
        }
        entity.ten = req.body.name;

        switch (req.body.optradio) {
            case "1":
                try {
                    entity.HSD = moment(req.body.HSD, 'DD/MM/YYYY').format('YYYY-MM-DD');
                } catch (err) {
                    entity.HSD = null;
                }
                entity.loaiTaiKhoan = 1; break;
            case "2": entity.butDanh = req.body.author; entity.loaiTaiKhoan = 2; break;
            case "3": entity.idChuyenMuc = req.body.category; entity.loaiTaiKhoan = 3; break;
            case "4": entity.loaiTaiKhoan = 4; break;
        }

        userModel.update(entity).then(n => {
            res.redirect('/admin/user');
        }).catch(err => {
            console.log(err);
            res.end('error');
        })
    })
})

router.get('/register', (req, res, next) => {
    var types = [];
    for (var i = 1; i < StrTypes.length; i++) {
        var temp = new Object;
        temp.name = StrTypes[i];
        if (i == 1) {
            temp.isSelected = true;
        }
        temp.value = i;
        types.push(temp);
    }
    catModel.all().then(rows => {
        res.render('admin/user/register', {
            types: types,
            categories: rows
        });
    }).catch(err => {
        console.log(err);
        res.end('err');
    })

})

router.post('/register', (req, res, next) => {
    var entity = new Object;
    entity.ten = req.body.name;
    entity.username = req.body.username;
    entity.password = bcrypt.hashSync(req.body.password, saltRound);
    entity.email = req.body.email;
    entity.code = randomstring.generate(15);
    entity.daXoa = 0;
    try {
        entity.ngaySinh = moment(req.body.dob, 'DD/MM/YYYY').format('YYYY-MM-DD');
    } catch (err) {
        entity.ngaySinh = null;
    }

    entity.loaiTaiKhoan = req.body.optradio;
    switch (entity.loaiTaiKhoan) {
        case "1":
            try {
                entity.HSD = moment(req.body.HSD, 'DD/MM/YYYY').format('YYYY-MM-DD');
            } catch (err) {
                entity.HSD = null;
            }; break;
        case "2": entity.butDanh = req.body.author; break;
        case "3": entity.idChuyenMuc = req.body.category; break;
    }

    userModel.add(entity).then(rows => {
        res.redirect('/admin/user');
    }).catch(err => {
        console.log(err);
        res.end('err');
    })
})


router.post('/:username/extend', (req, res, next) => {
    var username = req.params.username;
    userModel.single(username).then(rows => {
        var user = rows[0];
        var days = req.body.days;
        var date = moment(user.HSD).add(days, 'days').format('YYYY-MM-DD');
        user.HSD = date;
        userModel.update(user).then(n => {
            res.redirect('/admin/user/' + username + '/edit');
        }).catch(err => {
            console.log(err);
            res.end('error');
        });
    }).catch(err => {
        console.log(err);
        res.end('error');
    });
})
module.exports = router;