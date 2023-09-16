const express = require("express");
const router = express.Router();
const {storage} = require("../cloudinary/cloud")

const Case = require("../models/case");
const Algo = require("../models/algo");
const Schedule = require("../models/schedule");
const Evidence = require("../models/evidence");

const dayjs = require("dayjs");
const multer = require("multer")

const upload = multer({storage})

const day = []

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

    push_case.Algo = push_algo

    await push_case.save()
    await push_algo.save()
    res.redirect("/event")
})

router.get("/:id", async(req,res)=>{
    const find_case = await Case.findById(req.params.id).populate("Algo");
    console.log(find_case);
    res.render("show",{find_case})
})

router.get("/:id/evidence", async(req,res)=>{
    const find_case = await Case.findById(req.params.id).populate("Evidence_Pet","Evidence_Res")
    let msg_1 = ""
    let msg_2 = ""
    if(!find_case.Evidence_Pet){
        msg_1 = "Empty"
        msg_2 = "Empty"
    }
    console.log(find_case);
    res.render("evidence",{find_case,msg_1,msg_2});
})

router.get("/:id/evidence/new", async(req,res)=>{
    const find_case = await Case.findById(req.params.id)
    res.render("AddEvidence",{find_case})
})

router.post("/:id/evidence/post", upload.array("img") , async(req,res)=>{
    const find_case = await Case.findById(req.params.id)
    const push_evidence = new Evidence({
        Belongings : req.body.Belongings ,
        Details : req.body.Details
    })
    req.files && console.log(req.files[0].filename);
    res.send("your")
})

module.exports = router;

