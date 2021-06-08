
//CONEXIÓN BBDD MONGOOSE

const mongoose = require('mongoose');



// Conexión
const db = //falta url para conectar a nuestra BBDD en mongodb compass
mongoose.connect(db,{useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true})
   .then((result) => app.listen(3000))
   .catch((err) => console.log(err)); 

//FALTA CRUD