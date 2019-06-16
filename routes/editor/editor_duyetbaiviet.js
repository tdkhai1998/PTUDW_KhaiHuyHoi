var express = require('express');
var router = express.Router();
var load =  require('../../models/editor/editor_duyetbaiviet.model')
var moment = require('moment');


router.get('/', function(req, res, next) {
  if (req.isAuthenticated() && req.user.loaiTaiKhoan == 3){
  Promise.all([load.one(req.query.id),load.tags(req.query.id),load.alltag(),load.mapping(req.user.idChuyenMuc)])
  .then(([bv,tag,alltags,chuyenmuc]) => {
    console.log(alltags)
    res.render('./editor/editor_duyetbaiviet_body', {
      bv: bv[0],
      tags: tag,
      alltag: alltags,
      cm:chuyenmuc,
      user:req.user,
      layout: '../editor/editor_duyetbaiviet_layout'
    })
  });
  }
  else
    res.redirect('account/login')
});


router.post('/tuchoi', function(req, res, next) {
  var entity = req.body;
  console.log(entity)
  Promise.all([load.tuchoi(entity),load.updatestt('bituchoi',entity.idBaiViet, req.user.username)]).then(
    res.redirect('../editor_xemdanhsach')
  )
});

router.post('/duyet', function(req, res, next) {
  console.log(req.body);
  var entity = req.body;
  var chuyenmuc = req.body.chuyenmuc;
  var tags = entity.tag.split(",");
  var time = moment(entity.ngaydang,'MM/DD/YYYY HH:mm a').format('YYYY/MM/DD HH:mm:ss')
  console.log(time);
  load.updatestt('choxuatban',entity.idBaiViet, req.user.username)
    load.updatebv(time, chuyenmuc,entity.idBaiViet).then(_ =>{
    {
        for(var i = 1; i< tags.length ; i++)
        { 
            load.addtag(tags[i],entity.idBaiViet);          
        }}
       res.redirect('../editor_xemdanhsach')
    })
});


module.exports = router;
