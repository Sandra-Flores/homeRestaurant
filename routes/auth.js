var express = require('express');
var router = express.Router();
var facebookPassport = require('../helpers/facebook.js');

router.get('/facebook', facebookPassport.authenticate('facebook'));
router.get('/facebook/callback', facebookPassport.authenticate('facebook', {
    failureRedirect: '/login'
}), function(req, res){
    //console.log(req.user);
    //res.locals.user = req.user;
    res.redirect('/');
});

module.exports = router;

