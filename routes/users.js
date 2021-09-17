const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

const User = require('../models/User')
const { forwardAuthenticated } = require('../config/auth');
const schema = require('../config/validator')

router.get('/login', forwardAuthenticated, (req, res) => {
    res.render('login');
})
router.get('/register', forwardAuthenticated, (req, res) => {
    res.render('register');
})

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/home',
        failureRedirect: '/users/login', 
        failureFlash: true

    })(req, res, next);
})
router.post('/register', (req, res, next) => {
    let errors = [];
    const { firstName, lastName, password, password2, email } = req.body
    const { value, error } = schema.validate({
        firstName: firstName,
        lastName: lastName,
        password: password,
        password2: password2,
        email: email
    })

    if (error != undefined) errors.push({ msg: error })
    if (errors.length != 0) {
        res.render('register', {
            errors: errors,
            firstName: firstName,
            lastName: lastName,
            password: password,
            password2: password2,
            email: email
        })
    } else {
        User.findOne({ email: email }).then(user => {
            if (user) {
                errors.push({ msg: "Email already exists." })
                res.render('register', {
                    errors: errors,
                    firstName: firstName,
                    lastName: lastName,
                    password: password,
                    password2: password2,
                    email: email
                })
            } else {
                newUser = new User({ firstName, lastName, email, password });
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err
                        newUser.password = hash;
                        newUser.save()
                            .then(user => {
                                req.flash('success_msg',
                                    'You are now registered and can log in');
                                res.redirect('/users/login');
                            })
                            .catch(err => console.log(err));
                    })
                })
            }
        }).catch(err => console.log(err));
    }
})



module.exports = router;