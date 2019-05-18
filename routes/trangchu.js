var express = require('express');
var router = express.Router();

var trangchu_model=require('../models/trangchu.model');
/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("khaitd");
    trangchu_model.loadData().then((data)=>{
        var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        console.log(data);
        res.render('./TrangChu/trangchu', { 
            layout: '/layouts/main-layout',
            rows: data,
            url: fullUrl
        });
    }).catch((err)=>{
        res.render("error");
    })
});
module.exports = router;
