const mongoose = require("mongoose");
const dayjs = require("dayjs")

mongoose.connect('mongodb://127.0.0.1:27017/hack')
    .then(d=>console.log("Schedule Connection Secured"))
    .catch(err=> console.log("Schedule Connection Error"));

const schedule_schema = new mongoose.Schema({
    Date : String ,
    Strart : String ,
    End : String
})

schedule_schema.statics.SearchAndAdd = async function(){
    console.log(dayjs());
}

check = [
    {
        date : "2023-09-17",
        slots : 6
    }
]

let day = dayjs().set("hour",10).set("minute",30)
let temp 
let placed = false;
for(let i of check){
    let day_2 = dayjs(i.date).format("DD-MM")
    if(day.format("DD-MM") === day_2){ //events exist 
        if(slots!==0){ //slot free
            console.log("push_1");
        }
    }
}
let i=0;
while(!placed){
    day = dayjs(day).add(i,"day")
    for(let i of check){
        if(day.day()!=0 && i.slots!==0){
            console.log("push");
        }
    }
}

const Schedule = mongoose.model("Schedule",schedule_schema)
module.exports = Schedule