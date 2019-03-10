var Hospital=require('./hospital');

/*
*
* @author TimmyWang
* @time 2018/8/30
* userDao接口
*
* */

function hospitalDao() {
    const hospital=new Hospital();
    this.getHospital=function () {
        if(hospital==null){
            return hospital;
        }else{
            return new Hospital();
        }
    }
}

module.exports=hospitalDao;




