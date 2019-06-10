var express = require('express');
var router = express.Router();
var baiviet_model=require('../models/baiviet.model')
var chuyenmuc_model=require('../models/chuyenmuc.model');

router.get('/:id', function(req, res, next) {
    var idBaiViet=req.params.id;
    Promise.all([baiviet_model.mapping(idBaiViet), chuyenmuc_model.mapping()]).then(value=>{
       // console.log( value[0]);
        value[1].forEach(element => {
            if(element.idChuyenMuc==value[0].idChuyenMuc){
                value[0].tenChuyenMuc=element.tenChuyenMuc;
            }
        });
        res.render('./TrangChu/chitietbaiviet', { 
            layout: '/layouts/main-layout',
            bv: value[0],
            chuyenmuc:value[1]
        });
    })
});
module.exports = router;
