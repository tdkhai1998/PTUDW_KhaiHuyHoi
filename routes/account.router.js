var express = require('express');
var router = express.Router();
var userModel = require('../models/account/account.model')
var bcrypt = require('bcrypt');
var passport = require('passport');
var nodemailer = require('nodemailer');
var moment = require('moment');
var randomstring = require("randomstring");

router.get('/register', (req, res, next) => {
  res.render('account/register', {
    layout: 'account_layout',
  });
})


router.get('/is-available', (req, res, next) => {
  var username = req.query.username;
  userModel.single(username).then(rows => {
    if (rows.length > 0) {
      return res.json(false);
    } else {
      return res.json(true);
    }
  })
})



router.get('/is-available2', (req, res, next) => {
  var username = req.query.username;
  userModel.single(username).then(rows => {
    if (rows.length > 0) {
      return res.json(true);
    } else {
      return res.json(false);
    }
  })
})

router.get('/forgot-password',(req,res,next)=>{
  res.render('account/forgot_password',{
    layout: 'account_layout'
  });
})

router.post('/forgot-password',(req,res,next)=>{
  var username= req.body.username;
  var email = req.body.email;
  userModel.single(username).then(rows=>{
    var user = rows[0];
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
             user: 'quocvu142@gmail.com',
             pass: 'quochoi42'
         }
     });
     const mailOptions = {
      from: 'quocvu142@gmail.com', // sender address
      to: 'quochoi142@gmail.com', // list of receivers
      subject: 'Forgot password', // Subject line
      html: '<a href="http://localhost:3000/account/forgot-password"><b>Click here to reset password</b></a>'// plain text body
    };

    transporter.sendMail(mailOptions, function (err, info) {
      if(err)
        console.log(err)
      else
        console.log(info);
   });
  })
})

router.post('/register', (req, res, next) => {
  var entity = new Object;
  var saltRounds = 10;
  var password = bcrypt.hashSync(req.body.password, saltRounds);
  entity.username = req.body.username;
  entity.password = password;
  entity.ten = req.body.name;
  entity.loaiTaiKhoan = req.body.optradio;
  if (entity.loaiTaiKhoan == "2") {
    entity.idChuyenMuc = req.body.category;
  } else {
    entity.idChuyenMuc = null;
    var date = moment().add(30,'days').format('YYYY-MM-DD');
    entity.HSD=date;

  }
  entity.daXoa = 0;
  entity.code=randomstring.generate(15); 
  userModel.add(entity).then(n => {
    res.redirect('/admin/categories');
  }).catch(err => {
    console.log(err);
    res.end('error occured');
  })

})


router.get('/reset-password', (req, res, next) => {
  res.render('account/reset_password', {
    layout: 'account_layout'
  });
})

router.post('/reset-password', (req, res, next) => {
  var old = req.body.old_password;
  var ret = bcrypt.compareSync(old, req.user.password);
  if (ret) {
    var entity=req.user;
    var saltRounds = 10;
    var password = bcrypt.hashSync(req.body.password, saltRounds);
    entity.password=password;
    userModel.update(entity).then(n=>{
      res.redirect('/admin/categories');
    }).catch(err=>{
      console.log(err);
      res.end('error occured');
    })
  }
  else{
    res.end('error occured');
  }
})


router.get('/login', (req, res, next) => {
  res.render('account/login', {
    layout: 'account_layout'
  });
})


router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err)
      return next(err);

    if (!user) {
      return res.render('account/register')
    }

    req.logIn(user, err => {
      if (err)
        return next(err);

      return res.redirect('/admin/categories');
    });
  })(req, res, next);
})
module.exports = router;