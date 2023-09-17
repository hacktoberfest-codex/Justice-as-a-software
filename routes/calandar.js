const express = require("express")
const router = express.Router()
const {google} = require("googleapis")
const dayjs = require("dayjs")
require("dotenv").config()

const {get_data} = require("./event")

const calendar = google.calendar({
    version : "v3",
    auth : process.env.API_KEY
})


const oauth2Client = new google.auth.OAuth2(
    process.env.Client_ID,
    process.env.Client_Secret,
    process.env.Client_URL,
)

const scopes = [
    'https://www.googleapis.com/auth/calendar',
    'https://www.googleapis.com/auth/calendar.events.owned',
]

router.get("/",(req,res)=>{
    const url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes
    });
    res.redirect(url);
})

Set_Event = async(get_data)=>{
    await calendar.events.insert({
        calendarId : "primary",
        auth : oauth2Client,
        requestBody : {
            summary : get_data[1],
            description : "Some imp event",
            start : {
                dateTime : dayjs(get_data[0]).toISOString(),
                timeZone : "Asia/Kolkata"
            },
            end : {
                dateTime : dayjs(get_data[0]).add(1,"hour").toISOString(),
                timeZone: "Asia/Kolkata"
            },
        }
    })
    get_data.splice(0, get_data.length)
}

router.get("/redirect", async (req,res)=>{
    const {code} = req.query;
    const {tokens} = await oauth2Client.getToken(code)
    oauth2Client.setCredentials(tokens)
    Set_Event(get_data)
    res.redirect("/event")
})

router.get("/EventDetails",async(req,res)=>{
    const lists = await calendar.events.list({
        calendarId : "primary",
        auth : oauth2Client,
        timeMin : dayjs().add(0,"day").toISOString(),
        timeMax : dayjs().add(5,"day").toISOString()
    })
    console.log(lists.data.items);
    res.send("check lists")
})

module.exports = router