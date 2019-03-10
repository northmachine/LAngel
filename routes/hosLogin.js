/*
time：2018-9-4
writer：马欣宇
 */

let express = require('express');
let router = express.Router({});
var hospitalDao=require("../models/hospitalDao");
const theHospital=new hospitalDao().getHospital();
var medicalREcordsDao=require('../models/medicalRecordsDao');
const medicalRecords=new medicalREcordsDao().getMedicalRecords();


//登录界面
router.get('/', function(req, res, next) {
    console.log(" hos in login");
    res.render('hosLogin', { title: ' 医院登录' });
});

router.get("/hosLogin",function (req,res,next) {
    let hos_name = req.query.hospital;
    let psw = req.query.psw;

    theHospital.loginCheck(hos_name, psw, function (err, results) {
        //若登陆成功，则进入用户界面
        if (results) {
            req.session.hos={hos_name:hos_name,psw:psw};
            res.redirect('/hospital');
        }
        else {//若登录失败，新界面显示登录失败的消息
            var errData={
                err_name:"登陆失败",
                err:"用户名或者密码不正确"
            };
            res.render("failedPage",{err:errData});
        }
    });
});

/*
  登录信息
  若登录成功，保存用户名并进入医院主页面
  若登录失败，向前端返回false，前端调用新界面显示医院账号密码错误的信息
 */
// const user_list_fs=require('../models/user_list_fs');
// const user_list=new user_list_fs();
// router.post('/', function(req, res, next) {
//     if(req.body.submit=="搜索"){
//         var user_name=req.body.id;
//         theHospital.searchHosByName("test",function (err,res1) {
//             if(err){
//                 res.setHeader("Access-Control-Allow-Origin", "*");
//                 res.json({"err":"服务器数据库出错"});
//             }else{
//                 console.log(user_name);
//                 var flag=false;
//                 user_list.getUserList(res1['user_list_location'],function (result) {
//                     for(var i=0;i<result.length;i++){
//                         if(user_name==result[i]['username']){
//                             flag=true;
//                             break;
//                         }
//                     }
//                     if(flag){
//                         res.render("hos_user",{user_name:user_name});
//                     }else{
//                         console.log(2222);
//                         res.send(false);
//                     }
//                 })
//             }
//         })
//     }else{
//         console.log(req);
//         if(req.body.name=='申请授权'){
//             console.log("申请授权")
//             var hos_name=req.body.hospital;
//             var psw=req.body.password;
//             var user_name=req.body.userName;
//             theHospital.loginCheck(hos_name,psw, function (err,results) {
//                 if (results) {
//                     // anI.userTransLACoin(hos_name,user_name,1,function(rec){
//                     //     if(rec){
//                     //
//                     //     }else{
//                     //
//                     //     }
//                     // })
//                 }
//                 else {//若登录失败，新界面显示登录失败的消息
//                     res.send(false);
//                 }
//             });
//         }else {
//             console.log(req.body.button);
//             if (req.body.button != '添加病例') {
//                 console.log("hos login message");
//                 let hos_name = req.body.hospital;
//                 let psw = req.body.psw;
//                 console.log(1111);
//                 console.log(hos_name);
//
//                 theHospital.loginCheck(hos_name, psw, function (err, results) {
//                     //若登陆成功，则进入用户界面
//                     if (results) {
//                         res.render("hospital", {hos_name: hos_name});
//                     }
//                     else {//若登录失败，新界面显示登录失败的消息
//                         res.send(false);
//                     }
//                 });
//                 // var illness=req.body.subject;
//                 // var time=req.body.email[1];
//                 // var hospital=req.body.name;
//                 // var doctor=req.body.email[0];
//                 // var syptom=req.body.message[0];
//                 // var cure=req.body.message[1];
//                 // console.log(illness);
//                 // console.log(time);
//                 // console.log(hospital);
//             } else {
//                 console.log("添加病历");
//                 var user_name=req.body.email[2]
//                 var illness=req.body.subject;
//                 var time=req.body.email[1];
//                 var hospital=req.body.name;
//                 var doctor=req.body.email[0];
//                 var symptom=req.body.message[0];
//                 var cure=req.body.message[1];
//                 var data={
//                     "illness":illness,
//                     "time":time,
//                     "hospital":hospital,
//                     "doctor":doctor,
//                     "symptom":symptom,
//                     "cure":cure
//                 };
//                 medicalRecords.addData(user_name,data,function (res1) {
//                     if(res1){
//                         res.send(true);
//                     }else{
//                         res.send(false);
//                     }
//                 })
//             }
//         }
//     }
// });
module.exports = router;