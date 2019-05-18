var chuyenmuc_model=require('../models/chuyenmuc.model');
var baiviet_model=require('..//models/baiviet.model');
function getChuyenMuc(chuyenmuc,baiviet){
    chuyenmuc.forEach(element => {
        if(element.idChuyenMuc==baiviet.idChuyenMuc){
            baiviet.tenChuyenMuc=element.tenChuyenMuc;
        }
    });
}
module.exports={
    loadData:()=> Promise.all([chuyenmuc_model.mapping(), baiviet_model.all()]).then((v)=>{
        var trangchu=Object();
        trangchu.baivietnoibat=v[1];
        trangchu.baivietxemnhieunhat=v[1];
        trangchu.baiviettop10=v[1];
        trangchu.baivietmoinhat=v[1];
        trangchu.chuyenmuc=v[0];
        trangchu.baivietmoinhat.forEach(e=>{
            getChuyenMuc(trangchu.chuyenmuc,e);
        })
        return trangchu;
    })
};