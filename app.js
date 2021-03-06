const port = process.env.PORT || 3000;
const  router = require('./routes/User');
const routerAdmin =require('./routes/routesApiAdmin')
const express = require('express');
const app = express();

require('dotenv').config();
require('./utils/connectDB');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/public", express.static("public"))

app.set('view engine','pug')
app.set('views','./views')

app.use("/", router)
app.use("/apiAdmin",routerAdmin)

app.listen(port, ()=>{
    console.log(`servidor: http://localhost:${port}`)
})