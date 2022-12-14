var Category = require("../models/category"),
    InOut = require("../models/inout"),
    category_controller = {},
    path = require('path'),
    mongoose = require("mongoose");
category_controller.index = function(req, res) {
    Category.find({}, function(err, result) {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    });
}
category_controller.create = function(req, res) {
    var category = req.body.name;
    Category.find({ "name": category }, function(err, result) {
        if (err) {
            console.log(err);
            res.send(500, err);
        } else if (result.length !== 0) {
            res.sendStatus(501);
        } else {
            var newCategory = new Category({"name":category})
            newCategory.save(function(err, result) {
                    res.json(200);
            });
        }})
}
category_controller.update = function(req, res) {
    var newCategory = { $set: { name: req.body.name } };
    Category.updateOne({ "name": req.params.category }, newCategory, function(err, item) {        
        if (err !== null) {
            res.status(500).json(err);
        } else {
        InOut.updateMany({"category":req.params.category},{$set:{category:req.body.name}},function(err1, item1) {
            if(err1 !== null){
                res.status(500).json(err);            
            }else{
                res.json(200);
            }
        })
            
        }
    });
    
};
category_controller.delete = function(req, res) {
    var category = req.params.category;
    Category.find({ "name": category  }, function(err, result) {
        if (err) {
            console.log(err);
            res.send(500, err);
        } else {
            Category.deleteOne({ "name": category }, function(err, item) {
                InOut.deleteMany({"category": category},function(err1,item1){
                    res.json(200);
})            
        })
        }});
};
module.exports = category_controller;
