require("dotenv").config()
const cors = require("cors")
const express = require("express")
const app = express()
const router = require(`./routes/routes`)

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

app.use(`/api`, router)

app.listen(5000, () => {
  console.log("server is listening...")
})
