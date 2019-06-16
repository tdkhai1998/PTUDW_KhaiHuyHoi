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



module.exports = {
    authAdmin: (req, res, next) => {
        if (req.user) {
            if (req.user.loaiTaiKhoan !== "4") {
                res.end('Not access\n<a href="/">Back</a>');

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
        if (req.user && req.user.loaiTaiKhoan >= "3") {
            next();
        } else {
            req.session.sessionFlash = {
                urlBack: req.baseUrl + req.url
            }
            res.redirect('/account/login');

        }
    },

    authEditor: (req, res, next) => {
        if (req.user && req.user.loaiTaiKhoan >= "2") {
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