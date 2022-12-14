var mongoose = require("mongoose");
var user_moneySchema = mongoose.Schema({
    login: String,
    password: String,
    mode: String
});
var user_money = mongoose.model("user_money", user_moneySchema);
module.exports = user_money;
