const { getProduct, postProduct, deleteProduct, putProduct, getProductById, searchProduct } = require("../controllers/product.controller")


const productRouter=(app)=>{
    app.get("/api/v1/product", getProduct);
    app.get("/api/v1/product/:id",getProductById)
    app.post("/api/v1/product",postProduct);
    app.delete("/api/v1/product/:id", deleteProduct);
    app.put("/api/v1/product/:id", putProduct);
    app.get("/api/v1/searchProduct",searchProduct)
}
module.exports={
    productRouter,
}