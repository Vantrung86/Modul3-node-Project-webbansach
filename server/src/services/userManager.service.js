const db = require("../config/db.config");

//lay
async function getAllUser() {
    try {
        const [result] = await db.execute("SELECT * FROM users");
        return result;
    } catch (error) {
        console.log(error);
    }
};
//cap nhat status
async function putOneUser(id,status) {
    try {
        const [result] = await db.execute("UPDATE users SET status=? WHERE id=?",[!status,id])
        return result.insertId
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getAllUser,
    putOneUser
}