const express = require("express");
const router = express.Router();

const Case = require("../models/case");
const Algo = require("../models/algo");
const Schedule = require("../models/schedule");

const dayjs = require("dayjs");

router.get("/", async(req,res)=>{
    const find_case = await Case.find({})
    res.render("Home",{find_case})
})

module.exports = router;

