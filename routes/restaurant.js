var express = require('express');
var router = express.Router();
var stores = require('../helpers/stores.js')


/* GET home page. */
function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()) { return next(); }
    res.redirect('/login');
}


router.post('/', function(req, res, next) {
    res.render('restaurant');
});

router.get('/', function(req, res, next) {
   res.redirect('/restaurant/manage') 
});

router.get('/create', ensureAuthenticated, function(req, res, next){
    res.render('restaurantSetUp');
});

router.post('/create', ensureAuthenticated, function(req, res, next) {
    var user_id = req.body;
    var name = req.body.name;
    var address = req.body.address;
    var lat = req.body.lat;
    var lng = req.body.lng;
    var phone_number = req.body.phone_number;
    var description = req.body.description;
    stores.create(user_id, name, address, lat, lng, phone_number, description, function(err, store_id){
        if(err){
            next(new Error("Error creating restaurant"));
        } else {
            req.redirect('/restaurant/manage')
        }
    });
});

router.get('/manage',ensureAuthenticated, function(req, res, next) {
     res.render('my-restaurant');
});



module.exports = router;