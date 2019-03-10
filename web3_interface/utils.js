var Web3 = require('web3');
var web3 = new Web3("http://localhost:8545");
var solc = require('solc');
var fs = require('fs');
var passwd = '123';
var contractDao=require("../models/contractDao");
var contract= new contractDao().getContrct();
var accountDao = require("../models/accountDao");
var account = new accountDao().getAccount();
var userDao = require("../models/userDao");
var user = new userDao().getUser();
var md5 = require('md5');
var txDao = require('../models/txDao');
var tx = new txDao().getTx();
function ArgvTool(){
    this.aryToString = function(ary){
        var argvString = '';
        var l = ary.length;
        for(var i = 0;i<l-1;i++){
            if(typeof(ary[i]) == "string"){
                argvString = argvString +"'"+ary[i]+"',";
            }else if(typeof(ary[i]) == "number"){
                argvString = argvString + ary[i].toString()+",";
            }else if(typeof(ary[i])== "boolean"){
                argvString = argvString + ary[i].toString()+",";
            }
            else{
                argvString = argvString+" ,";
            }
        }
        if(typeof(ary[l-1]) == "string"){
            argvString = argvString +"'"+ary[i] +"'";
        }else if(typeof(ary[l-1]) == "number"){
            argvString = argvString + ary[i].toString();
        }else if(typeof(ary[l-1])== "boolean"){
            argvString = argvString + ary[i].toString();
        }else{
            argvString =argvString +" ";
        }
        return argvString;
    }
    this.stringToJson = function(transtring){
        var ary = transtring.split("|");
        return ary;
    }
}
var argvTool = new ArgvTool();
module.exports.web3 = web3;
module.exports.solc = solc;
module.exports.passwd = passwd;
module.exports.contract = contract;
module.exports.account = account;
module.exports.user = user;
module.exports.fs = fs;
module.exports.argvTool = argvTool;
module.exports.md5 = md5;
module.exports.tx = tx;
