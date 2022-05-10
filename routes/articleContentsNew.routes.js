const controller = require("../controllers/articleContentsNew.controller");
const authJwt = require("../middlewares/auth/authJwt");
module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  // app.get("/place/articlesnew", controller.getArticleContentsNew);
  // app.post("/place/articlesnew",[authJwt.verifyToken,authJwt.isAdminOrUser], controller.createArticleContentNew);
  // app.put("/place/articlesnew/:articleId",[authJwt.verifyToken,authJwt.isAdminOrUser], controller.updateArticleContentNew);
  // app.delete("/place/articlesnew/:articleId",[authJwt.verifyToken,authJwt.isAdminOrUser], controller.deleteArticleContentNew);
  app.get("/place/articlesnew", controller.getArticleContentsNew);
  app.post("/place/articlesnew", controller.createArticleContentNew);
  app.put("/place/articlesnew/:articleId", controller.updateArticleContentNew);
  app.delete("/place/articlesnew/:articleId", controller.deleteArticleContentNew);
};
