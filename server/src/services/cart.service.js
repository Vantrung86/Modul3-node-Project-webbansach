const db = require("../config/db.config");
//Lay cart theo userId
async function getCartByUserId(user_id) {
  try {
    const [cart_user] = await db.execute(
      "select * from cart join product on cart.productId = product.productId join catergory on product.catergoryId = catergory.id where userId = ?",
      [user_id]
    );
    return cart_user;
  } catch (error) {
    console.log(error);
  }
}
//kiem tra sp trong cart
async function checkProductCart(userId,productId) {
    try {
        const [check] = await db.execute(
            "select * from cart where userId = ? and productId = ?",
            [userId,productId]
          );
          return check[0];
    } catch (error) {
        console.log(error);
    }
};
//them cart
async function addToCartMysql(userId,productId) {
    try {
      const [result] = await db.execute(
        "insert into cart (userId,productId, quantity) values (?,?,1)",
        [userId, productId]
      );
      return result.insertId;
    } catch (error) {
      console.log(error);
    }
  }
//update quantity
async function updateQuantity(userId,productId) {
    try {
      const [result] = await db.execute(
        "update cart set quantity = quantity + 1 where userId = ? and productId = ?",
        [userId,productId]
      );
      return result.insertId;
    } catch (error) {
      console.log(error);
    }
  }
  //delete cart
  async function deleteOneCart(cartId) {
    try {
      const [result] = await db.execute("DELETE FROM cart WHERE cartId=?",[cartId])
      return result.insertId
    } catch (error) {
      console.log(error);
    }
  }
  //giam quantity
  async function decreaseOneQuantity(cartId) {
    try {
      const [result] = await db.execute("UPDATE cart SET quantity = quantity - 1 WHERE cartId=?",[cartId]);
      return result.insertId
    } catch (error) {
      console.log(error);
    }
  }
  //tang quantity
  async function increaseOneQuantity(cartId) {
    try {
      const [result] = await db.execute("UPDATE cart SET quantity = quantity + 1 WHERE cartId=?",[cartId]);
      return result.insertId
    } catch (error) {
      console.log(error);
    }
  }
  //xoa all cart
  async function deleteAllCart(id) {
    try {
       const [result] = await db.execute("DELETE FROM cart WHERE userId=?",[id]);
       return result
    } catch (error) {
      console.log(error);
    }
  }
module.exports = {
    getCartByUserId,
    checkProductCart,
    addToCartMysql,
    updateQuantity,
    deleteOneCart,
    decreaseOneQuantity,
    increaseOneQuantity,
    deleteAllCart
}