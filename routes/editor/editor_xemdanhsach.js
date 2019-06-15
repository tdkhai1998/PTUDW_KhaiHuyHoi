var express = require('express');
var router = express.Router();
var load =  require('../../models/editor/editor_xemdanhsach.model')


router.get('/', function(req, res, next) {
  load.all()
  .then(rows => {
    res.render('./editor/editor_xemdanhsach_body', {
      row: rows,
      layout: '../editor/editor_xemdanhsach_layout'
    });
  }).catch(err => {
    console.log(err);
    res.end('error occured.')
  });
});

router.post('/tuchoi', function(req, res, next) {
  var entity = req.body;
  Promise.all([load.tuchoi(entity),load.updatestt(entity.idBaiViet)]).then(
    res.redirect('editor_xemdanhsach')
  )
});

module.exports = router;
