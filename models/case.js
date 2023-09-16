const mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/hack')
    .then(d=>console.log("case Connection Secured"))
    .catch(err=> console.log("case Connection Error"));

const case_schema = new mongoose.Schema({
    Name : String ,

    Crime : {
        type : String,
        enum : ["Civil","Criminal"]
    },

    Hearing : {
        type : String,
        default : 0
    },

    Petioner : String ,

    Respondent : String ,

    Case_Type : String 
})

const Case = mongoose.model("Case",case_schema);

module.exports = Case;
    
    