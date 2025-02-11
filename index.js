// Steps to define Express Server
    // Load .env file contents into process.env
    require('dotenv').config()
    const express = require('express')
    const cors = require('cors')
    const router = require('./routes/router')
    require('./database/dbConnection')

    // Create server
    const expressServer = express()
    // use cors
    expressServer.use(cors())
    expressServer.use(express.json())
    // use router   
    expressServer.use(router)
    // for iMages
    expressServer.use('/uploads',express.static('./uploads'))
    // Port
    const PORT = 3000 || process.env.PORT
    // 
    expressServer.listen(PORT,()=>{
        console.log(`Project Fair Server Started Running @ port:${PORT} and waiting for client request`);
    })
    expressServer.get('/',(req,res)=>{
        res.status(200).send('<h1 style="color:red;">My Project Fair Server Started Running </h1>')
    })
    expressServer.post('/',(req,res)=>{
        res.status(200).send('POST Request')
    })
