var createError = require('http-errors');
var express = require('express');
var exphbs = require('express-handlebars');
var path = require('path');
var logger = require('morgan');
var numeral = require('numeral');
var hbs_section = require('express-handlebars-sections');
var hbs = require('hbs');
//var flash = require('req-flash');

var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
require('./middlewares/view-engine')(app);
require('./middlewares/session')(app);
require('./middlewares/passport')(app);

//app.use(flash);
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));


app.use(logger('dev'));
app.use(express.json());

app.use('/', require('./routes/trangchu/trangchu_router'));

app.use('/admin/tags', require('./routes/admin/tag.router'));
app.use('/admin/categories', require('./routes/admin/cat.router'));
app.use('/account', require('./routes/account.router'));
app.use('/chitietbaiviet', require('./routes/trangchu/chitietbaiviet'));



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
    res.render('error', {
        layout: 'main'
    });
});

module.exports = app;