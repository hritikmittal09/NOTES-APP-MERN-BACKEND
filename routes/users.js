
const User = require("../Models/user");
const bcrypt = require("bcryptjs");
const express = require("express");
const jwt = require("jsonwebtoken");
const route = express.Router();
require("dotenv");
const fetch_user =require("../middleware/fetch_user")
const jwt_secret_key = "hritik@09";

route.get("/", (req, res) => {
  res.send("user route is working");
});


route.post("/create", async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const password = req.body.password;
  

  const hash = await bcrypt.hash(req.body.password, salt);
  if (req.body.name == "" || req.body.password.length < 5) {
    res.status(400).json({ message: "Bad Request" });
  } else {
    const user_json = {
      name: req.body.name,
      email: req.body.email,
      password: hash,
    };
    
    const new_user = new User(user_json);
    new_user
      .save()
      .then((s) => {
        data = {
          user :{id : new_user.id}
        }
        const jwt_token = jwt.sign(data,jwt_secret_key)
        
        res.status(201).json({ message: "user created successfully" , "token": jwt_token});
      })
      .catch((error) => {
        if (
          error.code === 11000 &&
          error.keyPattern &&
          error.keyPattern.email === 1
        ) {
          // Duplicate key error, email is already taken
          res.status(400).json({ error: "Email already exists." });
        }
      });
  }
});
route.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (email == "" || password.length < 5) {
    res.status(400).json({ message: "bad request" });
  } else {
    try {
      const login_user = await User.findOne({ email: email });
      if (!login_user) {
        res
          .status(400)
          .json({ message: "wrong credentials try agin", Login: 0 });
      }
      const comparePass = await bcrypt.compare(password, login_user.password);
      if (!comparePass) {
        res
          .status(400)
          .json({ message: "wrong credentials try agin", login: 0 });
      } else {
        const data = {User:{id: login_user.id}}
        const token = jwt.sign(data,jwt_secret_key)
        res.json({ message: "Login successful","token": token });
      }
    } catch (error) {
      res.json({ message: "someting went wrong " });
    }
  }
});
//get user-details login required
route.get("/info" ,fetch_user, async (req,res)=>{

  try {
     //res.send("middle ware wrks")
     const userid = req.user.id;
    const getuserinfo = await User.findById(userid).select("-password");
    res.send(getuserinfo)  
  } catch (error) {
    res.send(error)
    
  }
})
module.exports = route;
