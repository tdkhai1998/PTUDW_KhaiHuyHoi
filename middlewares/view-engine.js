var hbs = require('express-handlebars');
var hbs_sections = require('express-handlebars-sections');
var numeral = require('numeral');
var path = require('path');


module.exports = function(app) {
    app.engine('hbs', hbs({
        extname: 'hbs',
        defaultLayout: 'main_layout',
        layoutsDir: 'views/layouts/',
        partialsDir: 'views/partials/',
        helpers: {
            section: hbs_sections()
        }
    }));
    app.set('view engine', 'hbs');
}