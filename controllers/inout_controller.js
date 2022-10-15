var InOut = require("../models/inout"),
    UserMoney = require("../models/user_money")
    inout_controller = {},
    path = require('path'),
    mongoose = require("mongoose");
inout_controller.index = function(req,res){
    UserMoney.find({"login":req.params.login},function(err,result){
    if(err){
        res.send(err)
        }
    else{
        InOut.find({"owner":result[0].login},function(error,resu){
            if(error)
                res.send(error);
            else
                res.send(resu);
})}      
})
}
inout_controller.create = function(req, res) {
    var name = req.body.name,
    price = req.body.price,
    owner = req.body.owner,
    category = req.body.category;
            var newInout = new InOut({
                "name":name,
                "owner": owner,
                "price":price,
                "category":category
                        }   )
            newInout.save(function(err, result) {
                    res.json(200);
            });
}
inout_controller.update = function(req, res) {
    var newItem = { $set: { name: req.body.name, price: req.body.price,category:req.body.category } };
    InOut.updateOne({ "_id": req.params._id }, newItem, function(err, item) {
        if (err !== null) {
            res.status(500).json(err);
        } else {
            res.json(200);
        }
    });
};
inout_controller.delete = function(req, res) {
    var _id = req.params._id;
    InOut.find({ "_id": _id  }, function(err, result) {
        if (err) {
            console.log(err);
            res.send(500, err);
        } else {
            InOut.deleteOne({ "_id": _id }, function(err, item) {
            res.json(200); 
        })
        }});
};
module.exports = inout_controller;
