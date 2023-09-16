const mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/hack')
    .then(d=>console.log("Schedule Connection Secured"))
    .catch(err=> console.log("Schedule Connection Error"));

const schedule_schema = new mongoose.model({
    
})