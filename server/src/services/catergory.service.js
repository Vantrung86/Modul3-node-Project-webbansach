const db = require("../config/db.config");
//lay
async function getAllCatergory() {
    try {
        const [result] = await db.execute("SELECT * FROM catergory");
        return result
    } catch (error) {
        console.log(error);
    }
};
//them
async function postOneCatergory(name) {
    try {
        const [result] = await db.execute("INSERT INTO catergory (catergoryName) VALUES (?)",[name]);
        return result.insertId;
    } catch (error) {
        console.log(error);
    }
}

//xoa
async function deleteOneCatergory(id) {
    try {
        const [result] = await db.execute("DELETE FROM catergory WHERE id=?",[id]);
        return result.insertId
    } catch (error) {
        console.log(error);
    }
}
//update
async function putOneCatergory(id,name) {
    try {
        const [result] = await db.execute("UPDATE catergory SET catergoryName=? WHERE id=?", [name,id]);
        return result.insertId
    } catch (error) {
        console.log(error);
    }
}
//search
async function getBySearch(search) {
    try {
        const [result] = await db.execute(`SELECT * FROM catergory WHERE catergoryName LIKE "%${search}%"`)
        return result
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getAllCatergory,
    postOneCatergory,
    deleteOneCatergory,
    putOneCatergory,
    getBySearch
}