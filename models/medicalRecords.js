/*
*
* @author TimmyWang
* @time 2018/8/31
* 与文件交互，实现用户医疗数据件的读写操作
*
* 医疗数据格式
* {
*   "Data":[
*         {
*            "data":"20180825",
*            "hos_name":...
*            ...
*         },
*         {
*            "data":"20180825",
*            "hos_name":...
*            ...
*         }
*   ]
* }
* */

var fs=require('fs');
var basicPath='../data/MedicalData/';

function MedicalRecords() {
    this.addData=function (user_name,data,callback) {
        var dataPath=basicPath+user_name+".json";
        fs.exists(dataPath,function (exists) {
            if(exists){
                var readData=fs.readFileSync(dataPath,'utf-8');
                readData=JSON.parse(readData);
                readData.case.push(data);
                writeData=JSON.stringify(readData);
                fs.writeFileSync(dataPath,writeData);
                callback(true);
            }else{
                //文件不存在
                var writeData={
                    "case":[data]
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

                for(var i=0;i<readData.case.length;i++){
                    returnData[i]=readData.case[readData.case.length-1-i];
                }
                var medicalData={
                    "case":returnData
                };
                callback(medicalData);
            }else{
                callback(null);
            }
        });
    };

}

module.exports=MedicalRecords;