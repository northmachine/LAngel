/*
time：2018-8-30
writer：马欣宇
 */

let express = require('express');
let router = express.Router({});


//默认用户登录界面
router.get('/', function(req, res, next) {
    res.redirect("/login");
});


module.exports = router;
