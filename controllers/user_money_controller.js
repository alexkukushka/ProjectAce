var UserMoney = require("../models/user_money"),
    user_money_controller = {},
    path = require('path'),
    mongoose = require("mongoose");
user_money_controller.index = function(req, res) {
    UserMoney.find({}, function(err, result) {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    });
}

user_money_controller.create = function(req, res) {
    var login = req.body.login,
        password = req.body.password;

    UserMoney.find({ "login": login, "password": password }, function(err, result) {
        if (err) {
            console.log(err);
            res.send(500, err);
        } else if (result.length !== 0) {
            res.status(501);
        } else {
            var newUser = new UserMoney({
                "login": login,
                "password": password,
            });
            newUser.save(function(err, result) {
                if (err !== null) {
                    res.json(500)
                } else {
                    res.json(200)
                }
            });
        }
    });
};


module.exports = user_money_controller;