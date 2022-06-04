var UserMoney= require("../models/user_money"),
    user_money_controller = {},
    path = require('path'),
    mongoose = require("mongoose");
user_money_controller.index = function(req,res){
    UserMoney.find({},function(err,result){
        if(err){
            res.send(err);
        } else{
            res.json(result);
        }
    });
}
module.exports = user_money_controller;