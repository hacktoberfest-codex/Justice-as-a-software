const mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/hack')
    .then(d=>console.log("evidence Connection Secured"))
    .catch(err=> console.log("evidence Connection Error"));

const evidence_schema = new mongoose.Schema({
    Images : [
        {
            url : String,
            filename : String
        }
    ],

    Belongings : {
        type : String,
        enum : ["Respondent","Petioner"]
    },

    Details : String,
})

const Evidence = mongoose.model("Evidence",evidence_schema)
module.exports = Evidence