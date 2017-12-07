var db = require('./database.js');

exports.create = function(email, password, name, done){
    var sql = 'INSERT INTO user(email, password, name) VALUES(?, ?, ?)';
    // !! Should hash password !!
    var values = [email, password, name]
    
    db.get().query(sql, values, function(err, result){
        if(err) {
            done(err, null);
        } else {
            done(null, result.insertId);
        }
    });
};

exports.get = function(user_id, done){
    
}

exports.findOne = function(email, done){
    var sql = "SELECT * FROM user WHERE email = ?";
    db.get().query(sql, email, function(err, result){
        if(err){
            done(err, null)
        } else {
            done(null, result)
        }
    });
}

exports.getAll = function(done){
    db.get().query('SELECT * FROM user', function(err, results){
        if(err){
            done(err, null);
        } else {
            done(null, results);
        }
    });
};

