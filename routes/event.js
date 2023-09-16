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

router.get("/create",(req,res)=>{
    res.render("create");
})

router.post("/create/case", async(req,res)=>{
    const push_case = new Case({
        Name : req.body.Name,
        Crime : req.body.Crime,
        Respondent : req.body.Respondent,
        Petioner : req.body.Petioner,
        Case_Type : req.body.case_type
    })

    const push_algo = new Algo({
        Priority : req.body.Priority,
        Deadline : req.body.Deadline
    })

    push_algo.Connect = push_case

    await push_case.save()
    await push_algo.save()
    res.redirect("/event")
})

module.exports = router;

