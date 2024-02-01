const { getAllCatergory, postOneCatergory, deleteOneCatergory, putOneCatergory, getBySearch } = require("../services/catergory.service");

//lay
async function getCatergory(req,res) {
    try {
        const result = await getAllCatergory()
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
    }
};
//them
async function postCatergory(req,res) {
    const {catergoryName} = req.body;
    const id = await postOneCatergory(catergoryName)
    if (!id) {
        return res.status(500).json({
            message:"Có lỗi"
        })
    }
    res.status(201).json({
        message:"Thêm catergory thành công"
    })
}

//xoa
async function deleteCatergory(req,res) {
    try {
        const {id} = req.params
        const result = await deleteOneCatergory(id)
        if (result) {
            return res.status(500).json({
                message:"Có lỗi"
            })
        }
        res.status(200).json({
            message:"Đã xoá thành công"
        })
    } catch (error) {
        console.log(error);
    }
}

//Update
async function putCatergory(req,res) {
    try {
        const {id} = req.params;
        const {catergoryName} = req.body
        const result = await putOneCatergory(id,catergoryName);
        if (result) {
            return res.status(500).json({
                message:"Có lỗi"
            })
        }
        res.status(200).json({
            message:"Cập nhật thành công"
        })
    } catch (error) {
        console.log(error);
    }
}
//search
async function getSearch(req,res) {
    try {
        const {key} = req.query
        const result = await getBySearch(key)
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    getCatergory,
    postCatergory,
    deleteCatergory,
    putCatergory,
    getSearch
}