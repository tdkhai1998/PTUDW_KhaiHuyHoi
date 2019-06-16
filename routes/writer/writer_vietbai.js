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


router.get('/', function(req, res, next) {
    if (req.isAuthenticated()) {
        console.log("da dn");
        res.redirect('/');
    } else {
        console.log('chua dn');
        res.redirect('/chuaDangNhap');
    }


    // if (req.isAuthenticated() && req.user.loaiTaiKhoan == 2) {
    //     console.log("zsxcfvgbhnj");
    //     Promise.all([load.alltag(), load.mapping()])
    //         .then(([alltags, chuyenmuc]) => {
    //             // console.log(chuyenmuc)
    //             res.render('./writer/writer_vietbai_body', {
    //                 cm: chuyenmuc,
    //                 alltag: alltags,
    //                 layout: '../writer/writer_vietbai_layout',
    //             });
    //         });
    // } else {
    //     console.log(req.isAuthenticated());
    //     if (req.isAuthenticated()) {
    //         console.log("sd");
    //         res.redirect('/');
    //     } else {
    //         console.log("dfvgb");
    //         res.redirect('account/login');
    //     }
    // }
});

router.post('/', upload.single('anhdaidien'), function(req, res, next) {
    if (!req.file) {
        console.log("No file received");
        return res.send({
            Message: "No image uploaded ! Please try again !"
        });
    }
    var value = req.body;
    var entity = new Object;
    entity.tieuDe = value.tieude;
    entity.moTa = value.tomtat;
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

    var tags = value.tag.split(",");
    if (tags.length > 1)
        load.add(entity).then(id => {
            {

                for (var i = 1; i < tags.length; i++) {
                    console.log(tags[i]);
                    load.addtag(tags[i], id)
                }
            }
            res.redirect('/writer_vietbai')
        })
})




module.exports = router;