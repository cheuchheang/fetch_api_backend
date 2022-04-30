const mongoose = require("mongoose");
const Articles = require("./articleContents.model");
const Comments = require("./comments.model");
const Contents = require("./contents.model");
const Navigations = require("./navigationBar.model");
const ArticlesNew = require("./articleContentsNew.model")
const User = require("./user.model")

let db = {};
db.mongoose=mongoose;
db.navigations = Navigations;
db.users= User;
db.contents = Contents;
db.comments = Comments;
db.articles = Articles;
db.articlesnew=ArticlesNew
module.exports = db;
