const mongoose = require("mongoose");

const articleSchemaNew = mongoose.Schema({
  // need to change this schema after Vutey design new schema

  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  authorName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    require: true,
  },
  contents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "contents"
    },
  ],
  date: { type: Date, default: Date.now },
});

const ArticlesNew = mongoose.model("articlesnew", articleSchemaNew);
module.exports = ArticlesNew;
