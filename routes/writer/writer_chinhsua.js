var express = require('express');
var router = express.Router();
var load = require('../../models/writer/writer_vietbai.model')
var multer = require('multer');
var filename = ""
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/uploads')
    },
    filename: (req, file, cb) => {
        filename = file.fieldname + '-' + Date.now() + ".jpg"
        cb(null, filename)
    }
});
var upload = multer({ storage: storage });
var oldtag =""
router.get('/', function(req, res, next) {
    if (req.isAuthenticated() && req.user.loaiTaiKhoan == 2) {
        Promise.all([load.one(req.query.id), load.tags(req.query.id), load.alltag(), load.mapping()])
            .then(([bv, tag, alltags, chuyenmuc]) => {
                var inputtag = "";
                for (var i = 0;i<tag.length ; i++)
                {
                    inputtag = inputtag + "," + tag[i].idTag;
                }
               oldtag = inputtag;
                console.log(tag)
                res.render('./writer/writer_vietbai_body', {
                    inputtags: inputtag,
                    chinhsua: true,
                    bv: bv[0],
                    tags: tag,
                    alltag: alltags,
                    cm: chuyenmuc,
                    user: req.user,
                    layout: '../writer/writer_vietbai_layout'
                })
            });
    } else
        res.redirect('account/login')
});




router.post('/', upload.single('anhdaidien'), function(req, res, next) {

    var value = req.body;
    var entity = new Object;
    entity.idBaiViet = value.idBaiViet;
    entity.tieuDe = value.tieude;
    entity.moTa = value.tomtat;
    if (req.file)
        entity.anhDaiDien = '/images/uploads/' + filename;

    entity.noiDung = value.noidung;
    entity.idChuyenMuc = value.chuyenmuc;
    entity.nguoiDang = req.user.username;
    entity.trangThai = "chuaduocduyet";
    entity.ngayDang = new Date();
    entity.daXoa = '0';
    entity.luotxem = '0';
    if (entity.premium == 1)
        entity.premium = '1';
    else
        entity.premium = '0';
    console.log(value)

    console.log(oldtag + " => " + value.tag )
    load.deleteLido(entity.idBaiViet);
    var tags = value.tag.split(",");
    oldtag = oldtag + ",";
    if (tags.length > 1)
        load.update(entity).then(id => {
            {

                for (var i = 1; i < tags.length; i++) {
                    if( oldtag.indexOf("," + tags[i] + ",") == -1 ) //tag mới
                     load.addtag(tags[i], value.idBaiViet);
                    else //tag cũ
                    {
                        oldtag = oldtag.replace(","+tags[i],"");
                    }          
                }
                oldtag = oldtag.split(",");
                for (var i = 1; i < oldtag.length - 1 ; i++) {
                    load.deletetag(oldtag[i], value.idBaiViet)
                }      
            }
            res.redirect('/writer_chuaduocduyet')
        })
})
module.exports = router;