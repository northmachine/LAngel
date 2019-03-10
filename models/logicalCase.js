var angelInterface = require('../web3_interface/angelInterface');
var anI = new angelInterface();
var utils = require("../web3_interface/utils");
// 用户上传数据
function uploadData(userName,dataLocation,callback){
    var argv = [userName,0,0,0,0,dataLocation];
    utils.web3.eth.getCoinbase(function(coinbase){
        anI.addChainUser('zxh',argv,function(rec){
            utils.account.getAccount(userName,function (err,add) {
                var argv2 = [add,1];
                anI.publishCoinToUser("zxh",argv2,function(recc){
                    callback(rec,recc);
                })
            })
        });
    });
    // 1 添加交易记录；
    var txData = {
        "date":new Date().toLocaleDateString(),
        "info":"UserAddData",
        "in":"1",
        "out":"/",
        "balance":""
    }
    utils.tx.addTx(userName,txData,function(res){
        if(res){
            utils.tx.getData(userNamr,function(res){
                var hash = utils.md5(res);
                var argv = [userName,hash];
                anI.setTransactionHash(userName,argv,function(rec){
                    callback(rec);
                })
            })
        }
    })
}
function getData(userName,callback){
    var argv = [userName];
    // coinbase调用call??
    anI.getChainUserInfo("zxh",argv,function(res){
        callback(res[4]);
    })
}
function getAllTransData(userName,callback){
    // 1 数据库查询
    // 2 计算hash
    // 3 正确匹配返回
    utils.tx.getData(userName,function(data){
        var hash = utils.md5(data);
        anI.getTransactionHash(userName,[userName],function(res){
            if(hash == res){
                callback(data);
            }else{
                callback('err');
            }
        })
    })
}
module.exports.getData = getData;
module.exports.uploadData = uploadData;
module.exports.getAllTranData = getAllTransData;
