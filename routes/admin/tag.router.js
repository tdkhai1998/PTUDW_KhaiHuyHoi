var express = require('express');
var tagModel = require('../../models/admin/tag.model');
var auth = require('../../middleware/auth').authAdmin;
var router = express.Router();

router.get('/', auth, (req, res) => {
    res.locals.tag = true;
    tagModel.all().then(rows => {
        res.render('admin/tag/index.hbs', {
            tags: rows,
        });

    }).catch(err => {
        res.end('error occured.')
    });
})


router.post('', auth, (req, res) => {
    var entity = req.body;
    entity.daXoa = 0;
    console.log(entity);
    tagModel.add(entity).then(n => {
        res.redirect('/admin/tags');
    }).catch(err => {
        console.log(err);
        res.end('error occured.')
    });

})


router.get('/update/:id', auth, (req, res) => {
    var id = req.params.id;
    // console.log(req.body);
    if (isNaN(id)) {
        res.render('admin/tag/update', {

            err: true
        });
    }
    tagModel.single(id).then(rows => {
        if (rows.length > 0) {
            res.render('admin/tag/update', {

                tag: rows[0],
                err: false
            })
        } else {
            res.render('admin/tag/update', {

                err: true
            });
        }
    }).catch(err => {
        console.log(err);
        res.end('error occured.')
    });
})


router.post('/update', auth, (req, res) => {
    var entity = req.body;
    entity.idTag = req.query.id;
    entity.daXoa = 0;
    tagModel.update(entity).then(n => {
        res.redirect('/admin/tags');
    }).catch(err => {
        console.log(err);
        res.end('error occured.')
    })

})

router.get('/delete', auth, (req, res) => {
    var id = req.query.idTag;
    tagModel.delete(id).then(n => {
        res.redirect('/admin/tags');
    }).catch(err => {
        console.log(err);
        res.end('error occured.');
    })
})

module.exports = router;