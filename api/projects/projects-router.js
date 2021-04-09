// Write your "projects" router here!
const express = require('express');
const router = express.Router();

const Projects = require('./projects-model')

const {validateProjectId, validateProject} = require('../middleware/middleware')

// [GET] - '/' - Get all projects (array of projects)
router.get('/', (req, res, next) => {
    Projects.get()
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(err => {
            next(err);
        })
});

// [GET] - '/:id' - get project by id. Returns project
router.get('/:id', validateProjectId, (req, res, next) => {
    const {id} = req.params;
    Projects.get(id)
        .then(project => {
            res.status(200).json(project);
        })
        .catch(err => {
            next(err);
        })
});

// [POST] - '/' - create new project. Returns new project
router.post('/', validateProject, (req, res, next) => {
    Projects.insert(req.body)
        .then(newProject => {
            res.status(200).json(newProject);
        })
        .catch(err => {
            next(err);
        })
});

//Error Middleware
router.use((err, _, res) => {
    res.status(500).json({
      message: "There has been an error",
      error: err.message
    });
});

module.exports = router;
