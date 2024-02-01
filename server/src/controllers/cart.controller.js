const { checkProductCart, addToCartMysql, updateQuantity, getCartByUserId, deleteOneCart, decreaseOneQuantity, increaseOneQuantity, deleteAllCart } = require("../services/cart.service");

//lay cart
async function getCart(req,res) {
    try {
        const {userId} = req.params
        const cart = await getCartByUserId(userId)
        res.status(200).json(cart)
    } catch (error) {
        console.log(error);
    }
}

//them 
async function addToCart(req,res) {
    try {
        const {userId} = req.params
        const {productId} = req.body
        const check = await checkProductCart(userId,productId);
        if (!check) {
            await addToCartMysql(userId,productId);
            return res.status(201).json({
                message:"Thêm cart thành công"
            })
        }
        await updateQuantity(userId,productId);
        res.status(200).json({
          message: "Thêm quantity thành công",
        });   
    } catch (error) {
        console.log(error);
    }
};

//xoa
async function deleteCart(req,res) {
    try {
        const {cartId} = req.params
        const id = await deleteOneCart(cartId)
        if (id) {
            return res.status(500).json({
                message:"Lối server"
            })
        }
        res.status(200).json({
            message:"Xoá thành công"
        })
    } catch (error) {
        console.log(error);
    }
}
//giam quantity
async function decreaseQuantity(req,res) {
    try {
        const {cartId} = req.params
        const id = await decreaseOneQuantity(cartId)
        if (id) {
            return res.status(500).json({
                message:"Lối server"
            })
        }
        res.status(200).json({
            message:"Giảm quantity thành công"
        })
    } catch (error) {
        console.log(error);
    }
}
//tang quantity
async function increaseQuantity(req,res) {
    try {
        const {cartId} = req.params
        const id = await increaseOneQuantity(cartId)
        if (id) {
            return res.status(500).json({
                message:"Lối server"
            })
        }
        res.status(200).json({
            message:"Tăng quantity thành công"
        })
    } catch (error) {
        console.log(error);
    }
}
//xoa theo user
async function deleteCartByUser(req,res) {
    try {
        const {id} = req.params
        await deleteAllCart(id);
        res.status(200).json()
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    getCart,
    addToCart,
    deleteCart,
    decreaseQuantity,
    increaseQuantity,
    deleteCartByUser
}