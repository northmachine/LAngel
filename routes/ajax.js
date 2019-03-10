let express = require('express');
let router = express.Router({});


var userDao=require("../models/userDao");
var healthyDataDao=require('../models/healthyDataDao');
var medicalRecordsDAo=require('../models/medicalRecordsDao');
var hospitalDao=require("../models/hospitalDao");
const user=new userDao().getUser();
const healthyData=new healthyDataDao().getHealthyData();
const medicalData=new medicalRecordsDAo().getMedicalRecords();
const hospital=new hospitalDao().getHospital();
var user_list_fs=require('../models/user_list_fs');
const user_list=new user_list_fs();
var tx_info_list=require('../models/tx_info_fs');
const tx_info=new tx_info_list();
// zxh append
var angelInterface = require("../web3_interface/angelInterface");
var anI = new angelInterface();
var Order=require('../models/order');
var order=new Order();
var accountManager = require("../web3_interface/accountManager");
var accountM = new accountManager();


//交易记录
//健康信息
//医疗信息
//用户信息

router.post("/userLogin",function (req,res,next) {
    var user_name=req.body.user_name;
    var psw=req.body.psw;
    user.loginCheck(user_name,psw,function (err,result) {
        if(err){
            res.json({result:false})
        }else{
            if(result){
                res.json({result:true})
            }else{
                res.json({result:false})
            }
        }
    })
});

router.post("/register",function (req,res,next) {
    user.isNull(req.body.user_name, function (a, b) {
        if (b) {
            var response = {
                "user_name": req.body.user_name,
                "password": req.body.psw,
                "height": req.body.height,
                "weight": req.body.weight,
                "sex": req.body.sex,
                "age": req.body.age
            };
            //注册成功，添加用户，并进入用户主界面
            user.addUser(JSON.stringify(response), function (err, result) {
                console.log(err);
                if (err) {
                    res.json({result: false})
                } else {
                    accountM.newUser(req.body.user_name,function(ress){
                        anI.userTransLACoin("zxh",req.body.user_name,1,function(rec){
                            res.json({result: true});
                        })
                    });
                }
            });
        }
        else//若用户名已存在，返回失败
        {
            res.json({result: false, err: "用户名已存在"})
        }
    });
});
router.post("/login",function (req,res,next) {
   var user_name=req.body.user_name;
   var psw=req.body.psw;
   user.loginCheck(user_name,psw,function (err,result) {
       if(err){

       }else{
           if(result){

           }else{

           }
       }
   })
});

router.post('/user_info',  function(req, res, next){
    console.log("收到一个请求用户信息的ajax请求");
    console.log("开始查新数据库.......");
    var user_name=req.body.user_name;
    user.searchUserByName(user_name,function (err,result) {
        if(err){
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.json({"err":"服务器数据库出错"})
        }else{
            if(result){
                result=JSON.parse(result);
                var user_info={
                    "sex":result['sex'],
                    "height":result['height'],
                    "weight":result['weight'],
                    "age":result['age']
                };
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.json(user_info);
            }else{
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.json({"err":"未查询到该用户"});
            }

        }
    });
});

router.post('/healthyData',  function(req, res, next){
    console.log("收到一个请求用户信息的ajax请求");
    console.log("开始查新健康数据.......");
    var user_name=req.body.user_name;
    healthyData.getData(user_name,function (result) {
        if(result){
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.json(result);
        }else{
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.json({"err":"该用户无数据"});
        }
    })
});

router.post('/medicalRecords',  function(req, res, next){
    console.log("收到一个请求用户信息的ajax请求");
    console.log("开始查新病历信息.......");
    var user_name=req.body.user_name;
    medicalData.getData(user_name,function (result) {
        if(result){
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.json(result);
        }else{
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.json({"err":"数据查询出错"});
        }
    })
});

router.post("/init_user_info",function (req,res,next) {
    console.log(req.query.a);
   var user_name=req.body.user_name;
   console.log("开始查询"+user_name+"基本信息")
   user.searchUserByName(user_name,function (err,user_info) {
        if(err){
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.json({"err":"服务器数据库出错"})
        }else{
            //zxh
            anI.getUserBalance(user_name,function(ress) {
                healthyData.getData(user_name, function (healthy_info) {
                    if (healthy_info) {
                        medicalData.getData(user_name, function (medical_info) {
                            if (medical_info) {
                                user_info = JSON.parse(user_info);
                                res.setHeader("Access-Control-Allow-Origin", "*");
                                var returnData = {
                                    "username": user_info['user_name'],
                                    "height": user_info['height'],
                                    "weight": user_info['weight'],
                                    "balance": ress,
                                    "age": user_info['age'],
                                    "sex": user_info['sex'],
                                    "case": medical_info["case"],
                                    "step": healthy_info['step'],
                                    "rate": healthy_info['rate'],
                                    "shallow": healthy_info['shallow'],
                                    "deep": healthy_info['deep'],
                                    "awake": healthy_info['awake']
                                };
                                res.json(returnData);
                            } else {
                                res.setHeader("Access-Control-Allow-Origin", "*");
                                var returnData = {
                                    "username": user_info['user_name'],
                                    "height": user_info['height'],
                                    "weight": user_info['weight'],
                                    "balance": ress,
                                    "age": user_info['age'],
                                    "sex": user_info['sex'],
                                    "case": null,
                                    "step": healthy_info['step'],
                                    "rate": healthy_info['rate'],
                                    "shallow": healthy_info['shallow'],
                                    "deep": healthy_info['deep'],
                                    "awake": healthy_info['awake']
                                };
                                res.json(returnData);
                            }
                        })
                    }
                    else {
                        medicalData.getData(user_name, function (medical_info) {
                            if (medical_info) {
                                user_info = JSON.parse(user_info);
                                res.setHeader("Access-Control-Allow-Origin", "*");
                                var returnData = {
                                    "username": user_info['user_name'],
                                    "height": user_info['height'],
                                    "weight": user_info['weight'],
                                    "balance": ress,
                                    "age": user_info['age'],
                                    "sex": user_info['sex'],
                                    "case": medical_info["case"],
                                    "step": null,
                                    "rate": null,
                                    "shallow": null,
                                    "deep": null,
                                    "awake": null
                                };
                                res.setHeader("Access-Control-Allow-Origin", "*");
                            } else {
                                var returnData = {
                                    "username": user_info['user_name'],
                                    "height": user_info['height'],
                                    "weight": user_info['weight'],
                                    "balance": ress,
                                    "age": user_info['age'],
                                    "sex": user_info['sex'],
                                    "case": null,
                                    "step": null,
                                    "rate": null,
                                    "shallow": null,
                                    "deep": null,
                                    "awake": null
                                };
                                res.setHeader("Access-Control-Allow-Origin", "*");
                                res.json(returnData);
                            }
                        })
                    }
                })
            });
        }
    });
});

