var UserMoney = require("../models/user_money"),
    InOut = require("../models/inout"),
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
        password = req.body.password,
        mode = req.body.mode;

    UserMoney.find({ "login": login }, function(err, result) {
        if (err) {
            console.log(err);
            res.send(500, err);
        } else if (result.length !== 0) {
            res.status(501);
        } else {
            var newUser = new UserMoney({
                "login": login,
                "password": password,
                "mode":mode
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
user_money_controller.update = function(req, res) {
    var newUser = { $set: { login: req.body.login,password:req.body.password,mode:req.body.mode } };
    UserMoney.updateOne({ "name": req.params.login }, newUser, function(err, item) {        
        if (err !== null) {
            res.status(500).json(err);
        } else {
        InOut.updateMany({"owner":req.params.login},{$set:{category:req.body.login}},function(err1, item1) {
            if(err1 !== null){
                res.status(500).json(err);            
            }else{
                res.json(200);
            }
        })
            
        }
    });
    
};
user_money_controller.delete = function(req, res) {
    var login = req.params.login;
    UserMoney.find({ "login": login  }, function(err, result) {
        if (err) {
            console.log(err);
            res.send(500, err);
        } else {
            UserMoney.deleteOne({ "login": login }, function(err, item) {
                InOut.deleteMany({"owner": login},function(err1,item1){
                    res.json(200);
})            
        })
        }});
};
module.exports = user_money_controller;
