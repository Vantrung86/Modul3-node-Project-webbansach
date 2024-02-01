const { createOrderDetailMySql, getProductInBillMySql } = require("../services/orderDetail.service");

//lay
async function getProductOrderDetail(req,res) {
    try {
        const {orderId} = req.params
        const result = await getProductInBillMySql(orderId);
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
    }
}
//tao
async function createOrderDetail(req,res) {
    try {
        const { orderId, dataCart } = req.body;
        await Promise.all(
            dataCart.map(async (product) => await createOrderDetailMySql(orderId, product.productId, product.quantity))
        )
        res.status(200).json({
            message: "Tạo orderDetail thành công"
        })
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    createOrderDetail,
    getProductOrderDetail
}