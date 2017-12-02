var express = require('express');
var router = express.Router();
var db = require('../helpers/database.js');

function getStores(done){
    db.get().query('SELECT * FROM store', function(err, results){
        if(err){
            done(err, null);
        } else {
            done(null, results);
        }
    });
}

/* GET home page. */
function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()) { return next(); }
    res.redirect('/login');
}


router.get('/', function(req, res, next) {
    getStores(function(err, stores){
        if(err){
            console.log(err.code);
        } else {
            for(var i = 0; i < stores.length; i++){
                console.log(stores[i]);
            }
        }
    })
    if(req.session.views) {
        req.session.views++;
    } else {
        req.session.views = 1;
    }
    res.render('maps', {views: req.session.views});
});

module.exports = router;
