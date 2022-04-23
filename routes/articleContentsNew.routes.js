const controller = require("../controllers/articleContentsNew.controller");
module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/place/articlesnew", controller.getArticleContentsNew);
  app.post("/place/articlesnew", controller.createArticleContentNew);
  app.put("/place/articlesnew", controller.updateArticleContentNew);
  app.delete("/place/articlesnew/:id", controller.deleteArticleContentNew);
};
