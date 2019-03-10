
let express = require('express');
let router = express.Router({});
var MedicalRecords= require("../models/medicalRecords");
var medicalRecords=new MedicalRecords();
var hospital=require('./hospital');

//医院的用户界面,已经被初始化过
router.get('/', function(req, res, next) {
    if(req.session.user){
        res.render('hos_user',{ user_name: req.session.user });
    }else{
        res.redirect("/hosLogin");
    }
});

//添加病历
router.post('/', function(req, res, next) {
    var user_name=req.body.email[2]
    var illness=req.body.subject;
    var time=req.body.email[1];
    var hospital=req.body.name;
    var doctor=req.body.email[0];
    var symptom=req.body.message[0];
    var cure=req.body.message[1];
    var data={
        "illness":illness,
        "time":time,
        "hospital":hospital,
        "doctor":doctor,
        "symptom":symptom,
        "cure":cure
    };
    medicalRecords.addData(user_name,data,function (res1) {
        if(res1){
            var errData={
                err_name:"添加成功",
                err:"病历添加成功"
            };
            res.render("failedPage",{err:errData});
        }else{
            var errData={
                err_name:"添加失败",
                err:"请稍后重试"
            };
            res.render("failedPage",{err:errData});
        }
    })
});

module.exports = router;
