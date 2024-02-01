const db = require("../config/db.config");
//lay
async function getProductInBillMySql(orderId) {
    try {
        const [result] = await db.execute(
            "SELECT * FROM `order` join oderdetail on order.orderId = oderdetail.orderId join product on oderdetail.productId = product.productId where order.orderId = ?",
            [orderId]
        );
        return result
    } catch (error) {
        console.log(error);
    }
}
//tao
async function createOrderDetailMySql(orderId, productId, quantity) {
    try {
        const [result] = await db.execute(
            "insert into oderdetail (orderId, quantity, productId) values (?,?,?)",
            [orderId, quantity, productId]
        );
        return result;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    createOrderDetailMySql,
    getProductInBillMySql
}
