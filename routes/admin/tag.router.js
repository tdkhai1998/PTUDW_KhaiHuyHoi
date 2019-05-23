var express = require('express');
var tagModel = require('../../models/admin/tag.model');

var router = express.Router();

router.get('/',(req,res)=>{
    tagModel.all().then(rows=>{
        res.render('admin/tag/index.hbs',{
            tags: rows,
            layout: './admin/tag/layout'
        });
        
    }).catch(err=>{
        res.end('error occured.')
    });
})


router.post('',(req,res)=>{
    var entity = req.body;
    entity.daXoa=0;
    console.log(entity);
    tagModel.add(entity).then(n=>{
        res.redirect('/admin/tags');
    }).catch(err=>{
        console.log(err);
      res.end('error occured.')
    });

})
module.exports = router;