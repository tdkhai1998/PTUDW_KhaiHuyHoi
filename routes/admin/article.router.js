var express = require('express');
var router = express.Router();
var articleModel = require('../../models/admin/article.model');
router.get('/inspect/:id',(req,res,next)=>{
    var id = req.params.id;
    articleModel.inspect(id).then( n=>{
        res.redirect('/admin/article');
    }).catch(err=>{
        console.log(err);
        res.end('error');
    });
})

router.get('/',(req,res,next)=>{
    articleModel.all().then(rows=>{
        res.render('admin/article/index',{
            articles: rows,
        })
    }).catch(err=>{
        console.log(err);
        res.end('error');
    })
})


module.exports=router;