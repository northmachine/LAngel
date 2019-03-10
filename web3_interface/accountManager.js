var utils = require('./utils');
function accountManager(){
    // var accounts = {};
    // var useAccount;
    this.newUser = function(userName,callback){
        utils.user.searchUserByName(userName,function(err,res){
            var passphrase = JSON.parse(res)['password'];
            utils.web3.eth.personal.newAccount(passphrase).then(function(add){
                utils.account.insertAccount(userName,add,function(err,res){
                    console.log(res);
                    callback(res);
                })
            });
        });
    }
    // this.setUseAccount = function(userName){
    //     utils.account.getAccount(userName,function(err,res){
    //        useAccount = res;
    //     });
    // }
    // this.freshAccounts = function(){
    //
    // }
    this.unlockAcc = function(userName,callback){
        utils.account.getAccount(userName,function(err,res){
            utils.user.searchUserByName(userName,function(err,ress){
                var passphrase = JSON.parse(ress)['password'];
                // utils.web3.eth.personal.unlockAccount(res,passphrase,6000).then(console.log("unlock!"));
                utils.web3.eth.personal.unlockAccount(res,passphrase,6000).then(callback(res));
            })
        })
    }
}
module.exports = accountManager;
