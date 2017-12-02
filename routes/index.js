var express = require('express');
var router = express.Router();


/* GET home page. */
function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()) { return next(); }
    res.redirect('/login');
}


router.get('/', function(req, res, next) {
    res.render('maps', {views: req.session.views});
});

module.exports = router;
