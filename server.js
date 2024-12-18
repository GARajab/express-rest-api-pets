const dotenv = require("dotenv")
dotenv.config()
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const petRouter = require("./controllers/pets")
const cors = require("cors")
mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`)
})

app.use(express.json())
app.use(cors("http://localhost:5173"))

// Routes go here
app.use("/pets", petRouter)
app.listen(7777, () => {
  console.log("The express app is ready!")
})
