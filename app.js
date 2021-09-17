const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

const indexRoutes = require('./routes/index')
const userRoutes = require('./routes/users')

const passConfig = require('./config/passport');

const db = require('./config/db')


const app = express();

passConfig(passport);

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

app.use('/', indexRoutes)
app.use('/users', userRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, console.log("Started Server on port 3000"))
