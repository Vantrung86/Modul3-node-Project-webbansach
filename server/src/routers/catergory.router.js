const { getCatergory, postCatergory, deleteCatergory, putCatergory, getSearch } = require("../controllers/catergory.controller");
// const { verifyToken } = require("../middleware/middleware");



const catergoryRouter=(app)=>{
    app.get("/api/v1/catergory", getCatergory);
    app.post("/api/v1/catergory", postCatergory);
    app.delete("/api/v1/catergory/:id", deleteCatergory);
    app.put("/api/v1/catergory/:id", putCatergory);
    app.get("/api/v1/search", getSearch)
};

module.exports = {
    catergoryRouter,
}