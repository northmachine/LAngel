var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var registerRouter = require('./routes/register');//添加人：马欣宇 2018-9-3
var loginRouter = require('./routes/login');//添加人：马欣宇 2018-9-3
var hosLoginRouter = require('./routes/hoslogin');//添加人：马欣宇 2018-9-4
var hosUserRouter = require('./routes/hosUser');//添加人：马欣宇 2018-9-4
var hospitalRouter = require('./routes/hospital');//添加人：马欣宇 2018-9-4
var ajaxRouter=require('./routes/ajax');
var userCaseRouter=require('./routes/userCase');
var txRouter=require("./routes/txInfo");
var buyRouter=require("./routes/buy");
var orderRouter=require("./routes/order")
var session = require('express-session');





var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret :  'secret', // 对session id 相关的cookie 进行签名
    resave : true,
    saveUninitialized: false, // 是否保存未初始化的会话
    cookie : {
        maxAge : 1000 * 60 * 3,
    },
}));
app.use('/', indexRouter);
app.use('/login',loginRouter);//添加人：马欣宇 2018-9-3
app.use('/register',registerRouter);//添加人：马欣宇 2018-9-3
app.use('/users', usersRouter);
app.use('/hosLogin', hosLoginRouter);//添加人：马欣宇 2018-9-4
app.use('/hosUser', hosUserRouter);//添加人：马欣宇 2018-9-4
app.use('/hospital',hospitalRouter);//添加人：马欣宇 2018-9-4
app.use('/ajax',ajaxRouter);
app.use('/userCase',userCaseRouter);
app.use("/txInfo",txRouter);
app.use("/buy",buyRouter);
app.use("/order",orderRouter);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


var server = app.listen(8083, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

});
module.exports = app;

