var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');
var userModel = require('../models/admin/user.model')
var moment = require('moment');


var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

function createEntity(profile, username) {
    var entity = new Object;
    entity.username = username;
    entity.ten = profile.displayName;
    entity.daXoa = 0;
    entity.loaiTaiKhoan = 1;
    var date = moment().add(7, 'days').format('YYYY-MM-DD');
    entity.HSD = date;
    return entity;
}

module.exports = function(app) {
    app.use(passport.initialize());
    app.use(passport.session());
    var ls = new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, (username, password, done) => {
        userModel.single(username).then(rows => {
            if (rows.length === 0) {
                return done(null, false, { message: 'Invalid username.' });
            }

            var user = rows[0];
            var ret = bcrypt.compareSync(password, rows[0].password);
            if (ret) {
                return done(null, user);
            }

            return done(null, false, { message: 'Invalid password.' });
        }).catch(err => {
            return done(err, false);
        })
    });

    passport.use(ls);


    passport.use(new FacebookStrategy({
            clientID: "344365016499860",
            clientSecret: "40fd6a3626d8fd3e87b430ed02c108b7",
            callbackURL: "https://hkhweb.herokuapp.com/account/auth/facebook/callback"
        },
        function(accessToken, refreshToken, profile, done) {
            var username = 'fb-' + profile.id;
            userModel.single(username).then(rows => {
                if (rows.length == 0) {

                    var entity = createEntity(profile, username);
                    userModel.add(entity).then(n => {
                        userModel.single(username).then(rows1 => {
                            var user = rows1[0];
                            return done(null, user);
                        }).catch(err => {
                            console.log(err);
                        });
                    }).catch(err => {
                        console.log(err);
                    });
                } else {
                    userModel.single(username).then(rows1 => {
                        var user = rows1[0];
                        return done(null, user);
                    }).catch(err => {
                        console.log(err);
                    });
                }
            }).catch(err => {
                console.log(err);
            });
        }
    ));


    passport.use(new GoogleStrategy({
            clientID: "42436615068-825kl2c6821halea911qm0s949a5jhea.apps.googleusercontent.com",
            clientSecret: "C6JRoNBEzLG2jrJuKM-Jf-AI",
            callbackURL: "/account/auth/google/callback"
        },
        function(accessToken, refreshToken, profile, done) {
            var username = 'gg-' + profile.id;
            userModel.single(username).then(rows => {
                if (rows.length == 0) {

                    var entity = createEntity(profile, username);
                    userModel.add(entity).then(n => {
                        userModel.single(username).then(rows1 => {
                            var user = rows1[0];
                            return done(null, user);
                        }).catch(err => {
                            console.log(err);
                        });
                    }).catch(err => {
                        console.log(err);
                    });
                } else {
                    userModel.single(username).then(rows1 => {
                        var user = rows1[0];
                        return done(null, user);
                    }).catch(err => {
                        console.log(err);
                    });
                }
            }).catch(err => {
                console.log(err);
            });
        }
    ));

    passport.serializeUser((user, done) => {
        return done(null, user);
    });

    passport.deserializeUser((user, done) => {
        return done(null, user);
    });
}