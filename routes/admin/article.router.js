var express = require('express');
var router = express.Router();
var articleModel = require('../../models/admin/article.model');
var auth = require('../../middleware/auth').authAdmin;

var record = 10;

var stt = ["Tất cả", "Đợi duyệt", "Đợi xuất bản", "Đã Xuất bản", "Đã từ chối"];
var val = [null, "chuaduocduyet", "choxuatban", "daxuatban", "bituchoi"];
router.get('/inspect/:id', auth, (req, res, next) => {
    var id = req.params.id;
    articleModel.inspect(id).then(n => {
        res.redirect('/admin/article');
    }).catch(err => {
        console.log(err);
        res.end('error');
    });
})

router.get('/', auth, (req, res, next) => {
    res.locals.article = true;
    var page = (req.query.page) ? parseInt(req.query.page) : 1;
    var type = req.query.type;
    var haveNext, havePrev;
    if (page == 1) {
        havePrev = true;
    }

    var types = [];
    for (var i = 0; i < stt.length; i++) {
        var temp = new Object;
        temp.name = stt[i];
        temp.value = val[i];
        if (val[i] == type) {
            temp.isActive = true;
        }
        types.push(temp);
    }
    articleModel.count(type).then(countRecord => {
        var count = Math.floor(countRecord[0].count / record) + 1;
        if (page == count) {
            haveNext = true;
        }
        articleModel.loadArticles(page, record, type).then(rows => {
            rows.forEach(element => {
                if (element.trangThai == 'chuaduocduyet' || element.trangThai == 'choxuatban') {
                    element.haveInspect = true;

                }
                element.page = page;
            });

            res.render('admin/article/index', {
                title: 'Quản lí',
                articles: rows,
                next: haveNext,
                prev: havePrev,
                types: types,
                type: req.query.type,
                page: page,
                pageNext: page + 1,
                pagePrev: page - 1
            })
        }).catch(err => {
            console.log(err);
            res.end('error');
        });

    }).catch(err => {
        console.log(err);
        res.end('error');
    });

})


router.get('/:id/remove', auth, (req, res, next) => {
    var id = req.params.id;
    articleModel.delete(id).then(n => {
        var page = req.query.page;

        var url = '/admin/article?page=' + page;
        if (req.query.type) {
            url = url + '&type=' + req.query.type;
        }
        res.redirect(url);
    }).catch(err => {
        console.log(err);
        res.end('error');
    })
})

module.exports = router;