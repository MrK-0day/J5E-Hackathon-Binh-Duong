var express = require('express');
var router = express.Router();
var User = require('./Model/User');
var bcrypt = require('bcrypt');
var tokengen = require('rand-token');

router.post('/register', function(req, res, next) {
    var body = req.body;
    User.findOne({username: body.username}, "username", function(err, user) {
        if (err) next(err);
        else if (user) {
            res.send({ code: 0, token: "", msg: "Trùng tên người dùng" });
        }
        else {
            var token = tokengen.generate(32);
            User.create({
                username: body.username,
                password: body.password,
                name: body.fullName,
                token: token,
            }, function(err) {
                if (err) next(err);
                else res.send({ code: 1, token: token });
            });
        }
    });
});

router.post('/login', function(req, res, next) {
    console.log(req.body);
    var body = req.body;
    User.findOne({username: body.username}, "password token", function(err, user) {
        if (err) next(err);
        else if (user==null) {
            res.send({ code: 0, token: '' });
        }
        else if (bcrypt.compareSync(body.password, user.password)) {
            res.send({ code: 1, token: user.token });
        }
        else {
            res.send({ code: 0, token: '' });
        }
    });
});

module.exports = router;
