const mongoose = require('mongoose')

const connectionString = process.env.DBCONNECTIONSTRING

mongoose.connect(connectionString).then(res=>{
    console.log("MongoDB Atlas Connected Successfully with PFServer...!");
}).catch(err=>{
    console.error(`MongoDB Atlas Connection Failed = ${err}`)
})