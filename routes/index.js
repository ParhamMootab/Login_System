const express = require('express');
const router = express.Router();
const {ensureAuthenticated, forwardAuthenticated} = require('../config/auth')

router.get('/' , forwardAuthenticated ,(req, res) => {
    res.render("login")
})
router.get('/home' , ensureAuthenticated ,(req, res) => {
    res.render("home", {
      user: req.user
    })
})

module.exports = router;