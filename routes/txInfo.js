let express = require('express');
let router = express.Router({});

var userDao=require("../models/userDao");
const user=new userDao().getUser();

router.get('/', function(req, res, next) {
    res.render("tran",{user_name:req.query.user_name});
});

module.exports = router;