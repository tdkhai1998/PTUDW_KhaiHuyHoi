var express = require('express');
var router = express.Router();
var model=require('../models/chuyenmuc.model')
/* GET home page. */
router.get('/', function(req, res, next) {
   model.mapping().then((data)=>{
       console.log(data);
       var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    res.render('./TrangChu/trangchu', { 
        layout: 'layout',
        rows: data,
        url: fullUrl
    });
   }).catch((err)=>{
       console.log(err);
   })
});

module.exports = router;
