const express = require("express");
const app = express()
const path = require("path")
require("dotenv").config()

const calandar = require("./routes/calandar");
const {router} = require("./routes/event")

app.use(express.urlencoded({extended : true}));

app.use(express.static(path.join(__dirname,"views")));

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");

app.use("/google",calandar)
app.use("/event",router)

app.listen(3000,()=>{
    console.log("Listening on PORT 3000");
})