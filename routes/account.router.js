var express = require('express');
var router = express.Router();
var userModel = require('../models/account/account.model')
var bcrypt = require('bcrypt');
var passport = require('passport');
var nodemailer = require('nodemailer');
var moment = require('moment');
var randomstring = require("randomstring");
var auth = require('../middleware/auth');



var saltRounds = 10;
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
  }).catch(err => {
    console.log(err);
    return res.json(false);
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
  }).catch(err => {
    console.log(err);
    return res.json(false);
  })
})

router.get('/forgot-password', (req, res, next) => {
  res.render('account/forgot_password', {
    layout: 'account_layout'
  });
})

router.post('/forgot-password', (req, res, next) => {
  var username = req.body.username;
  var email = req.body.email;
  userModel.single(username).then(rows => {
    var user = rows[0];
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'quocvu142@gmail.com',
        pass: 'quochoi42'
      }
    });
    var url = 'http://localhost:3000/account/req-from-email?username=' + username + '&key=' + user.code;
    var html = '<a href="' + url + '"><b>Click here to reset password</b></a>';
    const mailOptions = {
      from: 'quocvu142@gmail.com', // sender address
      to: user.email, // list of receivers
      subject: 'Forgot password', // Subject line
      html: html// plain text body
    };

    transporter.sendMail(mailOptions, function (err, info) {
      if (err)
        console.log(err)
      else
        console.log(info);
    });
  })
})


router.get('/req-from-email', (req, res, next) => {
  var username = req.query.username;
  userModel.single(username).then(rows => {
    var user = rows[0];
    console.log(user);
    var key = req.query.key;
    if (key === user.code) {
      res.render('account/change_new_password', {
        layout: 'account_layout',
        username: username,
      })
    }
  }).catch(err => {
    console.log(err);
    res.end('error occured');
  })
})

router.post('/req-from-email', (req, res, next) => {
  var username = req.body.username;
  userModel.single(username).then(rows => {
    var entity = rows[0];
    var password = req.body.password;
    //console.log(req);

    entity.password = bcrypt.hashSync(password, saltRounds)
    entity.code = randomstring.generate(15);
    userModel.update(entity).then(n => {
      res.redirect('/account/login');
    }).catch(err => {
      console.log(err);
      res.end('error occured');
    })
  })
})

router.post('/register', (req, res, next) => {
  var entity = new Object;
  var password = bcrypt.hashSync(req.body.password, saltRounds);
  entity.username = req.body.username;
  entity.password = password;
  entity.ten = req.body.name;
  entity.loaiTaiKhoan = req.body.optradio;
  entity.email = req.body.email
  if (entity.loaiTaiKhoan == "2") {
    entity.idChuyenMuc = req.body.category;
  } else {
    entity.idChuyenMuc = null;
    var date = moment().add(30, 'days').format('YYYY-MM-DD');
    entity.HSD = date;

  }
  entity.daXoa = 0;
  entity.code = randomstring.generate(15);
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
    var entity = req.user;
    var password = bcrypt.hashSync(req.body.password, saltRounds);
    entity.password = password;
    userModel.update(entity).then(n => {
      res.redirect('/admin/categories');
    }).catch(err => {
      console.log(err);
      res.end('error occured');
    })
  }
  else {
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

      return res.redirect('/account/profile');
      //return res.redirect(req.originalUrl);
    });
  })(req, res, next);
})

router.get('/profile', auth, (req, res, next) => {


  var isWriter = false;
  var isEditor = false;
  var isUser = false;
  var cat;
  switch (req.user.loaiTaiKhoan) {
    case "1": isUser = true; break;
    case "2": isWriter = true; break;
    case "3": isEditor = true; break;
  }
  let dob = moment(req.user.ngaySinh).format('DD/MM/YYYY');
  console.log(dob);
  //var dob =  moment(req.user.ngaySinh, 'YYYY-MM-DD').format('DD/MM/YYYY'); 
  userModel.findCategory(req.user.idChuyenMuc).then(rows => {
    var cat = rows[0];
    res.render('account/profile', {
      user: req.user,
      isWriter: isWriter,
      isEditor: isEditor,
      isUser: isUser,
      dob: dob,
      HSD: moment(req.user.HSD).format('DD/MM/YYYY'),
      cat: cat
    });
  }).catch(err => {
    res.render('account/profile', {
      user: req.user,
      isWriter: isWriter,
      isEditor: isEditor,
      isUser: isUser,
      dob: dob,
      HSD: moment(req.user.HSD).format('DD/MM/YYYY'),

    })



  })
})


router.post('/profile', (req, res, next) => {
  var entity = req.user;

  var dob = moment(req.body.dob, 'DD/MM/YYYY').format('YYYY-MM-DD');
  entity.ngaySinh = dob;
  entity.ten = req.body.name;
 // entity.HSD = moment(req.user.HSD, 'YYYY-MM-DD').format('YYYY-MM-DD');
  switch (req.user.loaiTaiKhoan) {
    case "2": entity.butDanh = req.body.author; break;
    

  }
  userModel.update(entity).then(n => {
    res.end('done');
  }).catch(err => {
    console.log(err);
    res.end('error occdured');
  })
})

router.get('/edit',(req,res,next)=>{
  res.render('admin/account/edit_Account');
})
module.exports = router;