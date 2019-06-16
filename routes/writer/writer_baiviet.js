var express = require('express');
var router = express.Router();
var load =  require('../../models/writer/writer_xemdanhsach.model')


router.get('/', function(req, res, next) {
   if (req.isAuthenticated() && req.user.loaiTaiKhoan == 2 ){
     console.log(req.user)
      Promise.all([load.one(req.query.id),load.lido(req.query.id)])
      .then(([rows,ld]) => {
          var lido = false;
          var ff = false;

      if (rows[0].trangThai == 'bituchoi' || rows[0].trangThai == 'chuaduocduyet')
      ff = true;
      if (rows[0].trangThai == 'bituchoi')
      lido = true;
        res.render('./writer/writer_baiviet_body', {
          user: req.user,
        lido: ld[0],
        fail: ff,
        reason:lido,
          row: rows[0],
          layout: '../writer/writer_baiviet_layout'
        });
      }).catch(err => {
        console.log(err);
        res.end('error occured.')
      })
    
    
    }
    else
    res.redirect('account/login')
});



module.exports = router;
