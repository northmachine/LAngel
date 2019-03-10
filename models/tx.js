var fs=require('fs');
var basicPath='/data/txRecords';

function tx() {
    this.addTx=function (user_name,txData,callback) {
        var dataPath=basicPath+user_name+".json";
        fs.exists(dataPath,function (exists) {
            if(exists){
                var readData=fs.readFileSync(dataPath,'utf-8');
                readData=JSON.parse(readData);
                readData.tx.push(data);
                writeData=JSON.stringify(readData);
                fs.writeFileSync(dataPath,writeData);
                callback(true);
            }else{
                //文件不存在
                var writeData={
                    "tran":[data]
                };
                writeData=JSON.stringify(writeData);
                fs.writeFileSync(dataPath,writeData);
                callback(true);
            }
        });
    };

    this.getData=function (user_name,callback) {
        var dataPath=basicPath+user_name+".json";
        fs.exists(dataPath,function (exists){
            if(exists){
                var readData=fs.readFileSync(dataPath,'utf-8');
                readData=JSON.parse(readData);

                var returnData=new Array();

                for(var i=0;i<readData.tx.length;i++){
                    returnData[i]=readData.tx[readData.case.length-1-i];
                }
                var txData={
                    "tran":returnData
                };
                callback(healthyData);
            }else{
                callback(null);
            }
        });
    };
}

module.exports=tx;
