var express = require('express');
var router = express.Router();
var stores = require('../helpers/stores.js');
var xml = require('xmlbuilder');


router.get('/storelocator', function(req, res, next){
    var lat = req.query.lat;
    var lng = req.query.lng;
    var radius = req.query.radius;
    console.log(lat, lng, radius);

    
    stores.getNear(lat, lng, radius, function(err, results){
       if(err){
           console.log(err.code);
           next(new Error("Error finding stores"));
       } else {
           
           var markers = xml.create('markers');
           for(var i = 0; i < results.length; i++){
                var marker = markers.ele('marker');
                marker.att('store_id', results[i].store_id);
                marker.att('name', results[i].name);
                marker.att('address', results[i].address);
                marker.att('lat', results[i].lat);
                marker.att('lng', results[i].lng);
                marker.att('distance', results[i].distance);
                marker.att('description', results[i].description);
                marker.att('phone_number', results[i].phone_number)
           }
           console.log(markers.end({pretty: true}));
           res.send(markers.end({pretty: true}))
       }
    });
    
});

module.exports = router;