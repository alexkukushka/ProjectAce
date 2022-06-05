var mongoose = require("mongoose");
var user_moneySchema = mongoose.Schema({
    login: String,
    password: String
});
var user_money = mongoose.model("user_money", user_moneySchema);

user_controller.create = function(req, res) {
    var name = req.body.name,
        surname = req.body.surname,
        email = req.body.email,
        username = req.body.username,
        password = req.body.password,
        address = req.body.address,
        mobile = req.body.mobile,
        role = req.body.role,
        status = req.body.status;
    User.find({ "username": username, "password": password }, function(err, result) {
        if (err) {
            console.log(err);
            res.send(500, err);
        } else if (result.length !== 0) {
            res.status(501);
        } else {
            var newUser = new User({
                "name": name,
                "surname": surname,
                "email": email,
                "username": username,
                "password": password,
                "address": address,
                "mobile": mobile,
                "role": role,
            });
            newUser.save(function(err, result) {
                if (err !== null) {
                    res.json(500)
                } else {
                    if (role === "Mechanic") {
                        var newMechanic = new Mechanic({
                            "salary": null,
                            "status": "Not Approved",
                            "user_id": result._id
                        })
                        newMechanic.save(function(err, r) {
                            res.json(200)
                        })
                    }

                }
            });
        }
    });
};













module.exports = user_money;