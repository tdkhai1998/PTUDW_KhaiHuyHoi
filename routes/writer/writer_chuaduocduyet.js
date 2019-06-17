var express = require('express');
var router = express.Router();
var load = require('../../models/writer/writer_xemdanhsach.model')
var auth = require('../../middleware/auth').authWriter;

router.get('/', auth, function(req, res, next) {
    var page = (req.query.page ? req.query.page : 1);
    page = page <= 0 ? 1 : page;
    var limit = 5;
    var offset = (page - 1) * limit;
    Promise.all([load.allbyuserStt(req.user.username, 'chuaduocduyet', limit, offset), load.countAllByUserStt(req.user.username, 'chuaduocduyet')])
        .then(([rows, count]) => {
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
            res.render('writer/writer_chuaduocduyet_body', {
                user: req.user,
                tab: false,
                pages,
                row: rows,
                layout: '../writer/writer_chuaduocduyet_layout'
            });
        }).catch(e => next(e));

});



module.exports = router;