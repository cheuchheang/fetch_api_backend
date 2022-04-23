const mongoose = require("mongoose")

const contentSchema= mongoose.Schema({
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
	  date:{type:Date, default: Date.now},
})
const Contents = mongoose.model("contents", contentSchema);
module.exports = Contents;
