var Category = require("../models/category"),
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


module.exports = category_controller;
