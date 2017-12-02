var db = require('/database.js');

exports.create = function(username, password, name, email, done){
    var sql = 'INSERT INTO user(username, password, name, email) VALUES(?, ?, ?, ?)';
    // !! Should hash password !!
    var values = [username, password, name, email]
    
    db.get().query(sql, values, function(err, result){
        if(err) {
            done(err, null);
        } else {
            done(null, result.insertId);
        }
    });
};

exports.getAll = function(done){
    db.get().query('SELECT * FROM user', function(err, results){
        if(err){
            done(err, null);
        } else {
            done(null, results);
        }
    });
};

