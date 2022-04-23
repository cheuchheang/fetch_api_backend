const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors=require('cors')
app.use(bodyParser.urlencoded())
app.use(cors({
  origin: '*',
  methods: ['GET',"POST","PUT","DELETE"],
}))
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.port;
const connectionDB = require("./utils/db/connection");
connectionDB();
//all routes
require("./routes/articleContents.routes")(app);
require("./routes/articleContentsNew.routes")(app);
require("./routes/comments.routes")(app);
require("./routes/contents.routes")(app);
require("./routes/navigationBar.routes")(app);

app.listen(port, () => {
  console.log(`Server is starting on port ${port}`);
});
