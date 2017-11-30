var express = require('express');
var router = express.Router();

/* GET login page. */



router.get('/', passport.authenticate('facebook'));

module.exports = router;
