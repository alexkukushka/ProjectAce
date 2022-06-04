var express = require("express"),
http = require("http"),
mongoose = require("mongoose"),
app = express();
app.use(express.static(__dirname + "/public"));
app.use('/user/:username', express.static(__dirname + "/public"));
app.use(express.urlencoded());
mongoose.connect('mongodb://localhost/MoneyService');
app.get("/index.html", (req, res) => {
req.sendFile(path.join(staticPath, "html/index.html"));
})

http.createServer(app).listen(9999);