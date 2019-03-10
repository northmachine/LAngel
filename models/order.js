var query=require('../DB/DbPool');
var orderSql=require('../DB/orderSql').orderSql;

function order() {
    this.searchOrdersByUserName=function (user_name,callback) {
        var sql=orderSql.select;
        query(sql,[user_name],function (err,results) {
            if(err){
                callback(err,undefined);
            }else{
                if(results[0]){
                    var orders=new Array();
                    for(var i=0;i<results.length;i++){
                        orders.push({
                            user_name:results[i].user_name,
                            buy_time:results[i].buy_time,
                            good_id:results[i].good_id,
                            qr_code:results[i].qr_code,
                            is_used:results[i].is_used==1?true:false
                        });
                    }
                    var result={
                        orders:orders
                    }
                    callback(null,result);
                }else{
                    callback(null,{orders:[]});
                }
            }
        })
    };
    this.insertOrder=function (options,callback) {
        var sql=orderSql.insert;
        query(sql,options,function (err,results) {
            if(err){
                callback(err,null);
            }else{
                callback(null,results['affectedRows']==0?false:true);
            }
        })
    }
}

module.exports=order;