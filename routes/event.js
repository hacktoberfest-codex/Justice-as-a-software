const express = require("express");
const router = express.Router();
const {storage} = require("../cloudinary/cloud")

const Case = require("../models/case");
const Algo = require("../models/algo");
const Schedule = require("../models/schedule");
const Evidence = require("../models/evidence");

const dayjs = require("dayjs");
const multer = require("multer");

const upload = multer({storage})

let day = [
    {
        date : "2023-09-17",
        slots : 6
    }
]

let get_data = [];

router.get("/Schedule", async(req,res)=>{
    const find_case = await Case.find().populate("Schedule");
    console.log(find_case);
    res.render("listing",{find_case});
})

router.get("/Calandar",(req,res)=>{
    res.render("calender");
})

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

    get_data.push(await Schedule.SearchAndAdd(day));
    get_data.push(push_case.Name);

    const push_schedule = new Schedule({
        Date : get_data[0].format("YYYY-MM-DD"),
        Start : get_data[0].format("HH-mm"),
        End : get_data[0].add(1,"hour").format("HH-mm")
    })

    push_case.Algo = push_algo
    push_case.Schedule = push_schedule

    await push_case.save()
    await push_algo.save()
    await push_schedule.save()
    res.redirect("/google")
})

router.get("/:id", async(req,res)=>{
    const find_case = await Case.findById(req.params.id).populate("Algo");
    console.log(find_case);
    res.render("show",{find_case})
})

router.get("/:id/evidence", async(req,res)=>{
    const find_Evidence_Res = await Evidence.find({Case : req.params.id , Belongings : "Respondent" });
    const find_Evidence_Pet = await Evidence.find({Case : req.params.id , Belongings : "Petioner" });
    const find_case = await Case.findById(req.params.id);
    let msg_1 = ""
    let msg_2 = ""

    if(!find_case.Evidence_Pet){
        msg_1 = "Empty"
    }

    if(!find_case.Evidence_Res){
        msg_2 = "Empty"
    }
    res.render("evidence",{find_case,find_Evidence_Res,find_Evidence_Pet,msg_1,msg_2});
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
    req.files && push_evidence.Images.push({url : req.files[0].path , filename : req.files[0].filename});
    push_evidence.Case=find_case
    await push_evidence.save();
    res.redirect("/event")
})

module.exports = {
    router,
    get_data
}

