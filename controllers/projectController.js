const projects = require('../models/projectModel')

// Add Projects
exports.addProjectController = async (req, res) => {
    console.log("inside addProjectController");
    const userId = req.userId
    // console.log(userId);
    // console.log(req.body);
    const { title, languages, overview, github, website } = req.body
    const projectImg = req.file.filename
    try {
        const existingProject = await projects.findOne({ github })
        if (existingProject) {
            res.status(406).json("Project Already Exists in Collection..!")
        } else {
            const newProject = new projects({ title, languages, overview, github, website, projectImg, userId })
            await newProject.save()
            res.status(200).json(newProject)
        }
    } catch (e) {
        res.status(401).json(e)
    }
    // console.log(projectImg);
    // res.status(200).json(`addProject Request Received w/ userId: ${userId}`)
}

// getProjects for Home - no need for Autorization
exports.homePageProjectController = async (req, res) => {
    console.log("inside homePageProjectControlle ");
    try {
        const allHomeProjects = await projects.find().limit(3)
        res.status(200).json(allHomeProjects)
    } catch (e) {
        res.status(401).json(e)
    }
}

exports.allProjectsController = async (req, res) => {
    console.log("inside AllProjectController");
    const searchKey = req.query.search
    console.log(searchKey);
    const query = {
        languages: {
            $regex: searchKey, $options: 'i'
        }
    }
    try {
        const allProjects = await projects.find(query)
        res.status(200).json(allProjects)
    } catch (e) {
        res.status(401).json(e)
    }
}

exports.userProjectController = async (req, res) => {
    console.log("inside userProjectController ");
    const userId = req.userId
    // console.log(userId);
    try {
        const allUserProjects = await projects.find({ userId })
        // console.log(allUserProjects);
        res.status(200).json(allUserProjects)
    } catch (e) {
        res.status(401).json(e)
    }
}

// edit project controller - need Authorization
exports.editProjectController = async (req, res) => {
    console.log("inside editProjectController ");
    const projectId = req.params.id
    const userId = req.userId
    const { title, languages, overview, github, website, projectImg } = req.body
    const reUploadProjectImg = req.file ? req.file.filename : projectImg
    console.log(reUploadProjectImg);
    try {
        console.log("inside try of editProjectController");

        const updateProject = await projects.findByIdAndUpdate({ _id: projectId }, { title, languages, overview, github, website, projectImg: reUploadProjectImg, userId }, { new: true })
        await updateProject.save()
        res.status(200).json(updateProject)
        // console.log(updateProject)
    } catch (e) {
        console.log(e);
        res.status(401).json(e)
    }
}

// remove proejcts - need authorization
exports.removeProjectController = async (req, res) => {
    console.log("inside removeProjectController");
    const { id } = req.params
    // console.log(req.params);
    try {
        const deleteProject = await projects.findByIdAndDelete({ _id: id })
        res.status(200).json(deleteProject)
    } catch (e) {
        res.status(401).json(e)
    }
}

