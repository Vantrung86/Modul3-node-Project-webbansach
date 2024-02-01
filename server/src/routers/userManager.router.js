const { getUser, putUser } = require("../controllers/userManager.controller");

const userManagerRouter = (app) => {
    app.get("/api/v1/users",getUser);
    app.put("/api/v1/users/:id",putUser)
};

module.exports = {
    userManagerRouter,
}