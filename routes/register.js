/*
time：2018-9-3
writer：马欣宇
 */

let express = require('express');
let router = express.Router({});
var login=require("./login");
var user=require("../models/user");
var userDB=new user();


//注册界面
router.get('/', function(req, res, next) {
    console.log("in login");
    res.render('register', { title: '注册' });
});

/*
  注册信息
  用户名已存在时，注册失败，向前端发送false,前端调用新界面提示"用户名已存在或密码不一致"
  密码与确认密码不一致时，注册失败，向前端发送false,前端调用新界面提示"用户名已存在或密码不一致"
  注册成功时，保存用户名并进入用户界面
 */
router.post('/', function(req, res, next) {
    console.log("register message");
    //如果用户名不存在，则可注册

    userDB.isNull(req.body.user_name,function(a,b)
    {
        console.log(a);
        console.log(b);
        if(b) {
                console.log(111);
                //JSON 格式
                var response = {
                    "user_name": req.body.user_name,
                    "password": req.body.password,
                    "height":req.body.height,
                    "weight":req.body.weight,
                    "sex":req.body.sex=="男"?"male":"female",
                    "age":req.body.age
                };
                //注册成功，添加用户，并进入用户主界面
                userDB.addUser(JSON.stringify(response),function (err,result) {
                    console.log(err);
                    if(err){
                        var errData={
                            err_name:"注册失败",
                            err:"注册失败请重试"
                        };
                        res.render("failedPage",{err:errData});
                    }else{
                        req.session.user={user_name:req.body.user_name,psw:req.body.password};
                        res.redirect('http://127.0.0.1:3000/users');
                    }
                });
            }
        else//若用户名已存在，返回失败
        {
            var errData={
                err_name:"注册失败失败",
                err:"用户名已经存在"
            };
            res.render("failedPage",{err:errData});
        }
    });
});

module.exports = router;