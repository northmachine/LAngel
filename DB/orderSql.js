
exports.orderSql={
    select:"select * from order_info where user_name = ?",
    insert:"insert into order_info(user_name,buy_time,good_id,qr_code,is_used) values(?,?,?,?,?)"
};