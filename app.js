const port = process.env.PORT || 3000

const express = require('express')

require('dotenv').config()

app.use("/public", express.static("public"))

app.set('view engine','pug')
app.set('views','./views')

app.use('/', router)

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(port, ()=>{
    console.log(`servidor: http://localhost:${port}`)
})