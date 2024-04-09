const express = require("express")
const app = express()
const mongoose = require("mongoose")
const body_parser = require("body-parser")
const cors = require("cors")
const dotenv = require('dotenv').config();
const route = require("./routes/UserRoutes")

const PORT = dotenv.parsed.PORT
const URL = dotenv.parsed.MONGO_URL
app.use(body_parser.json({limit:'10mb'}))
app.use(body_parser.urlencoded({limit:'10mb', extended: true}));
app.use(cors())


app.use("/user",route)
















app.use("/",(req, res,next) =>{
  res.send(`<h1> Server Started </h1>`);
});

//node server connection
mongoose.connect(URL).then(()=>{
  app.listen(PORT,(err)=>{
    if(err) throw err
    console.log(`Server is running on port ${PORT}`)
  })
}).catch((err)=>{
  console.log(err)
})