const db = require("../config/db.config");

async function createOrderMysql(
  userId,
  totalOrderpay,
  dayOrder,
  nameOrder,
  address,
  name,
  SDT
) {
  try {
    const [result] = await db.execute(
      "INSERT INTO `order`(userId,totalOrderpay,dayOrder,nameOrder,address,name,SDT) VALUES (?,?,?,?,?,?,?)",
      [userId, totalOrderpay, dayOrder, nameOrder, address, name, SDT]
    );
    return result.insertId
  } catch (error) {
    console.log(error);
  }
};

//lay theo user
async function getBillByUserId(id) {
  try {
    const [result] = await db.execute("select * from `order` where userId=?",[id])
    return result
  } catch (error) {
    console.log(error);
  }
}
//lay tat ca order
async function getAllOrderMysql() {
  try {
    const [result] = await db.execute("select * from `order`");
    return result
  } catch (error) {
    console.log(error);
  }
}
//status huy
async function putOrderCancelMysql(id) {
  try {
    const [result] = await db.execute("UPDATE `order` SET status=? WHERE orderId=?",["Huỷ",id]);
    return result.insertId
  } catch (error) {
    console.log(error);
  }
}
//status duyet
async function patchOrederAccessMysql(id) {
  try {
    const [result] = await db.execute("UPDATE `order` SET status=? WHERE orderId=?",["Duyệt",id]);
    return result.insertId
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  createOrderMysql,
  getBillByUserId,
  putOrderCancelMysql,
  getAllOrderMysql,
  patchOrederAccessMysql
};
