var utils = require('./utils');
var contractsManager = require('./contractsManager');

function angelInterface(){
    var contractsM = new contractsManager();
    this.getUserTransaction = function(callUser,argv,callback){
        var argvString = utils.argvTool.aryToString(argv);
        contractsM.callMethod("LAUser",callUser,"getTransaction",argvString,function(err,res){
            if(err)
                console.log(err);
            callback(res);
        })
    }
    this.addChainUser = function(callUser,argv,callback){
        var argvString = utils.argvTool.aryToString(argv);
        contractsM.sendMethod("LAUser","zxh","addUser",argvString,function(rec){
            callback(rec);
        })
    }
    this.getChainUserInfo = function(callUser,argv,callback){
        var argvString = utils.argvTool.aryToString(argv);
        contractsM.callMethod("LAUser",callUser,"getInfo",argvString,function(err,res){
            if(err)
                console.log(err);
            callback(res);
        })
    }
    this.addChainUserTransData = function(callUser,argv,callback){
        var argvString = utils.argvTool.aryToString(argv);
        contractsM.sendMethod("LAUser",'zxh',"addTransRecord",argvString,function(rec){
            callback(rec);
        })
    }
    this.setTransactionHash = function(callUser,argv,callback){
        var argvString = utils.argvTool.aryToString(argv);
        contractsM.sendMethod("LAUser",'zxh',"setTransHash",argvString,function(rec){
            callback(rec);
        })
    }
    this.getTransactionHash = function(callUser,argv,callback){
        var argvString = utils.argvTool.aryToString(argv);
        contractsM.callMethod("LAUser",callUser,"getTransHash",argvString,function(err,res){
            if(err)
                console.log(err);
            callback(res);
        })
    }

    // LACoin_Interface

    this.getUserBalance = function(callUser,callback){
        utils.account.getAccount(callUser,function(err,argv){
            var argvString = utils.argvTool.aryToString([argv]);
            contractsM.callMethod("LACoin",callUser,"balanceOf",argvString,function(err,res){
                if(err)
                    console.log(err);
                callback(res);
            })
        })
    }
    this.setPrice = function(callUser,argv,callback){
        var argvString = utils.argvTool.aryToString(argv);
        contractsM.sendMethod("LACoin",callUser,"setPrice",argvString,function(rec){
            callback(rec);
        })
    }
    this.publishCoinToUser = function(callUser,toUser,amount,callback){
        utils.account.getAccount(toUser,function(err,res){
            var argvString = utils.argvTool.aryToString([res,amount]);
            contractsM.sendMethod("LACoin","zxh","sendCoin",argvString,function(rec){
                callback(rec);
            })
        })
    }
    this.userTransLACoin = function(callUser,toUser,amount,callback){
            utils.account.getAccount(toUser,function(err,add2){
                var argvString = utils.argvTool.aryToString([add2,amount]);
                contractsM.sendMethod("LACoin",callUser,"transfer",argvString,function (rec) {
                    callback(rec);
                })
            })
    }
    this.sellLACoin = function(callUser,argv,callback){
        var argvString = utils.argvTool.aryToString(argv);
        contractsM.sendMethod("LACoin",callUser,"sell",argvString,function (rec) {
            callback(rec);
        })
    }
    this.sellLACoin = function(callUser,argv,callback){
        var argvString = utils.argvTool.aryToString(argv);
        contractsM.sendMethod("LACoin",callUser,"buy",argvString,function (rec) {
            callback(rec);
        })
    }
}

module.exports = angelInterface;
