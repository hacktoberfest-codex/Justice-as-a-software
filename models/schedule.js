const mongoose = require("mongoose");
const dayjs = require("dayjs")

mongoose.connect('mongodb://127.0.0.1:27017/hack')
    .then(d=>console.log("Schedule Connection Secured"))
    .catch(err=> console.log("Schedule Connection Error"));

const schedule_schema = new mongoose.Schema({
    Date : String ,
    Start : String ,
    End : String ,
    Case : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Case"
    }
})

schedule_schema.statics.SearchAndAdd = async function(dates){
    let day = dayjs().add(4,"day").set("hour",10).set("minute",30);
    console.log(day);
    console.log(dates);
    let placed = false;
    for(let i of dates){
        let day_2 = dayjs(i.date).format("DD-MM")
        if(day.format("DD-MM") === day_2){ //events exist 
            if(i.slots!==0){ //slot free
                placed = true;
                console.log("hello");
                day = dayjs(i.date).set("hour",10+(6-i.slots)).set("minute",30)
                i.slots--
            }
        }
    }

    if(!placed){
        let escape = false
        for(let j=1 ; j<=dates.length ; j++){ //diff day events
            for(let i of dates){
                let date_1 = dayjs(day).format("YYYY-MM-DD")
                let date_2 = dayjs(i.date).format("YYYY-MM-DD")
                if(day.day()!==0 && date_1===date_2 && i.slots!==0){
                    placed = true;
                    console.log("hello");
                    day = day.set("hour",10+(6-i.slots)).set("minute",30)
                    i.slots--
                    escape = true
                    break;
                }
            }
            if(!escape){
                day = dayjs(day).add(1,"day")
            }
        }
    }

    if(!placed){
        if(day.day() === 0){
            day = dayjs(day).add(1,"day").set("hour",10).set("minute",30)
        }
        console.log("hii");
        dates.push({
            date : day.format("YYYY-MM-DD"),
            slots : 5
        })
    }
    return day
}

const Schedule = mongoose.model("Schedule",schedule_schema)
module.exports = Schedule