const { register, login } = require("../controllers/user.controller");
const { checkEmpty, checkEmailExist, checkEmptyLogin } = require("../middleware/middleware");



const userRouter=(app)=>{
    app.post("/api/v1/register",checkEmpty,checkEmailExist,register);
    app.post("/api/v1/login",checkEmptyLogin, login)
};

module.exports = {
    userRouter,
}