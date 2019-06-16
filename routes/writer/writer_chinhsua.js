var express = require('express');
var router = express.Router();
var load =  require('../../models/writer/writer_vietbai.model')
var multer = require('multer');
var filename = ""
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/uploads')
  },
  filename: (req, file, cb) => {
    filename = file.fieldname + '-' + Date.now()+".jpg"
    cb(null, filename)
  }
});
var upload = multer({storage: storage});

router.get('/', function(req, res, next) {
  if (req.isAuthenticated() && req.user.loaiTaiKhoan == 2){
  Promise.all([load.one(req.query.id),load.tags(req.query.id),load.alltag(),load.mapping()])
  .then(([bv,tag,alltags,chuyenmuc]) => {
    console.log(tag)
    res.render('./writer/writer_vietbai_body', {
      bv: bv[0],
      tags: tag,
      alltag: alltags,
      cm:chuyenmuc,
      user:req.user,
      layout: '../writer/writer_vietbai_layout'
    })
  });
  }
  else
    res.redirect('account/login')
});




router.post('/', upload.single('anhdaidien'), function(req,res,next){
 
  var value = req.body;
  var entity =  new Object;
  entity.idBaiViet = value.idBaiViet;
  entity.tieuDe = value.tieude;
  entity.moTa = value.tomtat;
  if(value.anhDaiDien != null)
    entity.anhDaiDien = '/images/uploads/' + filename;

  entity.noiDung = value.noidung;
  entity.idChuyenMuc = value.chuyenmuc;
  entity.nguoiDang = 'huy';
  entity.trangThai = "chuaduocduyet";
  entity.ngayDang = new Date();
  entity.daXoa = '0';
  entity.luotxem = '0';
  if(entity.premium == 1)
  entity.premium = '1';
  else
  entity.premium = '0';
  console.log(value)

  var tags = value.tag.split(",");
  if (tags.length > 1)
  load.update(entity).then(id => {
    {
     
       for (var i=1; i<tags.length;i++)
        {
          try {
            load.addtag(tags[i],value.idBaiViet)
          } catch (error) {
            
          }
         
        }
      }
      res.redirect('/writer_vietbai')
  })
})
  

 

  module.exports = router;