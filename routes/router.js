const express = require('express')
const userController = require('../controllers/userController')
const projectController = require('../controllers/projectController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const multerMiddleware = require('../middlewares/multerMiddleware')

const router = new express.Router()

// register: http://localhost:3000/register
router.post('/register', userController.registerController)
// login : http://localhost:3000/login
router.post('/login', userController.loginController)

// addProject : http://localhost:3000/add-project
router.post('/add-project', jwtMiddleware, multerMiddleware.single('projectImg'), projectController.addProjectController)

// getProjectforHome : http://localhost:3000/home-project
router.get('/home-project', projectController.homePageProjectController)

// getProject : http://localhost:3000/all-project
router.get('/all-project', jwtMiddleware, projectController.allProjectsController)

// getUserProject : http://localhost:3000/user-project
router.get('/user-project', jwtMiddleware, projectController.userProjectController)

// editProject : http://localhost:3000/projects/id/edit
router.put('/projects/:id/edit', jwtMiddleware, multerMiddleware.single('projectImg'), projectController.editProjectController)

//  removeProject : http://localhost:3000/projects/id/remove
router.delete('/projects/:id/remove', jwtMiddleware, projectController.removeProjectController)

// editUser : http://localhost:3000/edit-user
router.put('/edit-user', jwtMiddleware, multerMiddleware.single('profilePicture'), userController.editUserController)

module.exports = router