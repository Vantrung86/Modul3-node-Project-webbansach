const { checkUserByEmail } = require("../services/user.service");
const jwt = require("jsonwebtoken");

//check email
const checkEmailExist = async (req, res, next) => {
  const { email } = req.body;
  const checkEmail = await checkUserByEmail(email);
  if (checkEmail) {
    return res.status(400).json({
      message: "Email đã được đăng ký",
    });
  }
  next();
};

//check rỗng register
async function checkEmpty(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Không được để trống",
      });
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

//check rỗng ở login
async function checkEmptyLogin(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({
          message: "Không được để trống",
        });
      }
      next();
    } catch (error) {
      console.log(error);
    }
  }

const verifyToken = (req, res, next) => {
  try {
    // Lấy token
    // authorization: Bearer token
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Không tìm thấy token" });
    }
    jwt.verify(token, "MABIMATJWT", (err, data) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          // Nếu token đã hết hạn
          return res.status(401).json({ message: "Token đã hết hạn" });
        } else {
          // Nếu token không hợp lệ
          return res.status(403).json({ message: "Token không hợp lệ" });
        }
      }
      // Nếu token hop le
      if (data.role != 1) {
        return res
          .status(403)
          .json({ message: "Bạn không được cấp quyền để thực hiện việc này!" });
      }
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  checkEmailExist,
  checkEmpty,
  verifyToken,
  checkEmptyLogin
};