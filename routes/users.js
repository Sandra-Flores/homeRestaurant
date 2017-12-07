var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  if(req.session.views) {
        req.session.views++;
    } else {
        req.session.views = 1;
    }
    res.render('users', {title: "users", views: req.session.views});
});

module.exports = router;
