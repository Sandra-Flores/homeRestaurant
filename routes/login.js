var express = require('express');
var router = express.Router();
var localPassport = require('../helpers/passport.js');
/* GET login page. */

router.get('/', function(req, res, next) {
    if(req.isAuthenticated()){
        console.log(req.user);
        console.log(req.user.user_id);
        res.send("You're already logged in.")
    } else {
        res.render('login');   
    }
});

router.post('/', localPassport.authenticate('local',{failureRedirect:'/login'}), function(req, res, next){
    
    res.redirect('/');
});

module.exports = router;
