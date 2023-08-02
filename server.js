const connectToDB = require("./db")
const body_parser = require("body-parser")
const port = 80
const express = require("express")
const app = express()
app.use(express.json())
app.use(body_parser.urlencoded({ extended: false }))
// avaliable routes
app.use("/users",require("./routes/users"))
app.use("/notes",require("./routes/notes"))
app.get("/",(req,res)=>{
    
    res.send("server is working");

})
app.listen(port,()=>{
    try{
    connectToDB()
    }catch{
        console.log("Mongo DB server is down check it :(")
    }
    console.log(`server is started on ${port}`)

})
