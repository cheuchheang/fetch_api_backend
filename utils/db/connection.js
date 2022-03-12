const db = require("../../models");
const connectionDB = async () => {
  try {
    await db.mongoose.connect("mongodb://localhost:27017/place");
    console.log("- - - - - * Success * - - - - - - -");
  } catch {
    throw error;
  }
};
module.exports = connectionDB;
