const mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/hack')
    .then(d=>console.log("algo Connection Secured"))
    .catch(err=> console.log("algo Connection Error"));

const algo_schema = new mongoose.Schema({
    Priority : {
        type : String,
        enum : ["Quick - High Priority","Slow - Low Priority"]
    },

    Extention_No : {
        type : Number,
        default : 0
    },

    Extended : {
        type : Boolean
    },

    Deadline : String ,

    Connect : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Case"
    }
})

const Algo = mongoose.model("Algo",algo_schema)
module.exports = Algo