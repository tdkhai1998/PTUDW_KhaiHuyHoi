var express = require("express");
var router = express.Router();
var url = require("url");
var baiviet_model = require("../../models/trangchu/baiviet.model");
var chuyenmuc_model = require("../../models/trangchu/chuyenmuc.model");
var tag_model = require("../../models/trangchu/tag.model");

/* GET home page. */
var trangcuaban = (loai) => {
  switch (loai) {
    case "1":
      return "/";
    case "2":
      return "/writer_vietbai";
    case "3":
      return "/editor_xemdanhsach";
    case "4":
      return "/admin/tags";
    default:
      return "/";
  }
};
router.get("/", function (req, res, next) {
  Promise.all([
    chuyenmuc_model.mapping(),
    baiviet_model.getTagsForBaiViets(baiviet_model.baiVietNoiBat()),
    baiviet_model.getTagsForBaiViets(baiviet_model.baivietxemnhieunhat()),
    baiviet_model.getTagsForBaiViets(baiviet_model.baiVietMoiNhat(10, 0)),
    baiviet_model.getTagsForBaiViets(baiviet_model.top10chuyenmuc()),
  ])
    .then(
      ([
        chuyenmuc,
        baivietnoibat,
        baivietxemnhieunhat,
        baivietmoinhat,
        top10chuyenmuc,
      ]) => {
        var m = req.session.message;
        req.session.message = null;
        res.render("TrangChu/trangchu", {
          title: "Trang chủ",
          message: m,
          layout: "main",
          chuyenmuc,
          daDangNhap: req.isAuthenticated(),
          user: req.user,
          trangcuaban: req.user ? trangcuaban(req.user.loaiTaiKhoan) : 5,
          baivietmoinhat,
          baivietnoibat,
          baivietxemnhieunhat,
          top10chuyenmuc,
        });
      }
    )
    .catch((err) => {
      next(err);
    });
});
router.get("/tags", function (req, res, next) {
  Promise.all([
    chuyenmuc_model.mapping(),
    tag_model.all(),
    baiviet_model.baiVietMoiNhat(5, 0),
  ]).then(([chuyenmuc, tags, baivietmoinhat]) => {
    var m = req.session.message;
    req.session.message = null;
    res.render("TrangChu/tags", {
      message: req.session.message,
      title: "Bài Viết Theo TAG",
      layout: "main",
      chuyenmuc,
      daDangNhap: req.isAuthenticated(),
      user: req.user,
      baivietmoinhat,
      trangcuaban: req.user ? trangcuaban(req.user.loaiTaiKhoan) : 5,
      tags,
    });
  });
});
router.post("/tags", function (req, res, next) {
  res.redirect(
    url.format({
      pathname: "/timkiem",
      query: req.body,
    })
  );
});
router.get("/tag/:id", function (req, res, next) {
  var id = req.params.id;
  if (isNaN(id)) {
    req.session.message = "Tag không hợp lệ";
    return res.redirect("/");
  }
  var page = req.query.page ? req.query.page : 1;
  var query = req.query.page ? req.url : req.url + "?";
  page = page <= 0 ? 1 : page;
  var limit = 5;
  var offset = (page - 1) * limit;
  var bvWithTags = baiviet_model.getTagsForBaiViets(
    baiviet_model.baiVietChuaTag(id, limit, offset)
  );
  Promise.all([
    chuyenmuc_model.mapping(),
    baiviet_model.tongBaiVietChuaTag(id),
    bvWithTags,
    tag_model.all(),
    baiviet_model.baiVietMoiNhat(5, 0),
  ]).then(([chuyenmuc, tongbaiviet, baiviet, tags, baivietmoinhat]) => {
    var n = tongbaiviet[0].tong;
    n = n / limit;
    var pages = [];
    for (var i = 0; i < n; i++) {
      var obj = new Object();
      obj.giatri = i + 1;
      obj.id = id;
      if (page == i + 1) obj.active = true;
      else obj.active = false;
      obj.url = query;
      pages.push(obj);
    }
    console.log(tags);
    var tag = null;
    if (tags) {
      tags.forEach((e) => {
        if (e.idTag == id) {
          tag = e;
        }
      });
    }
    if (tag == null) {
      req.session.message = " Không tìm thấy";
      res.redirect("/");
    } else {
      var m = req.session.message;
      req.session.message = null;
      res.render("TrangChu/tag", {
        message: req.session.message,
        title: "Bài Viết Theo TAG",
        layout: "main",
        chuyenmuc,
        baiviet,
        trangcuaban: req.user ? trangcuaban(req.user.loaiTaiKhoan) : 5,
        daDangNhap: req.isAuthenticated(),
        user: req.user,
        pages,
        baivietmoinhat,
        tags,
        tag,
      });
    }
  });
});
router.post("/tag/:id", function (req, res, next) {
  res.redirect(
    url.format({
      pathname: "/timkiem",
      query: req.body,
    })
  );
});
router.post("/", function (req, res, next) {
  res.redirect(
    url.format({
      pathname: "/timkiem",
      query: req.body,
    })
  );
});
router.post("/chuyenmuc/:id", function (req, res, next) {
  console.log("getchuyenmuc");
  res.redirect(
    url.format({
      pathname: "/timkiem",
      query: req.body,
    })
  );
});
router.post("/", function (req, res, next) {
  res.redirect(
    url.format({
      pathname: "/timkiem",
      query: req.body,
    })
  );
});
router.post("/timkiem", function (req, res, next) {
  res.redirect(
    url.format({
      pathname: "/timkiem",
      query: req.body,
    })
  );
});
router.get("/chuyenmuc/:id", function (req, res, next) {
  var id = req.params.id;
  if (isNaN(id)) {
    req.session.message = "Chuyên mục không hợp lệ";
    return res.redirect("/");
  }
  var page = req.query.page ? req.query.page : 1;
  var query = req.query.page ? req.url : req.url + "?";
  page = page <= 0 ? 1 : page;
  var limit = 5;
  var offset = (page - 1) * limit;
  var bvWithTags = baiviet_model.getTagsForBaiViets(
    baiviet_model.tatCaBaiVietChuyenMuc(id, limit, offset)
  );
  Promise.all([
    chuyenmuc_model.mapping(),
    baiviet_model.tongBaiVietChuyenMuc(id),
    bvWithTags,
    baiviet_model.baiVietMoiNhat(5, 0),
  ])
    .then(([chuyenmuc, tongbaiviet, baiviet, baivietmoinhat]) => {
      var check = true;
      console.log(baiviet);
      if (chuyenmuc) {
        chuyenmuc.forEach((e) => {
          if (e.idChuyenMuc == id) {
            check = false;
            var n = tongbaiviet[0].tong;
            n = n / limit;
            var pages = [];
            for (var i = 0; i < n; i++) {
              var obj = new Object();
              obj.giatri = i + 1;
              obj.id = id;
              if (page == i + 1) obj.active = true;
              else obj.active = false;
              obj.url = query;
              pages.push(obj);
            }
            var m = req.session.message;
            req.session.message = null;
            e.active = true;
            if (!e.chuyenMucCha) {
              e.Cha.active = true;
            }
            console.log(pages);
            res.render("TrangChu/chuyenmuc", {
              active: true,
              title: "Bài Viết Theo Chuyên Mục",
              message: req.session.message,
              empty: baiviet.length == 0 ? true : false,
              layout: "main",
              chuyenmuc,
              tenchuyenmuc: e.tenChuyenMuc,
              empty: baiviet.length == 0 ? true : false,
              baiviet,
              trangcuaban: req.user ? trangcuaban(req.user.loaiTaiKhoan) : 5,
              daDangNhap: req.isAuthenticated(),
              user: req.user,
              pages,
              baivietmoinhat,
            });
          }
        });
      }
      if (check) {
        req.session.message = "Chuyên mục không hợp lệ";
        return res.redirect("/");
      }
    })
    .catch((e) => {
      next(e);
    });
});
router.get("/timkiem", function (req, res, next) {
  var page = req.query.page ? req.query.page : 1;
  page = page <= 0 ? 1 : page;
  var limit = 5;
  var offset = (page - 1) * limit;
  var key = req.query.key;
  var bvWithTags = null;
  var countSearch = null;
  if (req.query.fulltext) {
    bvWithTags = baiviet_model.getTagsForBaiViets(
      baiviet_model.full_text_search(key, limit, offset)
    );
    countSearch = baiviet_model.count_full_text_search(key);
  } else {
    var field = [];
    if (req.query.tieuDe) field.push("tieuDe");
    if (req.query.noiDung) field.push("noiDung");
    if (req.query.moTa) field.push("moTa");
    if (field.length == 0) field.push("tieuDe");
    bvWithTags = baiviet_model.getTagsForBaiViets(
      baiviet_model.multiSimpleSearch(field, key, limit, offset)
    );
    countSearch = baiviet_model.count_multiSimpleSearch(field, key);
  }
  Promise.all([
    chuyenmuc_model.mapping(),
    countSearch,
    bvWithTags,
    baiviet_model.baiVietMoiNhat(5, 0),
  ])
    .then(([chuyenmuc, tongbaiviet, baiviet, baivietmoinhat]) => {
      var check = true;
      check = false;
      var n = tongbaiviet;
      n = n / limit;
      var pages = [];
      console.log(tongbaiviet);
      for (var i = 0; i < n; i++) {
        var obj = new Object();
        obj.giatri = i + 1;
        if (page == i + 1) obj.active = true;
        else obj.active = false;
        obj.url = req.url.split("page")[0];
        pages.push(obj);
      }

      var m = req.session.message;
      req.session.message = null;
      console.log(pages);
      res.render("TrangChu/chuyenmuc", {
        title: "Tìm kiếm",
        key,
        message: req.session.message,
        empty: baiviet.length == 0 ? true : false,
        layout: "main",
        chuyenmuc,
        baiviet,
        key: key,
        daDangNhap: req.isAuthenticated(),
        user: req.user,
        trangcuaban: req.user ? trangcuaban(req.user.loaiTaiKhoan) : 5,
        pages,
        baivietmoinhat,
      });
    })
    .catch((e) => next(e));
});
module.exports = router;