router.post("/init_hos_info",function (req,res,next) {
    var hos_name=req.body.hos_name;
    hospital.searchHosByName(hos_name,function (err,res1) {
        if(err){
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.json({"err":"服务器数据库出错"});
        }else{
            //获取医院账户余额
            user_list.getUserList(res1['user_list_location'],function (result) {
                anI.getUserBalance(req.body.hos_name,function(ress){
                    // ress 为医院余额
                    res.setHeader("Access-Control-Allow-Origin", "*");
                    res.json({
                        "users":result,
                        "balance":ress
                    });
                })
            })
        }
    })
});

router.post("/txInfo",function (req,res,next) {
    var user_name=req.body.user_name;
    console.log("开始查询"+user_name+"的交易记录");
    user.searchUserByName(user_name,function (err,user_info) {
        if(err){
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.json({"err":"服务器数据库出错"})
        }else{
            tx_info.getTranList(JSON.parse(user_info)["tx_data_location"],function (tran_list) {
                res.setHeader("Access-Control-Allow-Origin", "*");
                var returnData={
                    "tran":tran_list
                }
                res.json(returnData);
            })
        }
    });
});

router.post("/addData",function (req,res,next) {
    var data={
        "rate":req.body.rate,
        "step":req.body.step,
        "deep":req.body.deep,
        "shallow":req.body.shallow,
        "awake":req.body.awake
    }
    healthyData.addData(req.body.user_name,data,function (result) {
        if(result){

        }else{

        }
    })
});

router.post("/add_data",function(req,res,next){
   var name = req.body.user_name;
   var step = req.body.step;
   var rate = req.body.rate;
   var shallow = req.body.shallow;
   var deep = req.body.deep;
   var awake = req.body.awake;
   anI.addChainUser("zxh",[name,step,rate,awake,shallow,deep.toString()],function(ress){
       anI.userTransLACoin("zxh",name,1,function(rec){
           res.json({result:true});
       })
   })
});

//商城购买
router.post("/buy",function (req,res,next) {
    var timestamp =(new Date()).valueOf();
    var timeString=(new Date()).toLocaleDateString();
    var data=[
        req.body.user_name,
        timestamp,
        req.body.good_id,
        req.body.user_name+req.body.good_id+timestamp,
        0
    ];
   order.insertOrder(data,function (err,result) {
        if(result){
            anI.userTransLACoin(req.body.user_name,"zxh",1,function(rec){
                user.searchUserByName(req.body.user_name,function (err,user_info) {
                    if(err){

                    }else{
                        anI.getUserBalance(req.body.user_name,function(resss){
                            tx_info.updateTranList(JSON.parse(user_info)["tx_data_location"],
                                timeString.substring(0,9),
                                "buy",
                                0,
                                1,
                                resss,
                                function (a) {
                                if(a){
                                    res.json({result:true})
                                }else{
                                    res.json({result:true})
                                }
                            })
                        });
                    }
                });
                // tx_info.updataTranList(timeString,"buy",0,10,ress,function (result) {
                //     if(result) {
                //         res.json({result:true})
                //     }else{
                //         res.json({result:false})
                //     }
                // });
            })
        }else{
           res.json({result:false})
        }
    })
});
router.post("/buyGood",function (req,res,next) {
    var timestamp =(new Date()).valueOf();
    var timeString=(new Date()).toLocaleDateString();
    var data=[
        req.body.user_name,
        timestamp,
        req.body.good_id,
        req.body.user_name+req.body.good_id+timestamp,
        0
    ];
    order.insertOrder(data,function (err,result) {
        if(result){
            anI.userTransLACoin(req.body.user_name,"zxh",1,function(rec){
                user.searchUserByName(req.body.user_name,function (err,user_info) {
                    if(err){

                    }else{
                        anI.getUserBalance(req.body.user_name,function(resss){
                            tx_info.updateTranList(JSON.parse(user_info)["tx_data_location"],
                                timeString.substring(0,9),
                                "buy",
                                0,
                                1,
                                resss,
                                function (a) {
                                    if(a){
                                        res.json({qrstring:timeString})
                                    }else{
                                        res.json({qrstring:timeString})
                                    }
                                })
                        });
                    }
                });
                // tx_info.updataTranList(timeString,"buy",0,10,ress,function (result) {
                //     if(result) {
                //         res.json({result:true})
                //     }else{
                //         res.json({result:false})
                //     }
                // });
            })
        }else{
            res.json({result:false})
        }
    })
});

router.post("/order",function (req,res,next) {
    var user_name=req.body.user_name;
    order.searchOrdersByUserName(user_name,function (a,b) {
        res.json(b);
    })
});
module.exports = router;
