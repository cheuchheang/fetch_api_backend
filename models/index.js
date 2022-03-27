const mongoose = require("mongoose");
const Articles = require("./articleContents.model");
const Comments = require("./comments.model");
const Contents = require("./contents.model");
const Navigations = require("./navigationBar.model");

let db = {};
db.mongoose=mongoose;
db.navigations = Navigations;
db.contents = Contents;
db.comments = Comments;
db.articles = Articles;
module.exports = db;
