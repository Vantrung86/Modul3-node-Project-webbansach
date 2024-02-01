const { createOrderMysql, getBillByUserId, putOrderCancelMysql, getAllOrderMysql, patchOrederAccessMysql } = require("../services/order.service");

//tao
async function createOrder(req,res) {
    try {
        const {userId,totalOrderpay,dayOrder,nameOrder,address,name,SDT} = req.body
        const idOrder = await createOrderMysql(userId,totalOrderpay,dayOrder,nameOrder,address,name,SDT)
        res.status(201).json({idOrder})
    } catch (error) {
        console.log(error);
    }
}
//lay theo user
async function getBillByUser(req,res) {
    try {
        const {id} = req.params
        const result = await getBillByUserId(id)
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
    }
}
//lay tat ca order
async function getAllOrder(req,res) {
    try {
        const result = await getAllOrderMysql();
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
    }
}
//status huy
async function putOrderCancel(req,res) {
    try {
        const {orderId} = req.params
        await putOrderCancelMysql(orderId)
        res.status(200).json()
    } catch (error) {
        console.log(error);
    }
}
//status Duyet
async function patchOrederAccess(req,res) {
    try {
        const {orderId} = req.params
        await patchOrederAccessMysql(orderId)
        res.status(200).json()
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    createOrder,
    getBillByUser,
    putOrderCancel,
    getAllOrder,
    patchOrederAccess
}
