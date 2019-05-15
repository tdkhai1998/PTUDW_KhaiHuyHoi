var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('editor_xemdanhsach_body', {tieude: 'test',mota:'test test test test',layout:'editor_xemdanhsach_layout'});
});

module.exports = router;
