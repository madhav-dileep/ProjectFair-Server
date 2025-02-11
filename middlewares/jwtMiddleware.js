const jwt = require('jsonwebtoken')

const jwtMiddleware = (req, res, next) => {
    console.log("inside jwtMiddleware");
    const token = req.headers['authorization'].split(' ')[1]
    console.log(token);
    if (token != '') {
        try{
            const jwtResponse = jwt.verify(token, process.env.JWTPASSWORD)
            // console.log(jwtResponse);
            req.userId = jwtResponse.userId
        }catch(e){
            res.status(401).json("Authorization Failed! Please Login.")
        }
        
    } else {
        res.status(404).json("Authorization Failed. Token is Missing!!!")
    }

    next()
}

module.exports = jwtMiddleware