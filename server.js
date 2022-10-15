var express = require("express"),
    http = require("http"),
    mongoose = require("mongoose"),
    app = express();
mongoose.connect('mongodb://127.0.0.1/MoneyService');
app.use('/',express.static(__dirname + "/public"));
app.use('/user/:username/', express.static(__dirname + "/public"));
app.use(express.urlencoded());

user_money_controller = require("./controllers/user_money_controller")
category_controller = require("./controllers/category_controller")
inout_controller = require("./controllers/inout_controller")
app.get("/reg.html", (req, res) => {
    req.sendFile(path.join(staticPath, "html/reg.html"));
    })
    
    app.get("/index.html", (req, res) => {
    req.sendFile(path.join(staticPath, "html/index.html"));
    })
    
    app.get("/about.html", (req, res) => {
    req.sendFile(path.join(staticPath, "html/about.html"));
    })
    
    app.get("/support.html", (req, res) => {
    req.sendFile(path.join(staticPath, "html/support.html"));
    })
app.post("/user_money", user_money_controller.create);


app.get("/user_money", user_money_controller.index)
app.get("/category",category_controller.index)
app.get("/inout/:login",inout_controller.index)
app.post("/inout",inout_controller.create)
app.put("/inout/:_id",inout_controller.update)
app.delete("/inout/:_id",inout_controller.delete)

http.createServer(app).listen(9999);
