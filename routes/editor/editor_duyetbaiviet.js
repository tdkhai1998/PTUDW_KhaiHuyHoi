var express = require('express');
var router = express.Router();
var load =  require('../../models/editor/editor_duyetbaiviet.model')
var moment = require('moment');


router.get('/', function(req, res, next) {
  Promise.all([load.one(req.query.id),load.tags(req.query.id),load.alltag()])
  .then(([bv,tag,alltags]) => {
    console.log(alltags)
    res.render('./editor/editor_duyetbaiviet_body', {
      bv: bv[0],
      tags: tag,
      alltag: alltags,
      layout: '../editor/editor_duyetbaiviet_layout'
    })
  });
});


router.post('/tuchoi', function(req, res, next) {
  var entity = req.body;
  Promise.all([load.tuchoi(entity),load.update(entity.idBaiViet)]).then(
    res.redirect('../editor_xemdanhsach')
  )
});

router.post('/duyet', function(req, res, next) {
  console.log(req.body);
  var entity = req.body;
  var tags = entity.tag.split(",");
  var time = moment(entity.ngaydang,'MM/DD/YYYY HH:mm a').format('YYYY/MM/DD HH:mm:ss')
  console.log(time);
  load.chuyenmuc(entity.chuyenmuc).then(idcm =>{
    load.updatebv(time, idcm[0].idChuyenMuc,entity.idBaiViet).then(
      function(){
        for(var i = 0; i< tags.length ; i++)
        {
           var idTag = load.idtagfromname(tags[i]);
            load.addtag(idTag,entity.idBaiViet);
          }
        }
      ,
       res.redirect('../editor_xemdanhsach'),
    )
  })
});


module.exports = router;
