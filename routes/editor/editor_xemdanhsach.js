var express = require('express');
var router = express.Router();
var load =  require('../../dao/loaddanhsach')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('./editor/editor_xemdanhsach_body', {
    tieude: load.idBaiViet ,
    mota:'test test test test',
    layout:'./editor/editor_xemdanhsach_layout',
  });
});

module.exports = router;
