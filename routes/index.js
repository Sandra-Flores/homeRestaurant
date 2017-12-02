var express = require('express');
var router = express.Router();

/* GET home page. */
function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()) { return next(); }
    res.redirect('/login');
}


router.get('/', function(req, res, next) {
    if(req.session.views) {
        req.session.views++;
    } else {
        req.session.views = 1;
    }
    res.render('maps', {views: req.session.views});
});

module.exports = router;
