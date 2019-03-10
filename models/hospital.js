var query=require('../DB/DbPool');
var hosSql=require('../DB/HosSql').HosSql;
/*
*
* @author TimmyWang
* @time 2018/8/29
* 操作表user_info，将操作结果返回
*
* */
function hospital(){
    /*
    *
    * 搜索用户
    *
    * @param{string}user_name
    *
    * @callback{string err,string result}
    * err:错误信息
    * result：用户数据JSON格式
    *
    * */
    this.searchHosByName=function (hos_name,callback) {
        var sql=hosSql.select;
        query(sql,[hos_name],function (err,results) {
            if(err){
                callback(err,null);
            }else{
                if(results[0]){
                    var hospital={
                        "hos_name":results[0].hos_name,
                        "password":results[0].psw,
                        "user_list_location":results[0].user_list_location
                    };
                    callback(null,hospital);
                }else{
                    callback(null,null);
                }
            }
        })
    };

    /*
    *
    * 检测用户名是否存在
    *
    * @param{string}user_name
    *
    * @callback{string err,bool result}
    * err:错误信息
    * result：表示用户是否存在
    *
    * */
    this.isNull=function (hos_name,callback) {
        var sql=hosSql.select;
        query(sql,[hos_name],function (err,results) {
            if(err){
                callback(err,null);
            }else{
                callback(null,results[0]?false:true);
            }
        });
    };

    /*
    *
    * 登陆检测
    *
    * @param{string}user_name
    * @param{string}password
    *
    * @callback{string err,bool result}
    * err:错误信息
    * result：用户密码是否正确
    *
    * */
    this.loginCheck=function (hos_name,password,callback) {
        var sql=hosSql.select;
        query(sql,[hos_name],function (err,results) {
            if(err){
                callback(err,null);
            }else{
                if(results[0]){
                    callback(null,results[0]['psw']==password?true:false);
                }else{
                    callback(null,false);
                }
            }
        })
    }
}

module.exports=hospital;