const mongoose = require("mongoose")
const user_schma = new  mongoose .Schema(
    { name : {type : String ,required : true},
        email : {type : String, required : true,unique : true},
        password : {type : String , required : true}

    }
)
const user =mongoose.model("32", user_schma)

module.exports =  user