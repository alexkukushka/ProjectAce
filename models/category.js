var mongoose = require("mongoose");
var categorySchema = mongoose.Schema({
    name: String
});
var category = mongoose.model("category", categorySchema);
module.exports = category;
