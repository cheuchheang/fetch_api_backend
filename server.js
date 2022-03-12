const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.port;

//all routes
require("./routes/articleContents.routes")(app);
require("./routes/comments.routes")(app);
require("./routes/contents.routes")(app);
require("./routes/navigationBar.routes")(app);

app.listen(port, () => {
  console.log(`Server is starting on port ${port}`);
});
