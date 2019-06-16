var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var indexRouter = require('./routes/index');
var editor_xemdanhsach = require('./routes/editor/editor_xemdanhsach');
var admin_tag = require('./routes/admin/tag.router');
var admin_user = require('./routes/admin/user.router');
var admin_article = require('./routes/admin/article.router');
var admin_categories = require('./routes/admin/cat.router');
var login = require('./routes/account.router');
var hbs_sections = require('express-handlebars-sections');
var exphbs = require('express-handlebars');
var hbs_sections = require('express-handlebars-sections');
var moment = require('moment');
var app = express();

// view engine setup
var editor_xemdanhsach = require('./routes/editor/editor_xemdanhsach');
var editor_dsdaxuly = require('./routes/editor/editor_dsdaxuly');
var editor_duyetbaiviet = require('./routes/editor/editor_duyetbaiviet');
var writer_vietbai = require('./routes/writer/writer_vietbai');
var writer_chinhsua = require('./routes/writer/writer_chinhsua');
var writer_chuaduocduyet = require('./routes/writer/writer_chuaduocduyet');
var writer_daduyet = require('./routes/writer/writer_daduyet');
var writer_daxuatban = require('./routes/writer/writer_daxuatban');
var writer_bituchoi = require('./routes/writer/writer_bituchoi');
var writer_baiviet = require('./routes/writer/writer_baiviet');

app.use('/editor_xemdanhsach', editor_xemdanhsach);
app.use('/editor_dsdaxuly', editor_dsdaxuly);
app.use('/editor_duyetbaiviet', editor_duyetbaiviet);
app.use('/writer_vietbai', writer_vietbai);
app.use('/writer_chinhsua', writer_chinhsua);
app.use('/writer_chuaduocduyet', writer_chuaduocduyet);
app.use('/writer_bituchoi', writer_bituchoi);
app.use('/writer_daduyet', writer_daduyet);
app.use('/writer_daxuatban', writer_daxuatban);

app.use('/writer_baiviet', writer_baiviet);
app.engine('hbs', exphbs({
    layoutsDir: 'views/layouts',
    defaultLayout: 'main_layout',
    extname: '.hbs',
    helpers: {
        formatDate: val => moment(val).format('DD/MM/YYYY HH:mm'),
        section: hbs_sections()
    }
}));
app.set('view engine', 'hbs');
// app.set('view engine', 'hbs');
// app.set('views', path.join(__dirname, 'views'));


require('./middleware/session')(app);
require('./middleware/passport')(app);

app.use(bodyParser());

app.use('/', require('./routes/trangchu/trangchu_router'));
app.use('/editor_xemdanhsach', editor_xemdanhsach);
app.use('/chitietbaiviet', require('./routes/trangchu/chitietbaiviet'));

app.use('/admin/tags', admin_tag)
app.use('/admin/categories', admin_categories)
app.use('/account', login)
app.use('/admin/user', admin_user)
app.use('/admin/article', admin_article)




app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;