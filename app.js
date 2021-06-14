const port = process.env.PORT || 3000
const express = require('express')
const app = express()
const router = require("./routes/User")

require('dotenv').config()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/public", express.static("public"))

app.set('view engine','pug')
app.set('views','./views')

app.use('/', router)



app.listen(port, ()=>{
    console.log(`servidor: http://localhost:${port}`)
})