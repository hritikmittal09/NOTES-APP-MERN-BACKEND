const mongoose = require("mongoose");
 require('dotenv').config();

const mongo_uri = process.env.URL
const  connetToMongo = async() =>{
    mongoose.connect(mongo_uri)
    console.log("connected to DB successfully")

}
module.exports = connetToMongo