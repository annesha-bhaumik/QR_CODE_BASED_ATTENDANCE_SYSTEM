import express from "express";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());
let activeSession = null;
let attendance = [];
//start session
app.post("/session/start", (req,res) => {
    const {subject, location} = req.body;
    if(!subject || !location)
    {
        return res.json({success : false, message : "Subject and location required"});
    }
    const date = new Date().toISOString().split("T")[0];
    activeSession = {subject, location, date};
    res.json({success : true, session : activeSession});
});
//end session
app.post("/session/end", (req,res) => {
    activeSession = null;
    res.json({success : true});
});
//get active session
app.get("/session", (req,res) => {
    res.json({session : activeSession});
});
//mark attendance
app.post("/attendance/mark", (req,res) => {
    const {username, location} = req.body;
    if(!username || !location)
    {
        return res.json({success : false, message : "Invalid request"});
    }
    if(!activeSession)
    {
        return res.json({success : false, message : "No active session"});
    }
    if(activeSession.location !== location)
    {
        return res.json({success : false, message : "Wrong location QR"});
    }
    const alreadyMarked = attendance.find(
        a => a.username === username && a.date === activeSession.date && a.subject === activeSession.subject
    );
    if(alreadyMarked)
    {    
        return res.json({success : false, message : "Already marked"});
    }
    attendance.push({
        username,
        subject : activeSession.subject,
        location,
        date : activeSession.date,
        time : new Date().toLocaleTimeString(),
        status : "Pending"
    });
    res.json({success : true});
});
//get attendance
app.get("/attendance", (req,res) => {
    res.json(attendance);
});
//verify attendance
app.post("/attendance/verify", (req,res) => {
    const {username, subject, date} = req.body;
    const record = attendance.find(a => a.username === username && a.subject === subject && a.date === date);
    if(!record)
    {
        return res.json({success : false, message : "Record not found"});
    }
    record.status = "Present";
    res.json({success : true});
});
//Server
app.listen(3000, () => {
    console.log("Backend running on http://localhost:3000");
});