/*
*
* user_info表的SQL语句
*
* */

exports.UserSql={
    select:"select * from user_info where user_name =?",
    insert:"insert into user_info(user_name,password,sex,height,weight,age,portrait_location,tx_data_location) values(?,?,?,?,?,?,?,?)",
    updateSqlPrefix:"update user_info set ",
    updateSqlSuffix:" where user_name = ?"

};
