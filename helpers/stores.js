var db = require('./database.js');


function createMenu(done) {
    var createMenu = 'INSERT INTO menu(menu_name) VALUES(?)'
    var menu_name = 'My Menu';
    db.get().query(createMenu, menu_name, function(err, result){
       if(err) {
           done(err, null);
       } else {
           done(null, result.insertId);
       }
    });
}

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
    var sql = 'SELECT store_id, name, address, lat, lng, phone_number, description,( 3959 * acos( cos( radians(?) ) * cos( radians( lat ) )* \
        cos( radians( lng ) - radians(?) ) + sin( radians(?) ) * sin( radians( lat ) ) ) ) AS distance FROM store \
        HAVING distance < ? ORDER BY distance LIMIT 0 , 20';
    var values = [lat, lng, lat, radius*1.61];
    db.get().query(sql, values, function(err, results){
        if(err){
            done(err, null);
        } else {
            done(null, results);
        }
    });
};

exports.get = function(store_id, done) {
    var sql = 'SELECT * FROM store WHERE store_id = ?';
    var values = [store_id];
    
    db.get().query(sql, values, function(err, results){
       if(err){
           done(err, null);
       } else {
           done(null, results);
       }
    });
}

exports.hasStore = function(user_id, done){
    var sql = 'SELECT EXISTS(SELECT store_id FROM store WHERE user_id = ?) AS bool'
    db.get().query(sql, user_id, function(err, result){
        if(err){
            done(err, null);
        } else {
            done(null, result);
        }
    });
}

exports.create = function(user_id, name, address, lat, lng, phone_number, description, done){
    var menu_id;
    createMenu(function(err, insert_id){
        if(err){
            return err;
        } else {
            menu_id = insert_id;
        }
    });
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