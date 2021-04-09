// Write your "projects" router here!
const express = require('express');
const router = express.Router();

const Projects = require('./projects-model')

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

//Error Middleware
router.use((err, _, res) => {
    res.status(500).json({
      message: "There has been an error",
      error: err.message
    });
});

module.exports = router;
