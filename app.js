/* eslint-disable no-undef */
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const dotenv = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');

const connectDB = require('./server/utils/db');

const app = express();

dotenv.config({ path:'.env'});
const port = process.env.PORT || 8080;

// load view engine
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));

// load asset
app.use('/css',  express.static(path.resolve(__dirname, 'dist')));
app.use('/js',  express.static(path.resolve(__dirname, 'app/js')));
app.use('/img',  express.static(path.resolve(__dirname, 'app/img')));

// connect to db
connectDB();

// load parser
app.use(express.urlencoded({ extended: true }));

// middleware flash
app.use(cookieParser('secret'));
app.use(
    session({
        cookie: { maxAge: 6000 },
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);
app.use(flash());

app.use(methodOverride('_method'));

// load router
app.use('/', require('./server/routes/router'));

// listener
app.listen(port, () => {
    console.log(`Mongo Contact App | Listening to http://127.0.0.1:${port}`);
});