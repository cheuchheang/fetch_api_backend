const mongoose = require('mongoose')

const navSchema = mongoose.Schema({
    id:{
        type: String,
        require:true
    },
    title:{
        type: String,
        require:true
    },
    path:{
        type: String,
        require:true
    },
    type:{
        type: String,
        require:true
    },
})
const Navigations = mongoose.model("navigations", navSchema);
module.exports = Navigations;