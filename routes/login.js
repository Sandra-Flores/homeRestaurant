var express = require('express');
var router = express.Router();
var localPassport = require('../helpers/passport.js');
/* GET login page. */

function ensureNotAuthenticated(req, res, next){
    console.log(req.user);
    if(req.user){
       res.redirect('/'); 
    }
    next();
}

router.get('/', ensureNotAuthenticated, function(req, res, next){ 
    res.render('login');   
});

router.post('/', ensureNotAuthenticated, localPassport.authenticate('local',{failureRedirect:'/login'}), function(req, res, next){
    res.redirect('/');
});

module.exports = router;
