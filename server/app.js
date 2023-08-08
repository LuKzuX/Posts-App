require("dotenv").config()
const express = require("express")
const app = express()
const router = require(`./routes/routes`)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(`/api`, router)

app.listen(3000, () => {
  console.log("server is listening...")
})
