var express = require('express');
var router = express.Router();
var load =  require('../../models/writer/writer_vietbai.model')

router.get('/', function(req, res, next) {
  Promise.all([load.alltag(),load.mapping()])
  .then(([alltags,chuyenmuc]) => {
    console.log(chuyenmuc)
    res.render('./writer/writer_vietbai_body', {
        cm: chuyenmuc,
        alltag: alltags,
        layout: '../writer/writer_vietbai_layout',  
      });
  });
});

router.post('/', function(req,res,next){
  var value = req.body;
  var entity =  new Object;
  entity.tieuDe = value.tieude;
  entity.moTa = value.tomtat;
  entity.anhDaiDien = 'x';
  entity.noiDung = value.noidung;
  entity.idChuyenMuc = value.chuyenmuc;
  entity.nguoiDang = 'huy';
  entity.trangThai = "chuaduocduyet";
  entity.ngayDang = new Date();
  entity.daXoa = '0';
  entity.luotxem = '0';
  entity.premium = '0';
  var tags = value.tag.split(",");
  if (tags.length > 2)
  load.add(entity).then(id => {
    {
     
       for (var i=1; i<tags.length;i++)
        {
          console.log(tags[i]);
          load.addtag(tags[i],id)
        }
      }
  })
})
  

 

  module.exports = router;