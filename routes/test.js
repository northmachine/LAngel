
let express = require('express');
var app = express();
var user=require("../models/user");
var userDB=new user();


app.get('/', function(req, res, next) {
    console.log("in login");


    userDB.loginCheck("123","321", function (a, b) {

        res.end(b);

    });
});

var server = app.listen(8084, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

});
module.exports = app;


