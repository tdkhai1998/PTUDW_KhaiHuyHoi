var express = require('express');
var router = express.Router();
var load = require('../../models/editor/editor_duyetbaiviet.model')
var moment = require('moment');
var auth = require('../../middleware/auth').authEditor;
var oldtag = "";

router.get('/', auth, function(req, res, next) {

    Promise.all([load.one(req.query.id), load.tags(req.query.id), load.alltag(), load.mapping(req.user.idChuyenMuc)])
        .then(([bv, tag, alltags, chuyenmuc]) => {
            console.log(alltags)
            var inputtag = "";
            for (var i = 0; i < tag.length; i++) {
                inputtag = inputtag + "," + tag[i].idTag;
            }
            oldtag = inputtag;
            res.render('./editor/editor_duyetbaiviet_body', {
                bv: bv[0],
                tags: tag,
                inputtags: inputtag,
                alltag: alltags,
                cm: chuyenmuc,
                user: req.user,
                layout: '../editor/editor_duyetbaiviet_layout'
            })
        }).catch(e => next(e));

});


router.post('/tuchoi', function(req, res, next) {
    var entity = req.body;
    console.log(entity)
    Promise.all([load.tuchoi(entity), load.updatestt('bituchoi', entity.idBaiViet, req.user.username)]).then(
        res.redirect('../editor_xemdanhsach')
    )
});

router.post('/duyet', function(req, res, next) {
    console.log(req.body);

    var entity = req.body;
    var chuyenmuc = req.body.chuyenmuc;
    console.log(oldtag + " => " + entity.tag)
    tags = entity.tag.split(",");
    var time = moment(entity.ngaydang, 'MM/DD/YYYY HH:mm a').format('YYYY/MM/DD HH:mm:ss')
    console.log(time);
    oldtag = oldtag + ",";
    load.updatestt('choxuatban', entity.idBaiViet, req.user.username)
    load.updatebv(time, chuyenmuc, entity.idBaiViet).then(_ => {
        {
            for (var i = 1; i < tags.length; i++) {
                if (oldtag.indexOf("," + tags[i] + ",") == -1) //tag mới
                    load.addtag(tags[i], entity.idBaiViet);
                else //tag cũ
                {
                    oldtag = oldtag.replace("," + tags[i], "");
                }
            }
            oldtag = oldtag.split(",");
            for (var i = 1; i < oldtag.length - 1; i++) {
                load.deletetag(oldtag[i], entity.idBaiViet)
            }
        }
        res.redirect('../editor_xemdanhsach')
    })
});


module.exports = router;