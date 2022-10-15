var mongoose = require("mongoose"),
ObjectId = mongoose.Schema.Types.ObjectId;
var inoutSchema = mongoose.Schema({
    owner : String,
    name: String,
    category: String,
    price: Number
});
var inout = mongoose.model("inout", inoutSchema);
module.exports = inout;
