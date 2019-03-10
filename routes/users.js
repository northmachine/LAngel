/*
time：2018-9-4
writer：马欣宇
 */

let express = require('express');
let router = express.Router({});
var angelInterface = require("../web3_interface/angelInterface");
var anI = new angelInterface();

router.get("/",function (req,res,next) {
    if(req.session.user){
        res.render('mainPage',{ user_name: req.session.user.user_name });
        // console.log("sjfljs");
    }else{
        res.redirect("/login");
    }
});

router.post("/",function(req,res,next){
    // var aryAgeSex = req.body.as.split("_");
    // var aryHW = req.body.hw.split("_");
    // console.log("fjlsakjdf");
    // console.log(aryAgeSex+aryHW);
    // console.log(req.body);
    var aryAS = req.body.as.split("_");
    var aryHW = req.body.hw.split("_");
    anI.addChainUser(req.body.user_name,[req.body.user_name,aryAS[0],aryHW[0],aryHW[1],0,""],function(rec){
        res.send(true);
    });

    // anI.addChainUser()

});
module.exports = router;
