var express = require('express');
var catModel = require('../../models/admin/cat.model')

var router = express.Router();
var auth = require('../../middleware/auth').authAdmin;

router.get('/', auth, (req, res) => {
    res.locals.category = true;
    console.log(req.user);
    catModel.loadCatsParent(null).then(rows => {
        res.render('admin/cat/index', {
            title: 'Quản lí chuyên mục',
            categories: rows

        });

    }).catch(err => {
        res.end('error occured.')
    });
})


router.get('/add', auth, (req, res) => {
    catModel.loadCatsParent(null).then(rows => {

        res.render('admin/cat/add', {
            title: 'Thêm chuyên mục',
            categories: rows,

        });
    }).catch(err => {
        res.end('end occured');
    })

})

router.post('/add', auth, (req, res) => {
    var entity = req.body;
    console.log(entity.idCha);
    // delete entity[idCha];
    if (entity.chuyenMucCha == "") {
        entity.chuyenMucCha = null;

    }
    entity.daXoa = 0;
    catModel.add(entity).then(n => {
        res.redirect('/admin/categories');
    }).catch(err => {
        res.end('end ccured');
    })
})

router.get('/update/:id', auth, (req, res) => {
    var id = req.params.id;
    // var result;
    catModel.loadCatsParent(id).then(AllCategories => {
        catModel.single(id).then(rows => {
            console.log(AllCategories);
            var isNull = false;
            if (rows[0].chuyenMucCha == null) {
                isNull = true;
            }
            AllCategories.forEach(element => {
                if (element.idChuyenMuc == rows[0].chuyenMucCha)
                    element.isSelected = true;
            });
            catModel.loadCatsChild(id).then(catsChild => {
                var haveChild = false;
                if (catsChild.length !== 0) {
                    haveChild = true;
                }

                res.render('admin/cat/update', {
                    title: 'Cập nhật chuyên mục',
                    category: rows[0],
                    categories: AllCategories,
                    Null: isNull,
                    haveChild: haveChild,
                    childCategories: catsChild

                });
            }).catch(err => {
                console.log(err);
                res.end('error occured');
            });






        }).catch(err => {
            console.log(err);
            res.end('error occured');
        });
    }).catch(err => {
        console.log(err);
        res.end('error occured');
    });
})

router.post('/update/:id', auth, (req, res) => {
    var idChuyenMuc = req.params.id;
    var entity = req.body;
    if (entity.chuyenMucCha == "") {
        entity.chuyenMucCha = null;
    }
    entity.idChuyenMuc = idChuyenMuc;
    catModel.update(entity).then(n => {
        res.redirect('/admin/categories');
    }).catch(err => {
        res.end('error ecurred');
    })
})

router.get('/delete/:id', auth, (req, res) => {
    var id = req.params.id;
    catModel.delete(id).then(n => {
        res.redirect('/admin/categories');
    }).catch(err => {
        console.log(err);
        res.end('error occured');
    })
})
module.exports = router;