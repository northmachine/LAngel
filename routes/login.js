/*
time：2018-9-3
writer：马欣宇
 */

let express = require('express');
let router = express.Router({});
var userDao=require("../models/userDao");
const user=new userDao().getUser();

//登录界面
router.get('/', function(req, res, next) {
    console.log("in login");
    res.render('login');
});

router.get("/userLogin",function (req,res,next) {
    console.log(req.query.userName);
    if(req.query.type=="signIn"){
        let userName = req.query.userName;
        let psw = req.query.psw;

        user.loginCheck(userName,psw, function (err,results) {
            //若登陆成功，则进入用户界面
            if (results) {
                req.session.user={user_name:userName,psw:psw};
                res.redirect('/users')
            }
            else {//若登录失败，新界面显示登录失败的消息
                var errData={
                    err_name:"登陆失败",
                    err:"用户名或者密码不正确"
                };
                res.render("failedPage",{err:errData});
            }
        });
    }else{
        res.redirect("/register");
    }
});


/*
  登录信息
  若登录成功，保存用户名并进入用户主页面
  若登录失败，向前端返回false，前端调用新界面显示用户名密码错误的信息
 */
router.post('/', function(req, res, next) {
    let userName = req.body.userName;
    let psw = req.body.psw;

    user.loginCheck(userName,psw, function (err,results) {
        //若登陆成功，则进入用户界面
        if (results) {
            res.render('mainPage',{ user_name: userName });
        }
        else {//若登录失败，新界面显示登录失败的消息
            res.send(false);
        }
    });
    // console.log(JSON.stringify(response));
});

module.exports = router;


