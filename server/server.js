const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const { userRouter } = require("./src/routers/user.router");
const { catergoryRouter } = require("./src/routers/catergory.router");
const { productRouter } = require("./src/routers/product.router");
const { userManagerRouter } = require("./src/routers/userManager.router");
const { cartRouter } = require("./src/routers/cart.router");
const { orderRouter } = require("./src/routers/order.router");
const { orderDetailRouter } = require("./src/routers/orderDetail.router");
require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

userRouter(app);
catergoryRouter(app);
productRouter(app);
userManagerRouter(app);
cartRouter(app);
orderRouter(app);
orderDetailRouter(app)

app.listen(process.env.PORT, ()=>{
    console.log(`Đã vào cổng: http://localhost:${process.env.PORT}`);
})