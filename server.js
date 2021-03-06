var express = require("express"),
    http = require("http"),
    mongoose = require("mongoose"),
    app = express();
app.use(express.static(__dirname + "/public"));
mongoose.connect('mongodb://localhost/MoneyService');
app.use(express.urlencoded());

user_money_controller = require("./controllers/user_money_controller")
app.use('/user/:username', express.static(__dirname + "/public"));
app.get("/index.html", (req, res) => {
    req.sendFile(path.join(staticPath, "html/index.html"));
})
app.post("/user_money", user_money_controller.create);


app.get("/user_money", user_money_controller.index)

http.createServer(app).listen(9999);