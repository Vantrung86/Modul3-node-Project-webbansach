const { getAllProduct, postOneProduct, deleteOneProduct, putOneProduct, getOneProductById, searchProductMysql } = require("../services/product.service");

//lay product
async function getProduct(req,res) {
    try {
        const result = await getAllProduct()
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
    }
}
//lay product theo id
async function getProductById(req,res) {
    try {
        const {id} = req.params
        const result = await getOneProductById(id)
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
    }
}
//them product
async function postProduct(req,res) {
    try {
        const id = await postOneProduct(req.body)
        if (!id) {
            return res.status(500).json({
                message:"Lối server"
            })
        }
        res.status(201).json({
            message:"Thêm thành công"
        })
    } catch (error) {
        console.log(error);
    }
}
//xoa product
async function deleteProduct(req,res) {
    try {
        const {id} = req.params
        const result = await deleteOneProduct(id)
        if (result) {
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
//update product
async function putProduct(req,res) {
    try {
        const {id} = req.params
        const result = await putOneProduct(id,req.body)
        if (result) {
            return res.status(500).json({
                message:"Lối server"
            })
        }
        res.status(201).json({
            message:"Cập nhật thành công"
        })
    } catch (error) {
        console.log(error);
    }
}
//search product
async function searchProduct(req,res) {
    try {
        const {key} = req.query
        const result = await searchProductMysql(key)
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    getProduct,
    getProductById,
    postProduct,
    deleteProduct,
    putProduct,
    searchProduct
}