var express = require('express');
var router = express.Router();
var load =  require('../../models/writer/writer_xemdanhsach.model')


router.get('/', function(req, res, next) {
//   if (req.isAuthenticated() && req.user.loaiTaiKhoan == 3 ){
//     console.log(req.user)
      Promise.all([load.allbyuserStt('huy','bituchoi')])
      .then(([rows]) => {
      
        res.render('./writer/writer_chuaduocduyet_body', {
        //   user: req.user,
          tab:true,
          row: rows,
          layout: '../writer/writer_chuaduocduyet_layout'
        });
      }).catch(err => {
        console.log(err);
        res.end('error occured.')
      });
    // }
    // else
    // res.redirect('account/login')
});



module.exports = router;
