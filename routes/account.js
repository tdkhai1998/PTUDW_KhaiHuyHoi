var express = require('express');
var router = express.Router();
var userModel= require('../models/admin/user.model')
var bcrypt = require('bcrypt');
var passport = require('passport');

router.get('/register',(res,req,next)=>{
    req.render('login/login',{
      layout: './login/layout',
    });
})


router.get('/is-available',(req,res,next)=>{
    var username = req.query.username1;
    userModel.single(username).then(rows=>{
        if(rows.length>0){
            return res.json(false);
        }else{
            return res.json(true);
        }
    })
})


router.get('/login',(req,res,next)=>{
  req.render('/login/login',{
    layout: './login/layout',
  })
})

router.post('/register',(req,res,next)=>{
    var entity = new Object;
    var saltRounds=10;
    var password = bcrypt.hashSync(req.body.password, saltRounds);
    entity.username=req.body.username;
    entity.password=password;
    entity.ten=req.body.name;
    entity.loaiTaiKhoan = req.body.optradio;
    if(entity.loaiTaiKhoan=="2"){
        entity.idChuyenMuc=req.body.category;
    }else{
        entity.idChuyenMuc=null;
    }
    entity.daXoa=0;
    userModel.add(entity).then(n=>{
        res.redirect('/admin/categories');
    }).catch(err=>{
        console.log(err);
        res.end('error occured');
    })
    
})

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err)
        return next(err);
  
      if (!user) {
        return  res.render('login/register')
      }
  
      req.logIn(user, err => {
        if (err)
          return next(err);
  
        return res.redirect('/admin/categories');
      });
    })(req, res, next);
  })
module.exports=router;