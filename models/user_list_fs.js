var fs=require('fs');

function user_list_fs() {
    this.getUserList=function (location,callback) {
        var readData=fs.readFileSync(location,'utf-8');
        readData=JSON.parse(readData);
        var user_list=readData.user_list;
        callback(user_list);
    }
    this.updateUserList=function (location,user_name,sex,date,callback) {
        var readData=fs.readFileSync(location,'utf-8');
        readData=JSON.parse(readData);
        var user={
            "username":user_name,
            "sex":sex,
            "time":date
        };
        readData.user_list.push(user);
        var writeData=JSON.stringify(readData);
        fs.writeFileSync(location,writeData);
        callback(true);
    }
}

module.exports=user_list_fs;
