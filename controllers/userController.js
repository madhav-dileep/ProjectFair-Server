const users = require('../models/userModel')
const jwt = require('jsonwebtoken')

// Register
exports.registerController = async (req, res) => {
    // console.log(`inside Register Controller`);
    // console.log(req.body);
    const { userName, email, password } = req.body
    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            res.status(406).json("Already Existing User..! Please Login")
        } else {
            const newUser = new users({
                userName,
                email,
                password,
                github: '',
                linkedIn: '',
                profilePicture: ''
            })
            await newUser.save()
            res.status(200).json(newUser)
        }

    } catch (e) {
        res.status(401).json(e)
        // console.error(e);
    }

    // res.status(200).json("Register Request Recieved....")
}

// Login
exports.loginController = async (req, res) => {
    console.log("Inside Login Controller");
    const { email, password } = req.body
    // console.log(email,password);
    try {
        const existingUser = await users.findOne({ email, password })
        if (existingUser) {
            // code for token generation
            const token = jwt.sign({ userId: existingUser._id }, process.env.JWTPASSWORD)
            res.status(200).json({ user: existingUser, token })
        } else {
            res.status(404).json("Incorrect Email/Password!")
        }
    } catch (e) {
        // console.error(e)
        res.status(401).json(e)
    }

}

// edit User
exports.editUserController = async (req, res) => {
    console.log("inside editUserController");
    const { userName, email, password, github, linkedIn, profilePicture } = req.body;
    const uploadProfilePicture = req.file ? req.file.filename : profilePicture;
    const userId = req.userId
    try {
        const updatedUser = await users.findByIdAndUpdate({ _id: userId }, { userName, email, password, github, linkedIn, profilePicture: uploadProfilePicture },{new:true})
        await updatedUser.save()
        res.status(200).json(updatedUser)
    } catch (e) {
        res.status(401).json(e)
    }

}