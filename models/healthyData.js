/*
*
* @author TimmyWang
* @time 2018/8/29
* 与文件交互，实现用户健康数据文件的读写操作
*
* 健康数据格式
* {
*   "rate":[60,70,80],
*   "step":[10000,8000,90000],
* }
*
* */

var fs=require('fs');
var basicPath='../data/healthyData/';

function HealthyData() {
    /*
    *
    * 添加用户健康数据
    * 先判断对应目录下用户健康数据文件是否存在
    * 若不存在，直接新建文件，将数据写入
    * 若存在，判断用户数据是更新还是加入
    * 写入成功后返回true
    *
    * @param{string}user_name
    * @param{object} data:写入的数据
    *
    * callback(bool result)
    *
    * */
    this.addData=function (user_name,data,callback) {
        var dataPath=basicPath+user_name+".json";
        fs.exists(dataPath,function (exists) {
            if(exists){
                var readData=fs.readFileSync(dataPath,'utf-8');
                readData=JSON.parse(readData);
                readData["rate"].push(data["rate"]);
                readData["steps"].push(data["steps"]);
                readData["deep"].push(data["deep"]);
                readData["shallow"].push(data["shallow"]);
                readData["awake"].push(data["awake"]);
                writeData=JSON.stringify(readData);
                fs.writeFileSync(dataPath,writeData);
                callback(true);
            }else{
                //文件不存在
                var writeData={
                    "rate":data["rate"],
                    "steps":data["steps"],
                    "deep":data["deep"],
                    "shallow":data["shallow"],
                    "awake":data["awake"]
                };
                writeData=JSON.stringify(writeData);
                fs.writeFileSync(dataPath,writeData);
                callback(true);
            }
        });
    };

    /*
    * 获取用户数据
    * 先判断用户数据文件是否存在
    * 若不存在直接返回0
    * 若存在比较获取的天数和记录的天数，若需要的信息天数比记录的天数多，则将记录的信息存在数组全部返回
    * 反之将最近的N天返回
    * 返回数组按天数倒序排列
    *
    * @param{string}user_name
    * @param{int}days
    *
    * @callback(string returnData)
    * 返回的数据
    *
    * */

    this.getData=function (user_name,callback) {
        var dataPath=basicPath+user_name+".json";
        fs.exists(dataPath,function (exists){
            if(exists){
                var readData=fs.readFileSync(dataPath,'utf-8');
                readData=JSON.parse(readData);
                var recordedDays=readData['rate'].length;
                var rate=new Array();
                var steps=new Array();
                var deep=new Array();
                var shallow=new Array();
                var awake=new Array();
                for(var i=0;i<recordedDays;i++){
                    rate.push(readData['rate'][recordedDays-i-1]);
                    steps.push(readData['step'][recordedDays-i-1]);
                    deep.push(readData['deep'][recordedDays-i-1]);
                    shallow.push(readData['shallow'][recordedDays-i-1]);
                    awake.push(readData['awake'][recordedDays-i-1]);
                }
                var healthyData={
                    "rate":rate,
                    "step":steps,
                    "deep":deep,
                    "shallow":shallow,
                    "awake":awake
                };
                callback(healthyData);
            }else{
                callback(null);
            }
        });
    };
}

module.exports=HealthyData;