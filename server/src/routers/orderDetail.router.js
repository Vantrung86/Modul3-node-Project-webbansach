const { createOrderDetail, getProductOrderDetail } = require("../controllers/orderDetail.controller")


const orderDetailRouter = (app) => {
    app.get("/api/v1/orderDetail/:orderId",getProductOrderDetail)
    app.post("/api/v1/orderDetail",createOrderDetail)
}

module.exports = {
    orderDetailRouter
}