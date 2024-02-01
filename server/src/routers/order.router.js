const { createOrder, getBillByUser, putOrderCancel, getAllOrder, patchOrederAccess } = require("../controllers/order.controller")

const orderRouter = (app) => {
    app.post("/api/v1/order",createOrder);
    app.get("/api/v1/orders",getAllOrder)
    app.get("/api/v1/order/:id",getBillByUser);
    app.put("/api/v1/order/:orderId",putOrderCancel);
    app.patch("/api/v1/order/:orderId",patchOrederAccess);
}
module.exports = {
    orderRouter
}