const argon = require("argon2")
const jwt = require("jsonwebtoken");
const { addUser, checkUserByEmail } = require("../services/user.service");
require("dotenv").config();

async function register(req,res) {
    try {
        const {username,email,password,phonenumber,address} = req.body;
        const hashedPassword = await argon.hash(password);
        const id = await addUser(username,hashedPassword,email,phonenumber,address)
        if (!id) {
            return res.status(500).json({
                message:"server lỗi"
            })
        }
        res.status(201).json({
            message:"Đăng ký thành công"
        })
    } catch (error) {
        console.log(error);
    }
};

async function login(req,res) {
    try {
        const {email,password} = req.body
        const user = await checkUserByEmail(email)
        if (!user) {
            return res.status(400).json({ message: "email không tồn tại" });
        }
        const checkPassword = await argon.verify(user.password,password);
        if (!checkPassword) {
            return res.status(400).json({ message: "sai mật khẩu" });
          }
          const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET
          );
          res.status(200).json({
            message: "Đăng nhập thành công",
            token,
            user
          });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    register,
    login
}