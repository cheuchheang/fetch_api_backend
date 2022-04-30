const controller = require("./../controllers/user.controller");
const authJwt = require("../middlewares/auth/authJwt");
// export default
module.exports = (app) => {
  app.get(
    "/api/v1/users",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getUsers
  );
  app.get(
    "/api/v1/users/user",
    [authJwt.verifyToken, authJwt.isUser],
    controller.getUser
  );
  app.get(
    "/api/v1/users/current_user",
    [authJwt.verifyToken],
    controller.getCurrentUser
  );
  app.post("/api/v1/auth/signout",controller.signout);

  app.post("/api/v1/auth/signup", controller.signup);
  app.post("/api/v1/auth/signin", controller.signin);
  app.post("/users", controller.createUser);
  app.put("/users/:id", controller.updateUser);
  app.delete("/users/:id", controller.deleteUser);
};
