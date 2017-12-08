var express = require('express');
var router = express.Router();
var stores = require('../helpers/stores.js')


/* GET home page. */
function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()) { return next(); }
    res.redirect('/login');
}


router.post('/:id', function(req, res, next) {
    res.render('restaurant');
});

router.get('/', function(req, res, next) {
   res.redirect('/restaurant/manage') 
});

router.get('/create', ensureAuthenticated, function(req, res, next){
    res.render('restaurantSetUp');
});

router.post('/create', ensureAuthenticated, function(req, res, next) {
    var user_id = req.user.user_id;
    var name = req.body.name;
    var address = req.body.address;
    var lat = req.body.lat;
    var lng = req.body.lng;
    var phone_number = req.body.phone_number;
    var description = req.body.description;
    stores.create(user_id, name, address, lat, lng, phone_number, description, function(err, store_id){
        if(err){
            console.log(err);
            next(new Error("Error creating restaurant"));
        } else {
            req.redirect('/restaurant/manage')
        }
    });
});

router.get('/manage',ensureAuthenticated, function(req, res, next) {
    stores.hasStore(req.user.user_id, function(err, result){
        console.log(result, err);
        if(err){
            
            res.redirect('/');
        } else {
            if(!result[0].bool){
                res.redirect('/restaurant/create');
            }
            res.render('my-restaurant');
        }
    });
});



module.exports = router;
