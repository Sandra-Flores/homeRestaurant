var express = require('express');
var router = express.Router();
var facebookPassport = require('../helpers/facebook.js');

router.get('/facebook', facebookPassport.authenticate('facebook'));
router.get('/facebook/callback', facebookPassport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/login'
}))
module.exports = router;

