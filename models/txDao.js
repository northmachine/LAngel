var tx=require("./tx");

function txDao() {
    const Tx=new tx();
    this.getTx=function () {
        if(tx){
            return tx;
        }else{
            return new tx();
        }
    }
}

module.exports=txDao;
