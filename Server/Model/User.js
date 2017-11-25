var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var async = require('async');

mongoose.Promise = global.Promise;
mongoose.connection.on('disconnected', () => { console.log('-> lost connection'); });
mongoose.connection.on('reconnect', () => { console.log('-> reconnected'); });
mongoose.connection.on('connected', () => { console.log('-> connected'); });
mongoose.connect('mongodb://root:root@ds119436.mlab.com:19436/j5e', {useMongoClient: true});
mongoose.set('debug', true);

var UserSchema = new Schema({
    username: String,
    password: String,
    name: String,
    token: String,
});

UserSchema.pre('save', function(next) {
    var user = this;
    bcrypt.hash(user.password, 10, function(err, hash) {
        if (err) next(err);
        else {
            user.password = hash;
            next();
        }
    });
});

module.exports = mongoose.model('User', UserSchema);
