var express = require('express');
var userModel = require('../../models/admin/user.model');

var router = express.Router();

router.get('/',(req,res,next)=>{
    var record =30;
    var keyword=(req.query.keyword)?req.query.keyword:"";
    var page =(req.query.page)?req.query.page:1;
    var type=(req.query.type)?req.query.type:0;
    userModel.countUser(keyword).then(n=>{
       
        var count = Math.floor( n[0].count/record)+1;
        var pages = [];
        for(var i =0; i<count;i++){
            var temp = new Object;
            temp.page=i+1;
            if(page==i+1){
                temp.active=true;
            }
            pages.push(temp);
        }
        var StrTypes=["Tất cả","Độc giả","Writer","Editor","Administrator"];
        var types=[];
        for(var i =0;i<5;i++){
            var temp = new Object;
            temp.name=StrTypes[i];
            if(type==i){
                temp.active=true;
            }
            temp.type=i;
            types.push(temp);
        }
        
        userModel.loadUser(page,record,type,keyword).then(rows=>{
            var users = rows;
            users.forEach(element => {
                switch(element.loaiTaiKhoan){
                    case "1": element.loai="Độc giả"; break;
                    case "2": element.loai="Writer"; break;
                    case "3": element.loai="Editor"; break;
                    case "4": element.loai="Admintrator"; break;
                }
              
            });
            res.render('admin/user/index',{
                users:rows,
                pages:pages,
                types:types,
                type:req.query.typeype,
                keyword: req.query.keyword
            })
        }).catch(err=>{
            console.log(err);
            res.end('error');
        })
        
    }).catch(err=>{
        console.log(err);
        res.end('error');
    })
        
    
})

router.get('/remove',(req,res,next)=>{
    var page =isNaN(req.query.page)?1:req.query.page;
    var type=isNaN(req.query.type)?0:req.query.type;
    var username = req.query.username;
    
    userModel.delete(username).then(n=>{
        var url='/admin/user/index'+'?type='+type+
        res.redirect('/admin/user/index');
    }).catch(err=>{

    })
})
module.exports=router;