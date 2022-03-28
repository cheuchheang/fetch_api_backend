const mongoose = require("mongoose");

const articleSchema =mongoose.Schema(
    {
    datetime: {
        type: String,
        required: true,
      },
      lowerContent: {
        type: String,
        required: true,
      },
      upperContent: {
        type: String,
        required: true,
      },
      authorName: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      placeUrl:{
        type: String,
        require:true
      }
    }
)
const Articles = mongoose.model("articles", articleSchema);
module.exports = Articles;
