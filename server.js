const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors=require('cors')
const morgan = require('morgan')

app.use(bodyParser.urlencoded())
app.use(morgan('tiny'))
app.use(cors({
  origin: '*',
  methods: ['GET',"POST","PUT","DELETE"],
}))

app.use(express.json());

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
require('./routes/user.routes')(app)

app.listen(port, () => {
  console.log(`Server is starting on port ${port}`);
});
