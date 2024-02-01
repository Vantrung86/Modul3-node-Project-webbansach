const db = require("../config/db.config")

//lay product
async function getAllProduct() {
    try {
        const [result] = await db.execute("SELECT * FROM `product` JOIN catergory ON product.catergoryId=catergory.id");
        return result
    } catch (error) {
        console.log(error);
    }
};
//lay product theo id
async function getOneProductById(id) {
    try {
        const [result] = await db.execute("SELECT * FROM `product` WHERE productId=?",[id])
        return result[0];
    } catch (error) {
        console.log(error);
    }
}
//them product
async function postOneProduct(obj) {
    try {
        const {nameProduct,src,price,author,catergoryId} = obj
        const [result] = await db.execute("INSERT INTO product (nameProduct,src,price,author,catergoryId) VALUES (?,?,?,?,?)",
        [nameProduct,src,+price,author,+catergoryId])
        return result.insertId;
    } catch (error) {
        console.log(error);
    }
}
//xoa product
async function deleteOneProduct(id) {
    try {
        const [result] = await db.execute("DELETE FROM product WHERE productId=?",[id])
        return result.insertId
    } catch (error) {
        console.log(error);
    }
}
//update product
async function putOneProduct(id,obj) {
    try {
        const {nameProduct,src,price,author,catergoryId} = obj
        const [result] = await db.execute("UPDATE product SET nameProduct=?,src=?,price=?,author=?,catergoryId=? WHERE productId=?"
        ,[nameProduct,src,+price,author,+catergoryId,id])
        return result.insertId;
    } catch (error) {
        console.log(error);
    }
}
//search product
async function searchProductMysql(search) {
    try {
        const [result] = await db.execute(`SELECT * FROM product WHERE nameProduct LIKE "%${search}%"`);
        return result
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    getAllProduct,
    getOneProductById,
    postOneProduct,
    deleteOneProduct,
    putOneProduct,
    searchProductMysql
}