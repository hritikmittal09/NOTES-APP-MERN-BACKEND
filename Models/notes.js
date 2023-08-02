const mongoose = require("mongoose")
const user =require("../Models/user")
var Schema = mongoose.Schema;
const notes_schma = new  mongoose .Schema(
    { User :{ type: mongoose.Schema.Types.ObjectId , ref :"User"},
        title : {type : String ,required : true},
        dis : {type : String, required : true},
        
    

    }
)
module.exports = mongoose.model("Notes", notes_schma)