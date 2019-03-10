var utils = require('./utils');
function compileContract(){
    // this.contracts = {};
    this.addContract = function(contractName){
        utils.fs.readFile("../contracts/"+contractName+".sol",'utf-8',function(err,data){
            if(err) throw  err;
            var compiled = utils.solc.compile(data);
            // contracts[contractName] = new contractMsg(compiled.contracts[":"+contractName].interface,null,compiled.contracts[":"+contractName].bytecode);
            utils.contract.insertContract(contractName,null,compiled.contracts[":"+contractName].interface,compiled.contracts[":"+contractName].bytecode,function(err,res){
                console.log(res);
                console.log(contractName);
                console.log(compiled.contracts[":"+contractName].interface);
                console.log(compiled.contracts[":"+contractName].bytecode);
            })
        });
    }
}
// function contractMsg(abi,address,byteCode){
//     this.abi = abi;
//     this.address = address;
//     this.byteCode = byteCode;
// }
module.exports = compileContract;
