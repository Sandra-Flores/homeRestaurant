var express = require('express');
var router = express.Router();

/* GET login page. */

router.get('/', function(req, res, next) {
    if(req.isAuthenticated()){
        console.log(req.user);
        res.send("You're already logged in.")
    } else {
        res.render('login');   
    }
});

module.exports = router;
