var utils = require('./utils');
var accountManager = require('./accountManager');
function contractManager() {
    var accountM = new accountManager();
    this.deployContract = function (contractName, userName, argv, callback) {
        utils.contract.getContract(contractName, function (err, res) {
            var myContract = new utils.web3.eth.Contract(JSON.parse(res['contract_abi']));
            utils.account.getAccount(userName, function (err, ress) {
                // accountM.unlockAcc(userName);
                // setTimeout(function () {
                //     myContract.deploy({
                //         data: '0x' + res['contract_object'],
                //         arguments: argv
                //     })
                //         .send({
                //             from: ress,
                //             gas: 1500000,
                //             gasPrice: '30000000000'
                //         })
                //         .then(function (newContractInstance) {
                //             console.log(newContractInstance.options.address) // instance with the new contract address
                //             var updateAddressMsg = {'contract_address': newContractInstance.options.address};
                //             utils.contract.updateContract(contractName, JSON.stringify(updateAddressMsg), function (err, res) {
                //                 console.log(res);
                //             });
                //         })
                // }, 100);
                accountM.unlockAcc(userName,function(r){
                    myContract.deploy({
                        data: '0x' + res['contract_object'],
                        arguments: argv
                    })
                        .send({
                            from: ress,
                            gas: 1500000,
                            gasPrice: '30000000000'
                        })
                        .then(function (newContractInstance) {
                            console.log(newContractInstance.options.address) // instance with the new contract address
                            var updateAddressMsg = {'contract_address': newContractInstance.options.address};
                            utils.contract.updateContract(contractName, JSON.stringify(updateAddressMsg), function (err, res) {
                                console.log(res);
                            });
                        })
                });
            });
        });
    }
    this.callMethod = function (contractName, username, methodName, argv, callback) {
        utils.account.getAccount(username, function (err, res) {
            utils.contract.getContract(contractName, function (err, ress) {
                var myContract = new utils.web3.eth.Contract(JSON.parse(ress['contract_abi']),
                    ress['contract_address'], {
                        from: res,
                        gasPrice: '20000000000'
                    });
                // var argvString = '';
                // if (argv.length > 0) {
                //     for (var i = 0; i < argv.length - 1; i++) {
                //         argvString += argv[i];
                //         argvString += ',';
                //     }
                //     argvString += argv[argv.length - 1];
                // }else ;
                // myContract.methods.getUserBalance("0x2dc90889138baf8e9fd34a12e3a1f725388b7f8f").call({
                //     from: res
                // }, function (err, resss) {
                //     callback(err,resss);
                // });
                eval("                myContract.methods." + methodName + "(" + argv + ").call({\n" +
                    "                    from: res\n" +
                    "                }, function (errrr,resss) {\n" +
                    "                    callback(errrr,resss);\n" +
                    "                });");

            })
        })
    }
    this.sendMethod = function (contractName, userName, methodName, argv, callback) {
        utils.account.getAccount(userName, function (err, res) {
            utils.contract.getContract(contractName, function (err, ress) {
                var myContract = new utils.web3.eth.Contract(JSON.parse(ress['contract_abi']),
                    ress['contract_address'], {
                        from: res,
                        gasPrice: '20000000000'
                    });
                // var argvString = '';
                // if (argv.length > 0) {
                //     for (var i = 0; i < argv.length - 1; i++) {
                //         argvString += argv[i];
                //         argvString += ',';
                //     }
                //     argvString += argv[argv.length - 1];
                // }else ;
                // myContract.methods.myMethod().send({
                //     from:res
                // }).then(function(receipt){
                //     callback(receipt);
                // })
                // accountM.unlockAcc(userName);
                // setTimeout(function () {
                //     eval("                myContract.methods." + methodName + "(" + argv + ").send({\n" +
                //         "                    from:res,gasPrice:'2000000000000',gas:1500000\n" +
                //         "                }).then(function(receipt){\n" +
                //         "                    callback(receipt);\n" +
                //         "                })");
                // }, 100);
                accountM.unlockAcc(userName,function(r){
                    eval("                myContract.methods." + methodName + "(" + argv + ").send({\n" +
                        "                    from:res,gasPrice:'2000000000000',gas:1500000\n" +
                        "                }).then(function(receipt){\n" +
                        "                    callback(receipt);\n" +
                        "                })");
                });
                // setTimeout(function(){
                //     myContract.methods.addUser('wqh',20,175,68,69,'/').send({
                //         from:res,
                //         gasPrice:'2000000000',
                //         gas:1500000
                //     }).then(function(rec){
                //             callback(rec);
                //     })
                //     })
                // },100);
            })
        })
    }
}

module.exports = contractManager;
