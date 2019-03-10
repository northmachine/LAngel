// var contractManager = require('./contractsManager');
// var compileContract = require('./compileContract');
// var accountManager = require('./accountManager');
// var conm = new contractManager();
// var comc = new compileContract();
// var accountM = new accountManager();
// conm.deployContract("testContract","aaa",[],function(){
//     console.log('a')
// });
// conm.sendMethod("testContract","aaa","setHeight",[172],function(res){
//     console.log(res);
// });
// conm.sendMethod("LAUser","zxh","addUser","'wqh',20,175,68,69,'/'",function(res){
//     console.log(res);
// });
// conm.callMethod("testContract","aaa","getHeight",[],function(res){
//     console.log(res);
// });
// comc.addContract("LAUser");
// conm.deployContract("LAUser","aaa",[],function(){
//     console.log('a')
// });
// conm.callMethod("LAUser","zxh","getInfo",'"wqh"',function(err,res){
//     console.log(res);
//     console.log(err);
// });

// 天使币合约测试
//  comc.addContract("LACoin");

// conm.deployContract("LACoin","aaa",[10000,0,null],function(){
//     console.log('a')
// });
// conm.callMethod("LACoin","aaa",'balanceOf',"'0x2dc90889138baf8e9fd34a12e3a1f725388b7f8f'",function(err,res){
//     console.log(err);
//     console.log(res);
// })
//
// 用户测试
// comc.addContract("LAUsera");
// conm.deployContract("LACoin","aaa",[10000,0,null],function(){
//     console.log('a')
// });
// var Web3 = require('./lib/web3');
// var solc = require('solc');
// var fs = require('fs');
// var LAInterface = require('./LAInterface.js');
// var laInterface = new LAInterface();
// // laInterface.deployContract("testContract");
// laInterface.callContractFunc("testContract","getWeight");


// // dont override global variable
// if (typeof window !== 'undefined' && typeof window.Web3 === 'undefined') {
//     window.Web3 = Web3;
// }
//
// var web3 = new Web3();
//
// web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));
//
// var coinbase = web3.eth.coinbase;
// console.log(coinbase);
var angelInterface = require('./angelInterface');
var anI = new angelInterface();
var utils = require("./utils");
// utils.account.getAccount("aaa",function(res){
//     anI.getUserBalance("aaa","aaa",function(ress){
//         console.log(ress)
//     })
// })
// anI.getUserBalance("aaa",[])
// console.log(utils.argvTool.aryToString(["0xkwe23k423hr329r923h923"]))
var contractsManager = require('./contractsManager');
var contractsM = new contractsManager();
var logicalCase = require('./logicalCase');
var compileContract = require("./compileContract");
var comC = new compileContract();
// logicalCase.getData("aaa",function(res){
//     console.log(res);
// })
// var logicalCase = require('./web3_interface/logicalCase');
// logicalCase.uploadData("aaa","/abc",function(rec,recc){
//     ;
// })
var accountManager = require('./accountManager');
var accountM = new accountManager();
// accountM.newUser('wqh');
// comC.addContract("LACoin");
// contractsM.deployContract("LACoin","zxh",[10000,0,null],function(){
//     console.log("ok");
// })

// comC.addContract("LACoin");
// setTimeout(function () {
//     contractsM.deployContract("LACoin",'zxh',[10000,0,null],function(){
//         console.log("ok");
//     })
// },1000)

var logicalC = require('./logicalCase');
// // logicalC.uploadData('wqh','/aaa',function(rec){
// //     ;
// // })
// logicalC.getData("zxh",function(res){
//     console.log(res);
// })

// anI.addChainUser("zxh",["zxh",0,0,0,0,"/abc"],function(){
//     ;
// })

// anI.addChainUserTransData("zxh",['zxh',0,'a',0,0,1],function(rec){
//     console.log(rec);
// })

// anI.getUserTransaction('zxh',['zxh',0],function(res){
//     console.log(res);
// });

// var a = '\t{"date":"2018/08/21",\n' +
//     '\t"info":"明基医院",\n' +
//     '\t"in":"80",\n' +
//     '\t"out":"/",\n' +
//     '\t"balance":"280"},\n' +
//     '\t{"date":"2018/08/21",\n' +
//     '\t"info":"明基医院",\n' +
//     '\t"in":"80",\n' +
//     '\t"out":"/",\n' +
//     '\t"balance":"280"},\n' +
//     '\t{"date":"2018/08/21",\n' +
//     '\t"info":"明基医院","in":"80","out":"/","balance":"280"}';
// console.log(utils.argvTool.stringToJson(a));
// console.log(utils.md5('123456'))

// var myData = new Date();
// console.log(myData.toLocaleDateString());

anI.publishCoinToUser("zxh","test",100,function (res) {
    ;
})
