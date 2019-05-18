var express = require('express');
var router = express.Router();
var model=require('../models/chuyenmuc.model')
/* GET home page. */
router.get('/', function(req, res, next) {
   model.all().then((v)=>{
    res.render('./TrangChu/trangchu', { 
        layout: 'layout',
        rows: v
    });
   }).catch((err)=>{
       console.log(err);
   })
  
});

module.exports = router;
