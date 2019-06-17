var express = require('express');
var router = express.Router();
var load = require('../../models/writer/writer_xemdanhsach.model');
var auth = require('../../middleware/auth').authWriter;


router.get('/', auth, function(req, res, next) {
    Promise.all([load.one(req.query.id), load.lido(req.query.id)])
        .then(([rows, ld]) => {
            var lido = false;
            var ff = false;
            if (rows[0].trangThai == 'bituchoi' || rows[0].trangThai == 'chuaduocduyet')
                ff = true;
            if (rows[0].trangThai == 'bituchoi')
                lido = true;
            res.render('writer/writer_baiviet_body', {
                user: req.user,
                lido: ld[0],
                fail: ff,
                reason: lido,
                row: rows[0],
                layout: '../writer/writer_baiviet_layout'
            });
        }).catch(e => next(e));
});
module.exports = router;