var fs=require('fs');

function tran_list_fs() {
    this.getTranList=function (location,callback) {
        var readData=fs.readFileSync(location,'utf-8');
        readData=JSON.parse(readData);
        var tran_list=readData.tran;
        callback(tran_list);
    };
    this.updateTranList=function (location,date,operation,theIn,theOut,balance,callback) {
        var readData=fs.readFileSync(location,'utf-8');
        readData=JSON.parse(readData);
        var tran={
            "date":date,
            "operation":operation,
            "in":theIn,
            "out":theOut,
            "balance":balance
        };
        readData.tran.push(tran);
        var writeData=JSON.stringify(readData);
        fs.writeFileSync(location,writeData);
        callback(true);
    };
}

module.exports=tran_list_fs;
