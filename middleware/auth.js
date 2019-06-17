// module.exports = (req, res, next) => {
//   // if (!req.user) {
//   //   res.locals.url = req.originalUrl;
//   //   res.redirect('/account/login');
//   // } else next();
//   if (req.user && req.user.loaiTaiKhoan == "4") {
//     next();
//   } else {
//     req.session.sessionFlash = {
//       urlBack: req.baseUrl + req.url
//     }
//     res.redirect('/account/login');
//   }
// }


var check = (loai) => {
    switch (loai) {
        case "1":
            return "/"
        case "2":
            return "/writer_vietbai"
        case "3":
            return "/edior_xemdanhsach"
        case "4":
            return "/"
    }
}
module.exports = {
    authAdmin: (req, res, next) => {
        if (req.user) {
            if (req.user.loaiTaiKhoan != "4") {
                res.render('error', {
                    loi: '403',
                    urlBack: check(req.user.loaiTaiKhoan),
                    message: "Bạn không có quyền truy cập",
                    layout: false
                });
            } else
                next();
        } else {
            req.session.sessionFlash = {
                urlBack: req.baseUrl + req.url
            }
            res.redirect('/account/login');
        }
    },

    authWriter: (req, res, next) => {
        if (req.user) {
            if (req.user.loaiTaiKhoan != "2") {
                res.render('error', {
                    loi: '403',
                    urlBack: check(req.user.loaiTaiKhoan),
                    message: "Bạn không có quyền truy cập",
                    layout: false
                });
            } else
                next();
        } else {
            req.session.sessionFlash = {
                urlBack: req.baseUrl + req.url
            }
            res.redirect('/account/login');
        }
    },

    authEditor: (req, res, next) => {
        if (req.user) {
            if (req.user.loaiTaiKhoan != "3") {
                res.render('error', {
                    loi: '403',
                    urlBack: check(req.user.loaiTaiKhoan),
                    message: "Bạn không có quyền truy cập",
                    layout: false
                });
            } else
                next();
        } else {
            req.session.sessionFlash = {
                urlBack: req.baseUrl + req.url
            }
            res.redirect('/account/login');
        }
    },

    authUser: (req, res, next) => {
        if (req.user) {
            next();
        } else {
            req.session.sessionFlash = {
                urlBack: req.baseUrl + req.url
            }
            res.redirect('/account/login');

        }
    },
};