const db = require("../config/db.config");

async function checkUserByEmail(email) {
    try {
        const [findUser] = await db.execute("SELECT * FROM users WHERE email=?",[email]);
        return findUser[0]
    } catch (error) {
        console.log(error);
    }
}

async function addUser(username, password, email,phonenumber,address) {
    try {
      const [result] = await db.execute(
        "insert into users (username, password, email,phonenumber,address) values (?, ?, ?,?,?)",
        [username, password, email, phonenumber, address]
      );
      return result.insertId;
    } catch (error) {
      console.log(error);
    }
  }

module.exports = {
    checkUserByEmail,
    addUser
}