var db = require('./database.js');

exports.getAll = function(done){
    db.get().query('SELECT * FROM store', function(err, results){
        if(err){
            done(err, null);
        } else {
            done(null, results);
        }
    });
};

exports.getNear = function(lat, lng, radius, done){
    var sql = 'SELECT store_id, name, address, lat, lng, ( 3959 * acos( cos( radians(?) ) * cos( radians( lat ) )* \
        cos( radians( lng ) - radians(?) ) + sin( radians(?) ) * sin( radians( lat ) ) ) ) AS distance FROM store \
        HAVING distance < ? ORDER BY distance LIMIT 0 , 20';
    var values = [lat, lng, lat, radius];
    db.get().query(sql, values, function(err, results){
        if(err){
            done(err, null);
        } else {
            done(null, results);
        }
    });
};

exports.create = function(user_id, menu_id, name, address, lat, lng, phone_number, description, done){
    var sql = 'INSERT INTO store(user_id, menu_id, name, address, lat, lng, phone_number, description) VALUES(?, ?, ?, ?, ?, ?, ?, ?)';
    var values = [user_id, menu_id, name, address, lat, lng, phone_number, description];
    
    db.get().query(sql, values, function(err, result){
        if(err){
            done(err, null);
        } else {
            done(null, result.insertId);
        }
    });
};