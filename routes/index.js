var express = require('express');
var router = express.Router();

/* GET home page. */



router.get('/', function(req, res, next) {
    if(req.session.views) {
        req.session.views++;
    } else {
        req.session.views = 1;
    }
    res.render('maps', {views: req.session.views});
});

module.exports = router;
