const express = require("express");
const app = express()

const calandar = require("./routes/calandar");

app.use("/google",calandar)

app.listen(3000,()=>{
    console.log("Listening on PORT 3000");
})