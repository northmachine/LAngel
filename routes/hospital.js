/*
time：2018-9-4
writer：马欣宇
 */

let express = require('express');
let router = express.Router({});
var id;//存放用户名
var user=require("../models/user");
var userDB=new user();
var HealthyData=require("../models/healthyData");
var healthDB=new HealthyData();
var MedicalRecords= require("../models/medicalRecords");
var medicalRecords=new MedicalRecords();
var hospitalDao=require("../models/hospitalDao");
const theHospital=new hospitalDao().getHospital();
var angelInterface  = require("../web3_interface/angelInterface");
var anI = new angelInterface();
var utils = require("../web3_interface/utils");
const user_list_fs=require('../models/user_list_fs');
const user_list=new user_list_fs();

//医院主界面
router.get('/', function(req, res, next) {
    if(req.session.hos){
        res.render("hospital", {hos_name: req.session.hos.hos_name});
    }else{
        res.redirect("/hosLogin");
    }
});

/*
输入用户名，若用户名存在，保存用户名并发送信息给前端。前端处理完数据后转向/afterInitialHos
从数据库获取用户基本信息（json)
从数据库获取用户病历（json)
从数据库获取用户四天的健康数据（json)
将以上数据打包为一个json发给前端
 */
router.post('/', function(req, res, next) {
    if(req.body.submit=="搜索"){
        var user_name=req.body.id;
        theHospital.searchHosByName("test",function (err,res1) {
            if(err){
                var errData={
                    err_name:"查询失败",
                    err:"数据库出现差错请联系管理人员"
                };
                res.render("failedPage",{err:errData});
            }else{
                console.log(user_name);
                var flag=false;
                user_list.getUserList(res1['user_list_location'],function (result) {
                    for(var i=0;i<result.length;i++){
                        if(user_name==result[i]['username']){
                            flag=true;
                            break;
                        }
                    }
                    if(flag){
                        req.session.user=user_name;
                        res.redirect('/hosUser');
                    }else{
                        var errData={
                            err_name:"查询失败",
                            err:"未申请该用户授权"
                        };
                        res.render("failedPage",{err:errData});
                    }
                })
            }
        })
    }else{
        console.log("申请授权")
        var hos_name=req.body.hospital;
        var psw=req.body.password;
        var user_name=req.body.id;
        theHospital.loginCheck(hos_name,psw, function (err,results) {
            if (results) {
                theHospital.searchHosByName(hos_name,function (err,res1) {
                    if(err){
                        var errData={
                            err_name:"查询失败",
                            err:"数据库出现差错请联系管理人员"
                        };
                        res.render("failedPage",{err:errData});
                    }else{
                        console.log(user_name);
                        var flag=false;
                        user_list.getUserList(res1['user_list_location'],function (result) {
                            for(var i=0;i<result.length;i++){
                                if(user_name==result[i]['username']){
                                    flag=true;
                                    break;
                                }
                            }
                            if(flag){
                                var errData={
                                    err_name:"授权失败",
                                    err:"该用户已经授权"
                                };
                                res.render("failedPage",{err:errData});
                            }else{
                                userDB.searchUserByName(user_name,function (err,result) {
                                    if(err){
                                        var errData={
                                            err_name:"查询失败",
                                            err:"数据库出现差错请联系管理人员"
                                        };
                                        res.render("failedPage",{err:errData});
                                    }else{
                                        var sex=JSON.parse(result)['sex'];
                                        var time=new Date().toLocaleString().substring(0,9);
                                        user_list.updataUserList(res1['user_list_location'],user_name,sex,time,function (resss) {
                                            if(resss){
                                                anI.userTransLACoin(hos_name,user_name,1,function(rec){
                                                    if(rec){
                                                        var errData={
                                                            err_name:"授权成功",
                                                            err:""
                                                        };
                                                        res.render("failedPage",{err:errData});
                                                    }
                                                })
                                            }else{

                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                })

            }
            else {//若登录失败，新界面显示登录失败的消息
                var errData={
                    err_name:"授权失败",
                    err:"密码不正确"
                };
                res.render("failedPage",{err:errData});
            }
        });
    }
});

// router.post("/getUserInfo",function (req,res,next) {
//     var user_name=req.body.userName;
//     var hos_name=req.body.hos_name;
//     hospital.searchHosByName(hos_name,function (err,res) {
//         if(err){
//             res.setHeader("Access-Control-Allow-Origin", "*");
//             res.json({"err":"服务器数据库出错"});
//         }else{
//             var flag=false;
//             user_list.getUserList(res['user_list_location'],function (result) {
//                 for(var i=0;i<result.length;i++){
//                     if(user_name==result[i]['user_name']){
//                         flag=true;
//                         break;
//                     }
//                 }
//                 if(flag){
//                     //用户已经申请授权
//                 }else{
//                     req.send(false);
//                 }
//             })
//         }
//     })
// });

module.exports = router;
